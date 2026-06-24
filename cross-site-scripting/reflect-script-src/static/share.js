lucide.createIcons();

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(window.location.href);

        const icon = document.getElementById("shareIcon");
        const text = document.getElementById("shareText");

        icon.setAttribute("data-lucide", "check");
        text.textContent = "Link copied";
        lucide.createIcons();

        setTimeout(() => {
            icon.setAttribute("data-lucide", "link");
            text.textContent = "Share this message";
            lucide.createIcons();
        }, 1500);
    });
}
