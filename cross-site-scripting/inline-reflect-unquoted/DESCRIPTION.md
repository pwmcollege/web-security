[Cross-Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) gets trickier when the app stops handing you neat quote boundaries. If input lands in an unquoted attribute, spaces and delimiters become part of the game.

In this level, your input is reflected into an unquoted attribute value. Break out cleanly and use your payload to retrieve the victim's [cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie).

*No quotes, and mind your spacing.*
