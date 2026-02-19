"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    req.session.destroy((err) => {
        if (err)
            return res.redirect("/products");
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
});
exports.default = router;
