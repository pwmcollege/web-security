Through this series of challenges, you will become familiar with the concept of XSS filters bypass!

In this challenge, the following element is allowed:

- `script`

The following APIs are banned:

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
