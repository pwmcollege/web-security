"use strict";

(() => {
    const { maxUpload, limitLabel } = document.currentScript.dataset;
    const limit = Number(maxUpload);
    const message = `This archive is too large. Choose an archive of ${limitLabel} or less.`;

    window.unarchiveUploadLimit = {
        message,
        validate(file) {
            return file.size > limit ? message : "";
        },
    };
})();
