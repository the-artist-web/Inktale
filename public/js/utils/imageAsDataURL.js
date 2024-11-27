'use strict';

const imageAsDataURL = (imageBlog) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(imageBlog);

    return new Promise((resolve, reject) => {
        fileReader.addEventListener("load", () => {
            resolve(fileReader.result);
        });

        fileReader.addEventListener("error", () => {
            reject(fileReader.error);
        });
    });
};

export default imageAsDataURL;