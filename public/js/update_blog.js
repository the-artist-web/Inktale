'use strict';

/**
 * import modules
 */
import Snackbar from "./snackbar.js";
import imagePreview from "./utils/imagePreview.js";
import imageAsDataURL from "./utils/imageAsDataURL.js";
import config from "./config.js";

// Selectors for image field, image preview, and clear preview button
const $imageField = document.querySelector("[data-image-field]");
const $imagePreview = document.querySelector("[data-image-preview]");
const $imagePreviewClear = document.querySelector("[data-image-preview-clear]");

// Event listener for image field change to trigger image preview
$imageField.addEventListener("change", () => {
    imagePreview($imageField, $imagePreview);
});

/**
 * Clears the image preview by removing the 'show' class from the preview container.
 */
const clearImgaePreview = function () {
    $imagePreview.classList.remove("show");
    $imagePreview.innerHTML = "";
};

$imagePreviewClear.addEventListener("click", clearImgaePreview);

/**
 * Handle blog update
 */
const form = document.querySelector("[data-form]");
const submitBtn = document.querySelector("[data-submit-btn]");
const progressBar = document.querySelector("[data-porgress-bar]");

const handlePublishUpdate = async (event) => {
    event.preventDefault();

    submitBtn.setAttribute("disabled", "");

    const formData = new FormData(form);

    if (!formData.get("banner").size && !imagePreview.hasChildNodes()) {
        publishBtn.removeAttribute("disabled");

        Snackbar({
            type: "error",
            message: 'You didn\'t select any image for blog banner.'
        });
        return;
    };

    if (!formData.get("banner").size > config.blogBanner.maxByteSize) {
        submitBtn.removeAttribute("disabled");

        Snackbar({
            type: "error",
            message: 'Image should be less than 5MB'
        });
        return;
    };

    if (!formData.get("banner").size && imagePreview.hasChildNodes()) {
        formData.delete("banner");
    };

    if (formData.get("banner")) {
        formData.set("banner", await imageAsDataURL(formData.get("banner")));
    };

    const body = Object.fromEntries(formData.entries());

    progressBar.classList.add("loading");

    const response = await fetch(window.location.href, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        submitBtn.removeAttribute("disabled");
        Snackbar({ message: "Your blog has been updated." });
        progressBar.classList.add("loading-end");

        window.location = window.location.href.replace("/edit", "");
        return;
    };

    if (response.status === 400) {
        submitBtn.removeAttribute("disabeld");
        progressBar.classList.add("loading-end");
        const { message } = await response.json();
        Snackbar({ type: "error", message });
    };
};

form.addEventListener("submit", handlePublishUpdate);