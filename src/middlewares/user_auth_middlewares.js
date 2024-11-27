'use strict';

const userAuth = (req, res, next) => {
    const { userAuthenticated } = req.session.user || {};

    if (userAuthenticated) return next();

    res.redirect("/login");
};

module.exports = userAuth;