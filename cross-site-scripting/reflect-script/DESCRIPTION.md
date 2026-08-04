This time your input doesn't touch the HTML at all. It's dropped into JavaScript, tucked inside a double-quoted string that the page assigns to a variable in a script block that's already there, nonce and all.

Being inside the quotes, the browser never mistakes your text for a tag, and the CSP nonce means you can't just add a script of your own. But here's the thing: the engine is already running the code all around you, and a string only stays a string until it ends. It ends the moment a matching quote says so.
