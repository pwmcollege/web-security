A sanitizer reads HTML, removes the parts that look dangerous, and writes the cleaned HTML back out as a string. This is only safe if everything that reads that string later understands it the same way the sanitizer did. [Mutation XSS (mXSS)](https://www.sonarsource.com/blog/mxss-the-vulnerability-hiding-in-your-code/) happens when that is not the case. The HTML looks harmless when the sanitizer is done with it, but it changes into something dangerous when a second parser reads it back.

In this challenge your input is parsed twice, by two different parsers:

```python
# server: parse, strip dangerous tags/attributes, serialize back to a string
sanitized = sanitize(BeautifulSoup(msg, "html5lib"))
```

```js
// browser: parse the sanitized string a second time
messageBox.innerHTML = sanitized;
```

The server cleans your input with Python's `html5lib` (through BeautifulSoup), and then the browser parses that cleaned output again through [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML). The two do not always agree, and [tables](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table) are a good place to see it. HTML has strict rules about what is allowed inside a table, and anything that breaks those rules gets moved somewhere else when the browser re-parses it. This is called [foster parenting](https://html.spec.whatwg.org/multipage/parsing.html#foster-parenting). A piece of text that was harmless after cleaning can end up in a new spot where it becomes real markup.

Find input that the sanitizer accepts as safe, but the browser re-parses into something that runs.
