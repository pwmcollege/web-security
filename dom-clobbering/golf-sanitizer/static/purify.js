const allowed_attrs = new Set(['alt', 'href', 'method', 'src', 'target', 'type']);
const allowed_elements = new Set(['b', 'br', 'button', 'div', 'em', 'form', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'img', 'input', 'mark', 'strong', 'video']);

// Takes in a string and returns a DocumentFragment to append as a child to elements
function purify(userString) {
    console.log("Purifying: "+userString);
    const templ = document.createElement("template");
    templ.innerHTML = userString;
    purifyElement(templ.content);
    return templ.content;
}

function purifyElement(element) {
    // Remove non-approved attributes
    if (element.attributes) {
        for (let i = element.attributes.length - 1; i>=0; i--) {
            const currentAttribute = element.attributes[i];
            if (!allowed_attrs.has(currentAttribute.name)) {
                console.log("Removing disallowed attribute: "+currentAttribute.name);
                element.removeAttributeNode(currentAttribute);
            }
        }
    }
    // Remove non-approved children and purify approved ones
    for (let i = element.children.length-1; i>=0; i--) {
        const currentChild = element.children[i];
        if (!allowed_elements.has(currentChild.nodeName.toLowerCase())) {
            console.log("Removing disallowed child: "+currentChild);
            element.removeChild(currentChild);
        } else {
            purifyElement(currentChild);
        }
    }
    return element;
}

export { purify };