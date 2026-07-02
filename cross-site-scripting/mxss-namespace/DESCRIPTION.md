Parsers keep track of more than how tags are nested. They also track which [namespace](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Namespaces_crash_course) each element belongs to. HTML, [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG), and [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML) can all live in one page, and the same text is parsed differently depending on the namespace it is in. That gives a sanitizer and a browser one more thing to disagree about, which is exactly what [mutation XSS](https://www.sonarsource.com/blog/mxss-the-vulnerability-hiding-in-your-code/) needs.

As in the last challenge, your input is parsed twice: once by the sanitizer, once by the browser.

```python
# server: sanitize, allowing a small set of MathML tags
sanitized = sanitize(BeautifulSoup(msg, "html5lib"))
```

```js
// browser: parse the sanitized string again
messageBox.innerHTML = sanitized;
```

In MathML, [`<annotation-xml>`](https://developer.mozilla.org/en-US/docs/Web/MathML/Reference/Element/semantics) is a special case. Its `encoding` attribute says what kind of content it holds, and the right value makes it an HTML integration point, a spot where parsing switches back to HTML. The server cleans your input in one context, but when the cleaned string is parsed again through [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), content that was treated as harmless MathML text can cross the line and be read as real HTML.

Use that namespace boundary to sneak markup past the sanitizer so it comes alive when the browser re-parses it.
