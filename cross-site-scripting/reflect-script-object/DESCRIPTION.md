Your message is now tucked into a JavaScript object before the page reads it back out.

Instead of being assigned to a string variable directly, your input sits as the value of a property inside an object literal. The surrounding syntax is different, but the parser still has to make sense of it.
