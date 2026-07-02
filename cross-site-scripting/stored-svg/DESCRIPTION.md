Most image formats are just pixels, but [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) is different. An SVG is really an XML document, and it can carry a `<script>` or an event handler that the browser runs when it opens the file as a page. That makes SVG a way to get script execution through something that looks like a harmless image:

```xml
<svg xmlns="http://www.w3.org/2000/svg">
    <script>
        <payload>
    </script>
</svg>
```

So if a site lets you upload an image and then serves it back from its own origin, an SVG upload becomes stored XSS. The catch is the upload filter, which is only meant to allow real images. In this challenge the filter is easy to slip past, because the check on upload and the type used when serving the file back do not agree with each other.

Upload an avatar that gets past the filter but is served as an SVG, and get your script to run in a viewer's browser.
