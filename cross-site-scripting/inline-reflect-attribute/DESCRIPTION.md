The spot where your input shows up decides how you attack it. In the last challenge it went straight into the page body, so any tags you wrote worked right away. In this challenge it goes inside an HTML [attribute value](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes) instead, as the `value` of an input box:

```html
<input value="<payload>">
```

As long as your text stays between those quotes, the browser reads it as plain data, not as a tag. To run anything, you first need to get out of the attribute. Add a `"` to end the value, close the tag, and everything after that is read as fresh HTML. This is a good example of why escaping has to match the context. One quote that should have been escaped is all it takes.

Break out of the attribute and run JavaScript that steals the victim's [cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie).
