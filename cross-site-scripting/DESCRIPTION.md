Your browser is a powerful program. It renders [HTML](https://en.wikipedia.org/wiki/HTML), executes [JavaScript](https://en.wikipedia.org/wiki/JavaScript), parses
[CSS](https://en.wikipedia.org/wiki/CSS), connects you to [pwn.college](https://pwn.college), and handles the countless interactions that make modern web applications work.

But that great power comes with great responsibility.... and risk.

When a web server takes user-controlled input and inserts it into a page without properly handling or escaping it, the browser may interpret that input as markup or even executable script instead of plain text. In other words, data becomes code.

This class of vulnerabilities is known as [Cross-Site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting): injection flaws that occur in client-side web content, such as HTML, and execute within a victim's browser.

There are [three types of XSS](https://owasp.org/www-community/Types_of_Cross-Site_Scripting):

- **DOM-based (Type 0)**: the vulnerability exists entirely in
    client-side JavaScript.
- **Reflected (Type 1)**: malicious input is immediately reflected
    in the server's response.
- **Stored (Type 2)**: malicious input is stored and later served
    to other users.

In this module, you'll explore how these vulnerabilities arise, why they matter, and how small mistakes in handling input can lead to powerful client-side compromise.

Let's see what runs.
