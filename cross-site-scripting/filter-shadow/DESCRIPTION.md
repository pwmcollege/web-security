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
