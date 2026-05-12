Your message still passes through an inline JavaScript snippet before it reaches the page, but this time it lands inside a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of a regular quoted string.

Template literals use backticks, and they have their own syntax for inserting expressions. The rules for what counts as code inside them are not the same as for `"..."` strings.
