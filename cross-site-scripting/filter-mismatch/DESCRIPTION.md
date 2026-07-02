Real apps often try to stop XSS by filtering the input before it ever reaches the page. A common naive way to do this is a blocklist: the server scans your input for dangerous-looking patterns and rejects it if it finds one. This series of challenges is about getting a payload past that kind of filter.

The weakness of a blocklist is that it can only block what its authors thought to block. There are many ways to reach the same result, so if the filter misses even one, you are through.

In this challenge every HTML element is banned. The filter will not let you introduce a single new tag of your own.

Find a way to run your payload without one.
