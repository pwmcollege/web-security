The server is no longer reflecting your input into the page. That does not mean the page stopped trusting it.

In this level, the dangerous part happens entirely in the browser. Client-side JavaScript reads data from the URL and writes it back into the DOM. This is [DOM-based XSS](https://owasp.org/www-community/attacks/DOM_Based_XSS): the bug lives in the page's own logic, not in the server response.
