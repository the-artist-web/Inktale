'use strict';

/**
 * scroll top app bar
 */
const topAppBar = document.querySelector("[data-top-app-bar]");
let lastScrollPos = 0;

window.addEventListener("scroll", (event) => {
    topAppBar.classList[window.scrollY > 50 ? "add" : "remove"]("active");

    topAppBar.classList[window.scrollY > lastScrollPos && window.scrollY > 50 ? "add" : "remove"]("hide");
    
    lastScrollPos = window.scrollY;
});

/**
 * toggle menu
 */
const menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

menuWrappers?.forEach((menuWrapper) => {
    const menuToggler = menuWrapper.querySelector("[data-menu-toggler]");
    const menu = menuWrapper.querySelector("[data-menu]");

    menuToggler.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
});

/**
 * Backward btn functionality in blog create page
 */
document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.querySelector("[data-back-btn]");
    
    if (backBtn) {
        const handleBackward = () => { window.history.back(); };
        backBtn.addEventListener("click", handleBackward);
    };
});

/**
 * Auto height textarea in blog create form
 */
const autoHeightTextarea = document.querySelector("[data-textarea-auto-height]");

const textareaAutoHeight = function () {
    this.style.height = this.scrollHeight + "px";
    this.style.maxHeight = this.scrollHeight + "px";
};

autoHeightTextarea?.addEventListener("input", textareaAutoHeight);

// Set initial textarea height
autoHeightTextarea && textareaAutoHeight.call(autoHeightTextarea);