Parsers track more than just element nesting. They also track context and namespace. How an element is serialized, and how it's re-parsed, can differ depending on where in the document tree it appears.

In MathML, `<annotation-xml>` is special: its `encoding` attribute declares what namespace its content lives in. The same element can mean something entirely different depending on where it appears and how it declares its content. Sanitizers and browsers don't always agree on what that means.
