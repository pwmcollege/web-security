const HISTORY_LIMIT = 90;

function getCheckState(snapshot = {}) {
    if (typeof snapshot?.up !== "boolean") return "checking";
    if (snapshot.up) return "operational";
    return snapshot.fails >= 5 ? "outage" : "degraded";
}

function summarizeChecks(history = []) {
    const results = history.slice(-HISTORY_LIMIT);
    const passed = results.filter((result) => result.up === true).length;
    return {
        results,
        total: results.length,
        passed,
        passRate: results.length ? (passed / results.length) * 100 : null,
    };
}

function getRelativeTime(checkedAt, now = Date.now()) {
    if (typeof checkedAt !== "number" || !Number.isFinite(checkedAt)) return null;
    const seconds = Math.max(0, (now / 1000) - checkedAt);
    const [unit, divisor] = seconds >= 86400 ? ["day", 86400]
        : seconds >= 3600 ? ["hour", 3600]
        : seconds >= 60 ? ["minute", 60] : ["second", 1];
    const elapsed = Math.floor(seconds / divisor);
    return { value: elapsed === 0 ? 0 : -elapsed, unit };
}

const percentage = new Intl.NumberFormat(undefined, { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const relativeTime = new Intl.RelativeTimeFormat(undefined, { numeric: "always" });
const bars = document.getElementById("bars");
const historyBar = document.getElementById("historyBar");
const overallStatus = document.getElementById("overallStatus");
const serviceStatus = document.getElementById("serviceStatus");
const uptimeValue = document.getElementById("uptimeValue");
const unknownUptime = document.getElementById("unknownUptime");
const emptyHistory = document.getElementById("emptyHistory");
const oldestCheck = document.getElementById("oldestCheck");
const historyTooltip = document.getElementById("historyTooltip");
const tooltipTime = document.getElementById("tooltipTime");
const noCheckRecorded = document.getElementById("noCheckRecorded");
const tooltipResult = document.getElementById("tooltipResult");
const flagCard = document.getElementById("flagCard");
const flagValue = document.getElementById("flagValue");
const copyFlag = document.getElementById("copyFlag");
const copyMessage = document.getElementById("copyMessage");
const barButtons = [];
let currentResults = [];
let lastHistory = "";
let selectedBar = null;
let copyReset;
let events;

function ageOf(sample) {
    const age = getRelativeTime(sample?.checked_at);
    return age ? relativeTime.format(age.value, age.unit) : noCheckRecorded.textContent;
}

function setTime(element, sample) {
    element.textContent = ageOf(sample);
    if (getRelativeTime(sample?.checked_at)) {
        element.dateTime = new Date(sample.checked_at * 1000).toISOString();
    } else {
        element.removeAttribute("datetime");
    }
}

function sampleFor(button) {
    return currentResults[Number(button.dataset.index) - (HISTORY_LIMIT - currentResults.length)];
}

function updateTooltip() {
    if (!selectedBar || bars.dataset.interacting !== "true") return;
    const sample = sampleFor(selectedBar);
    const hasTime = getRelativeTime(sample?.checked_at) !== null;
    tooltipTime.hidden = !hasTime;
    noCheckRecorded.hidden = hasTime;
    if (hasTime) setTime(tooltipTime, sample);
    tooltipResult.dataset.state = selectedBar.dataset.state;
}

function showBar(button) {
    if (!button) return;
    selectedBar?.classList.remove("is-selected");
    selectedBar = button;
    button.classList.add("is-selected");
    bars.dataset.interacting = "true";
    const index = Number(button.dataset.index);
    historyTooltip.style.setProperty("--tooltip-position", `${((index + 0.5) / HISTORY_LIMIT) * 100}%`);
    updateTooltip();
}

function hideBar(force = false) {
    if (!force && bars.contains(document.activeElement)) return;
    selectedBar?.classList.remove("is-selected");
    selectedBar = null;
    bars.dataset.interacting = "false";
}

for (let index = 0; index < HISTORY_LIMIT; index++) {
    const button = historyBar.content.firstElementChild.cloneNode(true);
    button.dataset.index = String(index);
    bars.appendChild(button);
    barButtons.push(button);
}
bars.addEventListener("pointerover", (event) => showBar(event.target.closest(".history-bar")));
bars.addEventListener("pointerleave", () => hideBar());
bars.addEventListener("focusin", (event) => showBar(event.target.closest(".history-bar")));
bars.addEventListener("focusout", (event) => {
    if (!bars.contains(event.relatedTarget)) hideBar(true);
});
bars.addEventListener("click", (event) => showBar(event.target.closest(".history-bar")));
bars.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End", "Escape"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Escape") {
        hideBar(true);
        return;
    }
    let index = Number(event.target.dataset.index);
    if (event.key === "ArrowLeft") index--;
    if (event.key === "ArrowRight") index++;
    if (event.key === "Home") index = 0;
    if (event.key === "End") index = HISTORY_LIMIT - 1;
    index = Math.max(0, Math.min(HISTORY_LIMIT - 1, index));
    for (const button of barButtons) button.tabIndex = -1;
    barButtons[index].tabIndex = 0;
    barButtons[index].focus();
});

