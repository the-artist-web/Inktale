'use strict';

/**
 * custom module
 */
import dialog from "./dialog.js";

const reactionBtn = document.querySelector("[data-reaction-btn]");
const reactionNumber = document.querySelector("[data-reaction-number]");

const addReaction = async () => {
    try {
        const response = await fetch(`${window.location}/reactions`, {
            method: "PUT"
        });

        if (response.ok) {
            reactionBtn.classList.add("active", "reaction-anim-add");
            reactionBtn.classList.remove("reaction-anim-remove");
            reactionNumber.textContent = Number(reactionNumber.textContent) + 1;
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

const removeReaction = async () => {
    try {
        const response = await fetch(`${window.location}/reactions`, {
            method: "DELETE"
        });

        if (response.ok) {
            reactionBtn.classList.add("reaction-anim-remove");
            reactionBtn.classList.remove("active", "reaction-anim-add");
            reactionNumber.textContent = Number(reactionNumber.textContent) - 1;
        };
    } catch (error) {
        console.log("Error Removing reactions: ", error.message);
    };
};

reactionBtn.addEventListener("click", async () => {
    reactionBtn.setAttribute("disabled", "");

    if (!reactionBtn.classList.contains("active")) {
        await addReaction();
    } else {
        await removeReaction();
    };

    reactionBtn.removeAttribute("disabled");
});