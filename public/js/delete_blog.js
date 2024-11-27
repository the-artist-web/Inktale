'use strict';

import Snackbar from "./snackbar.js";

const blogDeleteBtnAll = document.querySelectorAll("[data-blog-delete-btn]");

const handleBlogDelete = async (blogId) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) return;

    const response = await fetch(`${window.location.origin}/blogs/${blogId}/delete`, {
        method: "DELETE"
    });

    if (response.ok) {
        Snackbar({
            message: "Blog has been deleted."
        });

        window.location.reload();
    };
};

blogDeleteBtnAll.forEach(deleteBtn => {
    const blogId = deleteBtn.dataset.blogDeleteBtn;
    
    deleteBtn.addEventListener("click", handleBlogDelete.bind(null, blogId));
});