The previous challenge was a little bit contrived, as most code will not directly read from the page like that.

However, there are some cases where the HTML-accessing component is not so readily apparent. One code pattern that occasionally appears is the setting of variables as a property on the ``document`` object. As it turns out, setting the name attribute of certain HTML element types results in document.[x] returning that element rather than being initially undefined.

Can you figure out how to get the victim to send their cookies before time runs out?

Tip: Check the Additional Resources section in the introduction for possible payloads.
