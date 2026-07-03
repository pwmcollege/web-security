Real apps often try to stop XSS by filtering the input before it ever reaches the page. A common naive way to do this is a blocklist: the server scans your input for dangerous-looking patterns and rejects it if it finds one. This series of challenges is about getting a payload past that kind of filter.

This filter does not touch your markup at all. It lets you use `<script>` freely and instead blocks specific JavaScript names, functions, and globals. The weakness is the same kind, though: it can only block names it recognizes as dangerous. JavaScript gives you more than one way to reach the same object or call the same function, so a banned name is rarely the only path to it.

In this challenge you can use `<script>`, but the following APIs and globals are banned:

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
- `navigator`, `postMessage`, `document`, `window`, `globalThis`, `global`, `self`, `this`, `top`, `parent`, `frames`, `form`, `element`, `constructor`
- `eval`, `Function`, `setTimeout`, `setInterval`, `import()`

Computed member access via square brackets (`[`, `]`) is also disallowed. That closes off one common trick for building a banned name at runtime.

Find a way to run your payload without using any of them, and without brackets.
