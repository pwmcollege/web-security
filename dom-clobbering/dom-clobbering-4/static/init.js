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

const DEFAULT_WALLS = {
    vert: [[0, [0, 400]], [100, [0, 300]], [200, [0, 300]], [300, [100, 200]], [400, [0, 400]]],
    horiz: [[0, [0, 400]], [100, [300, 400]], [200, [300, 400]], [300, [100, 200]], [400, [0, 400]]],
};
document.cookie = "default="+JSON.stringify(DEFAULT_WALLS);

const activeLayout = function () {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        if (cookie.trim().startsWith("active=")) {
            return cookie.split("=")[1];
        }
    }
    return "default";
}();
window.walls = function () {
    if (activeLayout != "default") {
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            if (cookie.trim().startsWith(activeLayout + "=")) {
                return JSON.parse(cookie.split("=")[1]);
            }
        }
    }
    return DEFAULT_WALLS;
}();