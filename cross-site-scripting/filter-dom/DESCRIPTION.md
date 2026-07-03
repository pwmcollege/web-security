Real apps often try to stop XSS by filtering the input before it ever reaches the page. A common naive way to do this is a blocklist: the server scans your input for dangerous-looking patterns and rejects it if it finds one. This series of challenges is about getting a payload past that kind of filter.

This filter does not touch your markup at all. It lets you use `<script>` freely and instead blocks specific JavaScript names, functions, and globals. The weakness is the same kind, though: it can only block names it recognizes as dangerous. JavaScript gives you more than one way to reach the same object or call the same function, so a banned name is rarely the only path to it.

In this challenge you can use `<script>`, but the following APIs are banned:

- `fetch`, `XMLHttpRequest`, `sendBeacon`
- `location`, `open()`, `assign()`, `replace()`, `pushState`, `replaceState`
- `submit`, `click`, `write`, `writeln`
- `createElement`, `createElementNS`, `adoptNode`, `importNode`, `cloneNode`
- `append`, `appendChild`, `prepend`, `before`, `after`, `insertBefore`
- `insertAdjacentHTML`, `insertAdjacentText`, `insertAdjacentElement`
- `replaceChildren`, `replaceChild`, `replaceWith`, `remove`, `removeChild`
- `innerHTML`, `outerHTML`, `innerText`, `outerText`, `textContent`
- `setAttribute`, `setAttributeNS`, `removeAttribute`, `removeAttributeNS`, `toggleAttribute`
- `querySelector`, `querySelectorAll`, `getElementById`, `getElementsByTagName`, `getElementsByClassName`, `getElementsByName`
- `href`, `action`, `formAction`, `srcdoc`
- `cookieStore`, `localStorage`, `sessionStorage`
- `FormData`, `URL`, `URLSearchParams`, `Request`, `Headers`, `Response`
- `eval`, `Function`, `setTimeout`, `setInterval`

Find a way to run your payload without using any of them.
