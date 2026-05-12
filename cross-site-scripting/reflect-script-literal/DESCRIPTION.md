Your message still passes through an inline JavaScript snippet before it ever reaches the page, but this time the template engine gets a chance to touch it first.

The string literal in the script block is no longer a regular `"..."` string. It is a template literal with backticks, and template literals have their own rules about what counts as code inside them.
