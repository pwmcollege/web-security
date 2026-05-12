Your message now passes through an inline JavaScript snippet before it ever reaches the page.

The page wraps your input as a string literal inside an existing `<script>` block, then assigns it to a variable. The HTML never sees your input directly. The JavaScript parser does.

A Content Security Policy blocks adding new scripts. The one already on the page is your only execution context.
