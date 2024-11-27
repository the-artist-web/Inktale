'use strict';

const snackbarWrapper = document.querySelector("[data-stackbar-wrapper]");
let lastTimeout = null;

const Snackbar = (props) => {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    props.type && snackbar.classList.add(props.type);
    snackbar.innerHTML = `
        <p class="snackbar-text body-medium">
            ${props.message}
        </p>
    `;

    snackbarWrapper.innerHTML = "";
    snackbarWrapper.append(snackbar);

    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(() => {
        snackbarWrapper.removeChild(snackbar);
    }, 10000);
};

export default Snackbar;