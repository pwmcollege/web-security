[Cross-Site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) is one of the most common web security vulnerabilities. It happens when a web application takes user input and displays it in the browser without handling or escaping it appropriately. When that input is treated as code instead of plain text, attackers can execute JavaScript in someone else's browser.

In this level, you'll explore how reflected input can turn into executable code. Your goal is simple: trigger a JavaScript `alert()`.

*Every security journey starts with understanding the basics, and this is where reflection begins.*

---

### Challenge Environment

The challenge files are located in `/challenge`.

To begin, start the web server: `/challenge/server`

Once running, you can access the website at: `https://challenge.internal`

You can visit it using a browser inside the [Desktop workspace](https://pwn.college/workspace/desktop).

Once you've created a URL that triggers an `alert()`, go ahead and run: `/challenge/victim`.

When you're prompted, paste your crafted URL there. If your payload pops an alert in the victim's browser, you'll get the flag!
