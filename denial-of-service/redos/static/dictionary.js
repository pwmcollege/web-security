const form = document.querySelector(".search");
const input = form.elements.query;
const searchControl = form.querySelector(".search-control");
const searchFields = searchControl.querySelector(".search-fields");
const searchButton = searchControl.querySelector(".search-action");
const searchClose = searchFields.querySelector(".search-close");
const animateSearch = window.Motion?.animate;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const hero = document.getElementById("hero");
const entry = document.getElementById("entry");
const template = document.getElementById("entry-template");
const notice = document.getElementById("notice");
const pagination = document.getElementById("pagination");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const pageJump = document.getElementById("page-jump");
const pageInput = document.getElementById("page");
const pageCount = document.getElementById("page-count");

let query = "";
let page = 1;
let request;
let searchAnimation;

function renderEntry(entry) {
    const item = template.content.firstElementChild.cloneNode(true);
    item.querySelector("h2").textContent = entry.word;
    item.querySelector("[data-pronunciation]").textContent = entry.pronunciation;

    const [definitions, extraDefinitions] = item.querySelectorAll("ol");
    const senses = entry.senses.map(({ part, definition }) => {
        const sense = document.createElement("li");
        const label = document.createElement("i");
        label.textContent = part;
        sense.append(label, ` ${definition}`);
        return sense;
    });

    definitions.append(...senses.slice(0, 2));
    extraDefinitions.append(...senses.slice(2));
    item.querySelector("details").hidden = senses.length <= 2;
    return item;
}

function clearSearchAnimationStyles() {
    searchControl.style.removeProperty("flex-basis");
    searchFields.style.removeProperty("opacity");
}

function setSearchOpen(open) {
    if (open === !searchFields.inert) return;

    const width = searchControl.getBoundingClientRect().width;
    const opacity = Number(getComputedStyle(searchFields).opacity);
    searchAnimation?.cancel();
    searchAnimation = undefined;
    clearSearchAnimationStyles();

    searchFields.inert = !open;
    searchButton.type = open ? "submit" : "button";
    searchButton.setAttribute("aria-expanded", String(open));
    searchButton.setAttribute("aria-label", open ? "Search" : "Open search");

    if (!animateSearch || reducedMotion.matches) return;

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const currentBasis = `${width / rootFontSize}rem`;
    const targetBasis = `${searchControl.getBoundingClientRect().width / rootFontSize}rem`;
    searchControl.style.flexBasis = currentBasis;
    searchFields.style.opacity = opacity;

    const animation = animateSearch([
        [searchControl, { flexBasis: [currentBasis, targetBasis] }, open
            ? { type: "spring", duration: 0.28, bounce: 0 }
            : { duration: 0.36, ease: [0.35, 0, 0.2, 1] }],
        [searchFields, { opacity: [opacity, open ? 1 : 0] }, {
            at: open ? 0.04 : 0.05,
            duration: open ? 0.16 : 0.24,
            ease: "easeOut",
        }],
    ]);

    searchAnimation = animation;
    animation.then(() => {
        if (searchAnimation !== animation) return;

        clearSearchAnimationStyles();
        searchAnimation = undefined;
    });
}

function closeSearch() {
    setSearchOpen(false);
    searchButton.focus();
}

async function load(nextPage) {
    request?.abort();
    request = new AbortController();
    const { signal } = request;
    previous.disabled = true;
    next.disabled = true;
    notice.hidden = true;
    input.removeAttribute("aria-invalid");
    entry.setAttribute("aria-busy", "true");

    try {
        const response = await fetch(form.action, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, page: nextPage }),
            signal,
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            if (response.status === 400) input.setAttribute("aria-invalid", "true");
            throw new Error(data.error || "Couldn't load words.");
        }

        page = data.page;
        entry.replaceChildren(...data.words.map(renderEntry));
        notice.classList.remove("error");
        notice.textContent = "No matching words.";
        notice.hidden = data.words.length > 0;
        pagination.hidden = data.page_count <= 1;
        previous.disabled = page <= 1;
        next.disabled = page >= data.page_count;
        pageInput.value = page;
        pageInput.max = Math.max(data.page_count, 1);
        pageCount.textContent = `of ${data.page_count.toLocaleString()}`;
        hero.scrollTop = 0;
    } catch (error) {
        if (signal.aborted) return;
        entry.replaceChildren();
        pagination.hidden = true;
        notice.classList.add("error");
        notice.textContent = error instanceof TypeError ? "Couldn't load words." : error.message;
        notice.hidden = false;
    } finally {
        if (!signal.aborted) entry.removeAttribute("aria-busy");
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (searchFields.inert) return;

    query = input.value;
    load(1);
});

searchButton.addEventListener("click", (event) => {
    if (!searchFields.inert) return;

    event.preventDefault();
    setSearchOpen(true);
    input.focus();
});

searchClose.addEventListener("click", closeSearch);

searchControl.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !searchFields.inert) {
        event.preventDefault();
        closeSearch();
    }
});

searchControl.addEventListener("focusout", (event) => {
    if (!searchFields.inert && !searchControl.contains(event.relatedTarget)) setSearchOpen(false);
});

searchControl.addEventListener("pointerdown", (event) => {
    const button = event.target.closest("button");
    if (searchFields.inert || !button) return;

    event.preventDefault();
    button.focus({ preventScroll: true });
});

reducedMotion.addEventListener("change", (event) => {
    if (event.matches) searchAnimation?.complete();
});

document.addEventListener("pointerdown", (event) => {
    if (!searchFields.inert && !searchControl.contains(event.target)) setSearchOpen(false);
});

pageJump.addEventListener("submit", (event) => {
    event.preventDefault();
    load(pageInput.valueAsNumber);
});

previous.addEventListener("click", () => load(page - 1));
next.addEventListener("click", () => load(page + 1));
load(1);
