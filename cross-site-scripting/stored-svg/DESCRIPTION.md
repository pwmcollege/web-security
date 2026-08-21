Most image formats are nothing but pixels. SVG is the odd one out: an SVG is really an XML document, and it can carry a `<script>` or an event handler that the browser happily runs when it opens the file as a page. So a thing that looks for all the world like an image can hand you script execution.

Which means that when a site lets you upload an image and then serves it back from its own origin, an SVG upload can quietly turn into stored XSS. The only guard is the upload filter, there to wave real images through and turn everything else away. This one is easy to fool, because the check it runs on the way in and the content type it stamps on the way back out don't agree with each other.

---

Start `/challenge/server` and log in as `guest:password` or `hacker:1337`. Upload your avatar, then run `/challenge/victim` to have it viewed. The challenge server is the only place it can reach.
