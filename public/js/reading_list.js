'use strict';

/**
 * custom module
 */
import dialog from "./dialog.js";

const readingListBtn = document.querySelector("[data-reading-list-btn]");
const readingListNumber = document.querySelector("[data-reading-list-number]");

const addToReadingList = async () => {
    try {
        const response = await fetch(`${window.location}/readingList`, {
            method: "PUT"
        });

        if (response.ok) {
            readingListBtn.classList.add("active", "reaction-anim-add");
            readingListBtn.classList.remove("reaction-anim-remove");
            readingListNumber.textContent = Number(readingListNumber.textContent) + 1;
        };

        if (response.status === 401) {
            const $dialog = dialog({
                title: "Login to continue",
                content: `We're a place where coders share, stay up-to-date and grow their careers.`
            });

            document.body.appendChild($dialog);
        };
    } catch (error) {
        console.log("Error: ", error.message);
    };
};

const removeFromReadingList = async () => {
    try {
        const response = await fetch(`${window.location}/readingList`, {
            method: "DELETE"
        });

        if (response.ok) {
            readingListBtn.classList.add("reaction-anim-remove");
            readingListBtn.classList.remove("active", "reaction-anim-add");
            readingListNumber.textContent = Number(readingListNumber.textContent) - 1;
        };

        if (response.status === 401) {
            console.log("need to login");
        };
    } catch (error) {
        console.log("Error Delete From Reading List: ", error.message);
    };
};

readingListBtn.addEventListener("click", async () => {
    readingListBtn.setAttribute("disabled", "");

    if (!readingListBtn.classList.contains("active")) {
        await addToReadingList();
    } else {
        await removeFromReadingList();
    };

    readingListBtn.removeAttribute("disabled");
});