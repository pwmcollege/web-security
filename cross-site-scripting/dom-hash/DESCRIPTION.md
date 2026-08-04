With reflected and stored XSS, it's the server that drops your input into the page. DOM-based XSS cuts the server out completely. The bug is all in the page's own JavaScript, which takes something it has no business trusting and feeds it to something that treats it as HTML.

Here that something is the URL fragment, the bit after the `#`. The page reads `location.hash` and writes it straight into an element's `innerHTML`, which parses it as HTML. One wrinkle worth knowing: `innerHTML` won't run a bare `<script>` tag, so you'll want markup that springs to life on its own, like an element with a handler that fires by itself.

The fragment never even leaves the browser, so none of this reaches the server.
