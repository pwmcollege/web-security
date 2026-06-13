window.theme = {}
const params = new URLSearchParams(document.location.search);
if (params.has("theme")) {
    function deepCopy(dst, src) {
        for (const [key, value] of Object.entries(src)) {
            if (typeof value == "object" && !Array.isArray(value) && value !== null) {
                if (typeof dst[key] == "object") { // No need to make a new object if it's already been created
                    deepCopy(dst[key], value);
                } else {
                    const subObj = {}
                    deepCopy(subObj, value);
                    dst[key] = subObj
                }
            } else {
                dst[key] = value
            }
        }
    }
    const queryTheme = JSON.parse(params.get("theme"));
    deepCopy(window.theme, queryTheme);
}

const walls = {
    vert: [[0, [0, 400]], [100, [0, 300]], [200, [0, 300]], [300, [100, 200]], [400, [0, 400]]],
    horiz: [[0, [0, 400]], [100, [300, 400]], [200, [300, 400]], [300, [100, 200]], [400, [0, 400]]],
};
document.vertWalls = walls.vert;
document.horizWalls = walls.horiz;