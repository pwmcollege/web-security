Your message is now tucked into a JavaScript object before the page reads it back out.

Instead of being assigned to a string variable directly, your input sits as the value of a property inside an object literal like `{ key: "your input here" }`. The surrounding code looks different from the previous level, but the JavaScript parser still has to figure out where your value ends and the rest of the script begins.
