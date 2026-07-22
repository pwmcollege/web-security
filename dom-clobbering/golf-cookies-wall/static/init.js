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
    // Data format for walls: [x,[yMin,yMax]] for vertical, [y, [xMin,xMax]] for horizontal
    return {
        vert: [[0, [0, 400]], [100, [0, 300]], [200, [0, 300]], [300, [100, 200]], [400, [0, 400]]],
        horiz: [[0, [0, 400]], [100, [300, 400]], [200, [300, 400]], [300, [100, 200]], [400, [0, 400]]],
    };
}();
