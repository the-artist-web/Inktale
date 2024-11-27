'use strict';

import Snackbar from "./snackbar.js";
import imagePreview from "./utils/imagePreview.js";
import imageAsDataURL from "./utils/imageAsDataURL.js";
import config from "./config.js";

const $imageField = document.querySelector("[data-image-field]");
const $imagePreview = document.querySelector("[data-image-preview]");
const $imagePreviewClear = document.querySelector("[data-image-preview-clear]");

$imageField.addEventListener("change", () => {
    imagePreview($imageField, $imagePreview);
});

const clearImagePreview = () => {
    $imagePreview.classList.remove("show");
    $imagePreview.innerHTML = "";
    $imageField.value = "";
};

$imagePreviewClear.addEventListener("click", clearImagePreview);

/**
 * Basic info update functionality 
 */
const basicInfoForm = document.querySelector("[data-basic-infor-form]");
const basicInfoSubmit = document.querySelector("[data-basic-infor-submit]");
const oldFormData = new FormData(basicInfoForm);
const progressBar = document.querySelector("[data-porgress-bar]");

const updateBasicInfo = async (event) => {
    event.preventDefault();

    basicInfoSubmit.setAttribute("disabled", "");

    const formData = new FormData(basicInfoForm);

    if (formData.get("profilePhoto").size > config.profilePhoto.maxByteSize) {
        basicInfoSubmit.removeAttribute("disabled");
        Snackbar({
            type: "error",
            message: "Your profile photo should be less than 1MB."
        });
        return;
    };

    if (!formData.get("profilePhoto")) { formData.delete("profilePhoto"); };

    if (formData.get("profilePhoto").size) {
        formData.set("profilePhoto", await imageAsDataURL($imageField.files[0]));
    };

    if (formData.get("username") === oldFormData.get("email")) {
        formData.delete("username");
    };

    if (formData.get("email") === oldFormData.get("email")) {
        formData.delete("email");
    };

    const body = Object.fromEntries(formData.entries());
    
    progressBar.classList.add("loading");

    const response = await fetch(`${window.location.href}/basic_info`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        basicInfoSubmit.removeAttribute("disabeld");
        progressBar.classList.add("loading-end");
        Snackbar({ message: "Your profile has been updated." });
        window.location.reload();
    };

    if (response.status === 400) {
        basicInfoSubmit.removeAttribute("disabeld");
        progressBar.classList.add("loading-end");
        const { message } = await response.json();
        Snackbar({
            type: "error",
            message
        });
    };
};

basicInfoForm.addEventListener("submit", updateBasicInfo);

/**
 * Password update functionality 
 */
const passwordForm = document.querySelector("[data-password-form]");
const passwordSumbit = document.querySelector("[data-basic-infor-submit]");

const updatePassword = async (event) => {
    event.preventDefault();

    passwordSumbit.setAttribute("disabled", "");

    const formData = new FormData(passwordForm);

    if (formData.get("password") !== formData.get("confirm_password")) {
        passwordSumbit.removeAttribute("disabled");
        Snackbar({
            type: "error",
            message: "Please ensure your password and confirm password fields contain the same value."
        });
        return;
    };

    const body = Object.fromEntries(formData.entries());
    
    progressBar.classList.add("loading");

    const response = await fetch(`${window.location.href}/password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        passwordSumbit.removeAttribute("disabeld");
        progressBar.classList.add("loading-end");
        Snackbar({ message: "Your password has been updated." });
        window.location.reload();
    };

    if (response.status === 400) {
        passwordSumbit.removeAttribute("disabeld");
        progressBar.classList.add("loading-end");
        const { message } = await response.json();
        Snackbar({
            type: "error",
            message
        });
    };
};

passwordForm.addEventListener("submit", updatePassword);

/**
 * Account delete functionality
 */
const accountDeleteBtn = document.querySelector("[data-accout-delete]");

const deleteAccount = async () => {
    const confirmDelete = confirm("Are you sure you want to delete your account?");

    if (!confirmDelete) return;

    accountDeleteBtn.setAttribute("disabled", "");

    progressBar.classList.add("loading");

    const response = await fetch(`${window.location.href}/account`, {
        method: "DELETE"
    });

    if (response.ok) {
        progressBar.classList.add("loading");

        window.location = `${window.location.origin}/`;
    };
};

accountDeleteBtn.addEventListener("click", deleteAccount);