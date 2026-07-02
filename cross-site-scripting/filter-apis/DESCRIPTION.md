Real apps often try to stop XSS by filtering the input before it ever reaches the page. A common naive way to do this is a blocklist: the server scans your input for dangerous-looking patterns and rejects it if it finds one. This series of challenges is about getting a payload past that kind of filter.

The weakness of a blocklist is that it can only block what its authors thought to block. There are many ways to reach the same result, so if the filter misses even one, you are through.

In this challenge you can use `<script>`, but the following APIs are banned:

- `fetch`, `XMLHttpRequest`, `sendBeacon`
- `location`, `open()`, `assign()`, `replace()`, `pushState`, `replaceState`
- `submit`, `requestSubmit`, `click`, `write`, `writeln`
- `createElement`, `createElementNS`, `adoptNode`, `importNode`, `cloneNode`
- `append`, `appendChild`, `prepend`, `before`, `after`, `insertBefore`
- `insertAdjacentHTML`, `insertAdjacentText`, `insertAdjacentElement`
- `replaceChildren`, `replaceChild`, `replaceWith`, `remove`, `removeChild`
- `innerHTML`, `outerHTML`, `innerText`, `outerText`, `textContent`
- `setAttribute`, `setAttributeNS`, `removeAttribute`, `removeAttributeNS`, `toggleAttribute`
- `querySelector`, `querySelectorAll`, `getElementById`, `getElementsByTagName`, `getElementsByClassName`, `getElementsByName`
- `href`, `src`, `action`, `formAction`, `srcdoc`
- `cookie`, `cookieStore`, `localStorage`, `sessionStorage`
- `FormData`, `URL`, `URLSearchParams`, `Request`, `Headers`, `Response`
- `media`, `Image`, `Audio`, `Video`, `Track`, `Source`, `Bitmap`, `Canvas`, `Blob`, `File`
- `navigator`, `postMessage`, `document`, `window`, `globalThis`, `self`, `top`, `frames`, `form`, `element`
- `eval`, `Function`, `setTimeout`, `setInterval`

Find a way to run your payload without using any of them.
