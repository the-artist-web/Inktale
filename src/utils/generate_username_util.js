'use strict';

module.exports = (name) => {
    const username = name.toLowerCase().replace(" ", "");
    return `${username}-${Date.now()}`;
};