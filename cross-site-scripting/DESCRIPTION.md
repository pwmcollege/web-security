Browsers render HTML, run JavaScript, and parse CSS. When a server drops user input into a page without escaping it, the browser can read that input as markup or script instead of text. Data becomes code.

This is [Cross-Site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting). It comes in [three flavors](https://owasp.org/www-community/Types_of_Cross-Site_Scripting):

- **DOM-based (Type 0)**: the bug lives entirely in client-side JavaScript.
- **Reflected (Type 1)**: input is echoed straight back in the response.
- **Stored (Type 2)**: input is saved and served to other users later.

This module walks through how each type shows up and how small input-handling mistakes lead to full client-side compromise.
