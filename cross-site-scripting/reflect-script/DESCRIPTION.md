Your message now passes through an inline JavaScript snippet before it ever reaches the page. The page assigns your input to a variable as a quoted string inside an existing `<script>` block.

Because your input is inside a [string literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#string_literals), the HTML never sees your message as markup. The JavaScript parser does.

A [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) blocks adding any new script tags, so the existing script is your only place to run code. Break out of the string literal and what comes after it is parsed as code instead of text.
