'use strict';

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/");
    } catch (error) {
        console.error("Error Logout: ", error.message);
        throw error;
    };
};

module.exports = logout;