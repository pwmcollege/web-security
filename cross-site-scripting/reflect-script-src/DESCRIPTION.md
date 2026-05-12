The message box still trusts your input, but no inline JavaScript.

Your message goes straight into the HTML this time. There's no script block wrapping it, so there's no string to break out of.

A Content Security Policy is in place, but it only restricts where scripts may come from, not whether they can run. Pick the right source.