function refreshTimes() {
    if (currentResults.length) setTime(oldestCheck, currentResults[0]);
    for (const button of barButtons) {
        const sample = sampleFor(button);
        const label = tooltipResult.querySelector(`[data-check-state="${button.dataset.state}"]`).textContent;
        button.setAttribute("aria-label", `${ageOf(sample)}: ${label}`);
    }
    updateTooltip();
}

function renderHistory(history) {
    const summary = summarizeChecks(history);
    currentResults = summary.results;
    const signature = JSON.stringify(currentResults);
    if (lastHistory === signature) return;
    lastHistory = signature;
    const offset = HISTORY_LIMIT - summary.total;
    const focused = bars.contains(document.activeElement) ? document.activeElement : null;
    for (let index = 0; index < HISTORY_LIMIT; index++) {
        const button = barButtons[index];
        const sample = currentResults[index - offset];
        const known = typeof sample?.up === "boolean";
        button.dataset.state = known ? getCheckState(sample) : "checking";
        button.tabIndex = (focused ? button === focused : index === HISTORY_LIMIT - 1) ? 0 : -1;
    }
    uptimeValue.hidden = summary.total === 0;
    unknownUptime.hidden = summary.total > 0;
    if (summary.total) uptimeValue.textContent = percentage.format(summary.passRate / 100);
    emptyHistory.hidden = summary.total > 0;
    oldestCheck.hidden = summary.total === 0;
    if (!summary.total) oldestCheck.removeAttribute("datetime");
    refreshTimes();
}

function render(snapshot) {
    const state = getCheckState(snapshot);
    overallStatus.dataset.state = state;
    serviceStatus.dataset.state = state;
    renderHistory(snapshot.history ?? []);
    if (snapshot.flag) {
        flagCard.hidden = false;
        if (flagValue.textContent !== snapshot.flag) {
            flagValue.textContent = snapshot.flag;
            copyMessage.hidden = true;
        }
    }
}

copyFlag.addEventListener("click", async () => {
    clearTimeout(copyReset);
    copyMessage.hidden = true;
    try {
        await navigator.clipboard.writeText(flagValue.textContent);
        copyFlag.dataset.copied = "true";
        copyReset = setTimeout(() => {
            copyFlag.dataset.copied = "false";
        }, 1800);
    } catch {
        copyFlag.dataset.copied = "false";
        copyMessage.hidden = false;
    }
});

function connectEvents() {
    events?.close();
    events = new EventSource("events");
    events.onmessage = (event) => {
        try {
            const snapshot = JSON.parse(event.data);
            if (!snapshot || (snapshot.up !== null && typeof snapshot.up !== "boolean")
                || !Number.isInteger(snapshot.fails) || snapshot.fails < 0 || !Array.isArray(snapshot.history)) {
                overallStatus.dataset.state = "disconnected";
                return;
            }
            render(snapshot);
        } catch {
            overallStatus.dataset.state = "disconnected";
        }
    };
    events.onerror = () => { overallStatus.dataset.state = "disconnected"; };
}

render({ up: null, history: [] });
connectEvents();
setInterval(refreshTimes, 1000);
window.addEventListener("pagehide", () => events.close());
window.addEventListener("pageshow", (event) => {
    if (event.persisted) connectEvents();
});
document.addEventListener("DOMContentLoaded", () => window.lucide?.createIcons(), { once: true });
