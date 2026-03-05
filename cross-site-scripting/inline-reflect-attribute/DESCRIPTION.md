[Cross-Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) does not always show up in obvious places. Sometimes user input is reflected inside an HTML attribute, where one misplaced quote is enough to turn harmless text into executable behavior.

In this level, your input is reflected into an attribute value. Escape that context and use your payload to retrieve the victim's [cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie).

*Sometimes one loose quote is all it takes for a session to slip away.*
