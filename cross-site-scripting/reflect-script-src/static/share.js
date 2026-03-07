const shareUrl = document.getElementById("shareUrl");
const copyBtn = document.getElementById("copyBtn");
const copyIcon = document.getElementById("copyIcon");

if (shareUrl && copyBtn && copyIcon) {
    shareUrl.value = window.location.href;

    copyBtn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(shareUrl.value);

        const originalSvg = copyIcon.innerHTML;
        const successSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><path d="M20 6 9 17l-5-5"/></svg>`;

        copyIcon.innerHTML = successSvg;
        copyBtn.classList.add("border-emerald-100", "bg-emerald-50/30");

        setTimeout(() => {
            copyIcon.innerHTML = originalSvg;
            copyBtn.classList.remove("border-emerald-100", "bg-emerald-50/30");
        }, 2000);
    });
}
