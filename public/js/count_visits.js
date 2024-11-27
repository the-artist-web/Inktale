'use strict';

const countVisit = async () => {
    try {
        const response = await fetch(`${window.location}/visit`, {
            method: "PUT"
        });

        if (response.ok) {
            visitedBlogs.push(window.location.pathname);
            localStorage.setItem("visitedBlogs", JSON.stringify());
        };
    } catch (error) {
        console.error("Error Counting Visit: ", error.message);
        throw error;
    };
};

let visitedBlogs = localStorage.getItem("visitedBlogs");

if (!visitedBlogs) localsStorage.setItem("visitedBlogs", JSON.stringify([]));

visitedBlogs = JSON.parse(localStorage.getItem("visitedBlogs"));

if (!visitedBlogs.includes(window.location.pathname)) {
    countVisit();
};