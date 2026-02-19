"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureMiddleware = secureMiddleware;
exports.flashMiddleware = flashMiddleware;
exports.isAdmin = isAdmin;
exports.ifLoggedIn = ifLoggedIn;
function secureMiddleware(req, res, next) {
    if (req.session.user) {
        res.locals.user = req.session.user;
        next();
    }
    else {
        res.redirect("/login");
    }
}
;
function flashMiddleware(req, res, next) {
    res.locals.message = req.session.message || null;
    delete req.session.message;
    next();
}
function isAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== "ADMIN") {
        return res.redirect("/");
    }
    next();
}
function ifLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect("/");
    }
    next();
}
