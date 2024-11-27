'use strict';

/**
 * import module
 */
import imagePreview from "./utils/imagePreview.js";
import Snackbar from "./snackbar.js";
import config from "./config.js";
import imageAsDataURL from "./utils/imageAsDataURL.js";

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
 * Handle blog public
 */
const form = document.querySelector("[data-form]");
const publishBtn = document.querySelector("[data-publish-btn]");
const progressBar = document.querySelector("[data-porgress-bar]");

const handlePublishBlog = async function (event) {
    event.preventDefault();

    publishBtn.setAttribute("disabled", "");

    const formData = new FormData(form);
    
    if (!formData.get("banner").size) {
        publishBtn.removeAttribute("disabled");

        Snackbar({
            type: "error",
            message: 'You didn\'t select any image for blog banner.'
        });
        return;
    };

    if (!formData.get("banner").size > config.blogBanner.maxByteSize) {
        publishBtn.removeAttribute("disabled");

        Snackbar({
            type: "error",
            message: 'Image should be less than 5MB'
        });
        return;
    };

    formData.set("banner", await imageAsDataURL(formData.get("banner")));

    const body = Object.fromEntries(formData.entries());

    progressBar.classList.add("loading");

    const response = await fetch(`${window.location.origin}/createblog`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        Snackbar({ message: "Your blog has been created." });
        progressBar.classList.add("loading-end");

        return window.location = response.url;
    };

    if (response.status === 400) {
        publishBtn.removeAttribute("disabeld");
        progressBar.classList.add("loading-end");
        const { message } = await response.json();
        Snackbar({ type: "error", message });
    };
};

form.addEventListener("submit", handlePublishBlog);