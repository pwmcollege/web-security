Real apps often try to stop XSS by filtering the input before it ever reaches the page. A common naive way to do this is a blocklist: the server scans your input for dangerous-looking patterns and rejects it if it finds one. This series of challenges is about getting a payload past that kind of filter.

The weakness of a blocklist is that it can only block what its authors thought to block. There are many ways to reach the same result, so if the filter misses even one, you are through.

In this challenge the server rejects your input if it matches any of these patterns:

- `<script>` tags
- `<img>` tags
- `on...=` event handler attributes, like `onclick=`, `onerror=`, or `onload=`

Find a way to run your payload without using any of them.
