window.lucide?.createIcons();

const loginForm = document.querySelector('form[action$="/api/auth/login"]');
if (loginForm) {
    loginForm.addEventListener("submit", () => {
        const target = new URL(loginForm.action);
        target.hash = ["#inbox", "#sent"].includes(location.hash) ? location.hash : "";
        loginForm.action = target;
    });
}

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let openingAnimation;

function animateOpening(element) {
    openingAnimation?.complete();
    if (reducedMotion.matches) return;
    openingAnimation = window.Motion?.animate(
        element, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.16, ease: "easeOut" },
    );
}

reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) openingAnimation?.complete();
});

const menu = document.querySelector(".account-menu");
if (menu) {
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target)) menu.open = false;
    });
    menu.addEventListener("focusout", (event) => {
        if (event.relatedTarget && !menu.contains(event.relatedTarget)) menu.open = false;
    });
    menu.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            menu.open = false;
            menu.querySelector("summary").focus();
        }
    });
}

const compose = document.querySelector("#compose");
if (compose) {
    const form = compose.querySelector("form");
    const error = document.querySelector("#compose-error");
    const send = form.querySelector("[type=submit]");
    const notice = document.querySelector("#notice");
    const actions = document.querySelector("#message-actions");
    let draftKey;

    function openDraft(message, to = "", subject = "") {
        draftKey = JSON.stringify(["mail-draft", location.pathname, form.dataset.mailbox, message]);
        const draft = JSON.parse(sessionStorage.getItem(draftKey)) || { to, subject, body: "" };
        document.querySelector("#compose-title").textContent = message === "new" ? "New message" : "Reply";
        for (const field of ["to", "subject", "body"]) form.elements[field].value = draft[field];
        compose.showModal();
        animateOpening(compose);
    }

    const workspace = document.querySelector(".workspace");
    const api = form.getAttribute("action");
    const owner = form.dataset.mailbox;
    const retry = notice.querySelector("button");
    let noticeTimer;
    let source = document;
    let renderedTemplate;
    let refreshRequest;

    function showNotice(text, retryAction) {
        clearTimeout(noticeTimer);
        notice.querySelector("span").textContent = text;
        retry.hidden = !retryAction;
        retry.onclick = retryAction || null;
        notice.hidden = false;
        if (!retryAction) noticeTimer = setTimeout(() => { notice.hidden = true; }, 4500);
    }

    const logout = menu.querySelector("form");
    logout.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(logout.action, { method: "POST" });
            if (!response.ok) throw new Error();
            location.assign(logout.dataset.login);
        } catch {
            showNotice("Couldn’t log out. Try again.");
        }
    });

    function showMailbox(folder, message = null, mode = "push", focus = "") {
        const template = source.querySelector(`template[data-folder="${folder}"]`);
        const previousRow = workspace.querySelector(".message-row[aria-current]");
        const rows = workspace.querySelector(".rows");
        const scroll = workspace.dataset.folder === folder ? rows.scrollTop : 0;
        actions.close();
        if (renderedTemplate !== template) {
            workspace.replaceChildren(document.importNode(template.content, true));
            window.lucide?.createIcons();
            renderedTemplate = template;
        }

        const articles = [...workspace.querySelectorAll("article[data-message]")];
        const requested = articles.find(article => article.dataset.message === message);
        const selected = requested || articles[0];
        const selectedId = selected?.dataset.message;
        for (const article of articles) article.hidden = article !== selected;
        for (const row of workspace.querySelectorAll(".message-row")) {
            if (row.dataset.message === selectedId) row.setAttribute("aria-current", "true");
            else row.removeAttribute("aria-current");
        }
        workspace.dataset.folder = folder;
        workspace.toggleAttribute("data-reading", Boolean(requested));
        workspace.querySelector(".rows").scrollTop = scroll;
        const state = { owner, folder, message: requested?.dataset.message || null };
        const prior = history.state;
        const changed = prior?.owner !== owner || prior.folder !== folder || prior.message !== state.message;
        if (mode === "push" && changed) history.pushState(state, "", "#" + folder);
        else history.replaceState(state, "", "#" + folder);
        document.title = workspace.querySelector("h1").textContent + " · Mail";

        if (focus === "message" && selected) {
            const target = selected.querySelector("[data-back]").offsetWidth
                ? selected.querySelector(".subject") : workspace.querySelector(".message-row[aria-current]");
            target.focus({ preventScroll: true });
        } else if (focus) {
            const row = focus === "back" && previousRow?.isConnected ? previousRow : null;
            (row || workspace.querySelector(".folder[aria-current]")).focus({ preventScroll: true });
        }
    }

    function restoreLocation() {
        const folder = location.hash === "#sent" ? "sent" : "inbox";
        const state = history.state;
        const message = state?.owner === owner && state.folder === folder ? state.message : null;
        showMailbox(folder, message, "replace");
    }

    async function refreshMailbox() {
        refreshRequest?.abort();
        const controller = new AbortController();
        refreshRequest = controller;
        workspace.setAttribute("aria-busy", "true");
        try {
            const response = await fetch(location.pathname + location.search, { signal: controller.signal });
            if (response.redirected) {
                location.assign(response.url + location.hash);
                return;
            }
            if (!response.ok) throw new Error();
            const next = new DOMParser().parseFromString(await response.text(), "text/html");
            if (controller.signal.aborted) return;
            const folder = workspace.dataset.folder;
            const incoming = next.querySelector(`template[data-folder="${folder}"]`);
            if (!incoming) throw new Error();
            source = next;
            if (!retry.hidden) notice.hidden = true;
            if (!renderedTemplate.content.isEqualNode(incoming.content)) {
                const message = history.state?.message;
                const focus = workspace.contains(document.activeElement) ? (message ? "message" : "folder") : "";
                showMailbox(folder, message, "replace", focus);
            } else {
                renderedTemplate = incoming;
            }
        } catch {
            if (!controller.signal.aborted) showNotice("Couldn’t refresh this mailbox.", refreshMailbox);
        } finally {
            if (refreshRequest === controller) workspace.setAttribute("aria-busy", "false");
        }
    }

    addEventListener("popstate", restoreLocation);
    addEventListener("hashchange", restoreLocation);
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a[data-folder], a[data-back]");
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        const back = link.hasAttribute("data-back");
        showMailbox(link.hash.slice(1), null, "push", back ? "back" : "folder");
        if (!back) refreshMailbox();
    });
    workspace.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        if (button.hasAttribute("data-compose")) {
            button.focus({ preventScroll: true });
            openDraft("new");
        } else if (button.classList.contains("message-row")) {
            showMailbox(workspace.dataset.folder, button.dataset.message, "push", "message");
        } else if (button.hasAttribute("data-actions")) {
            button.focus({ preventScroll: true });
            actions.showModal();
            button.setAttribute("aria-expanded", "true");
            animateOpening(actions);
        }
    });
    actions.addEventListener("close", () => {
        if (!actions.open) workspace.querySelector('[data-actions][aria-expanded="true"]')?.setAttribute("aria-expanded", "false");
    });
    actions.querySelector("[data-reply]").addEventListener("click", () => {
        const { message, replyTo, subject } = workspace.querySelector("article:not([hidden])").dataset;
        actions.close();
        openDraft(message, replyTo, /^re:/i.test(subject) ? subject : ("Re: " + subject).trimEnd());
        form.elements.body.focus();
    });
    restoreLocation();

    form.addEventListener("input", () => {
        sessionStorage.setItem(draftKey, JSON.stringify(Object.fromEntries(new FormData(form))));
    });
    compose.querySelector("[data-close]").addEventListener("click", () => compose.close());
    for (const dialog of document.querySelectorAll("dialog")) {
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) dialog.close();
        });
    }
    compose.addEventListener("close", () => { error.hidden = true; });
    compose.querySelector("[data-discard]").addEventListener("click", () => {
        sessionStorage.removeItem(draftKey);
        compose.close();
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (send.disabled) return;
        const sentDraft = draftKey;
        send.disabled = true;
        error.hidden = true;
        try {
            const response = await fetch(form.action, { method: "POST", body: new FormData(form) });
            if (!response.ok) {
                const result = await response.json();
                error.textContent = result.error || "Couldn’t send the message. Try again.";
                error.hidden = false;
                send.disabled = false;
                return;
            }
            sessionStorage.removeItem(sentDraft);
            compose.close();
            send.disabled = false;
            showMailbox("sent", null, "push", "folder");
            showNotice("Message sent to " + form.elements.to.value.split("@")[0].trim() + "@pwm.college");
            await refreshMailbox();
        } catch {
            error.textContent = "Couldn’t send the message. Try again.";
            error.hidden = false;
            send.disabled = false;
        }
    });

    actions.querySelector("[data-delete]").addEventListener("click", async (event) => {
        const button = event.currentTarget;
        const message = workspace.querySelector("article:not([hidden])").dataset.message;
        actions.close();
        button.disabled = true;
        try {
            const response = await fetch(api + "/" + message, { method: "DELETE" });
            if (!response.ok) throw new Error();
            await refreshMailbox();
        } catch {
            showNotice("Couldn’t delete the message. Try again.");
        } finally {
            button.disabled = false;
        }
    });
}
