A sanitizer that removes dangerous tags and strips event handlers should make HTML safe. But "safe" depends on who is doing the parsing. When a server sanitizes HTML with one parser and then the browser re-parses the sanitized output via `innerHTML`, the two parsers may not agree on what the HTML means. The difference can be exploitable.

This is called [Mutation XSS (mXSS)](https://www.sonarsource.com/blog/mxss-the-vulnerability-hiding-in-your-code/): the payload mutates between sanitization and rendering.

In this challenge, the server uses Python's `html5lib` (via BeautifulSoup) to sanitize your input. The sanitized HTML is then rendered via `innerHTML` in the browser.
