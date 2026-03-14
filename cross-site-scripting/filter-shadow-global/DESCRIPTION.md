Through this series of challenges, you will become familiar with the concept of XSS filters bypass!

In this challenge, the following elements are banned:

- `script`
- `img`
- `svg`
- `iframe`
- `input`
- `video`
- `audio`
- `source`
- `track`
- `html`
- `body`
- `frameset`
- `details`
- `dialog`
- `marquee`
- `style`
- `link`
- `template`

The following handlers are also banned:

- `ontoggle`
- `onstart`
- `onload`
- `onerror`
- `onclick`
- `onfocus`
- `onfocusin`
- `onfocusout`
- `autofocus`
- `onanimationstart`
- `onanimationiteration`
- `onanimationend`
- `onanimationcancel`

The following attributes are also banned:

- `style=`
- `animation`
- `keyframes`
- `content-visibility`
- `transition`
- `transform`

The following shadow DOM primitives are also banned:

- `shadow`
- `slot`

The following APIs and globals are also banned:

- `fetch`
- `XMLHttpRequest`
- `sendBeacon`
- `location`
- `open()`
- `assign()`
- `replace()`
- `pushState`
- `replaceState`
- `submit`
- `requestSubmit`
- `click`
- `createElement`
- `createElementNS`
- `adoptNode`
- `importNode`
- `cloneNode`
- `append`
- `appendChild`
- `prepend`
- `before`
- `after`
- `insertBefore`
- `insertAdjacentHTML`
- `insertAdjacentText`
- `insertAdjacentElement`
- `replaceChildren`
- `replaceChild`
- `replaceWith`
- `remove`
- `removeChild`
- `innerHTML`
- `outerHTML`
- `innerText`
- `outerText`
- `textContent`
- `setAttribute`
- `setAttributeNS`
- `removeAttribute`
- `removeAttributeNS`
- `toggleAttribute`
- `querySelector`
- `querySelectorAll`
- `getElementById`
- `getElementsByTagName`
- `getElementsByClassName`
- `getElementsByName`
- `write`
- `writeln`
- `href`
- `src`
- `action`
- `formAction`
- `srcdoc`
- `cookieStore`
- `cookie`
- `localStorage`
- `sessionStorage`
- `FormData`
- `URL`
- `URLSearchParams`
- `Request`
- `Headers`
- `Response`
- `media`
- `Image`
- `Audio`
- `Video`
- `Track`
- `Source`
- `Bitmap`
- `Canvas`
- `Blob`
- `File`
- `navigator`
- `postMessage`
- `document`
- `window`
- `globalThis`
- `global`
- `self`
- `this`
- `top`
- `parent`
- `frames`
- `form`
- `element`
- `eval`
- `Function`
- `constructor`
- `setTimeout`
- `setInterval`

String literals are also limited to one character.
