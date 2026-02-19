"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../database");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("login.ejs", {
        pageCss: "login.css",
        message: res.locals.message,
        pageTitle: "Login",
        currentUser: req.session.user
    });
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        let user = yield (0, database_1.login)(email, password);
        delete user.password; // remove password before storing in session
        req.session.user = user;
        req.session.message = { type: "success", message: "Login successful" };
        res.redirect("/products"); // Redirect to products page after login
    }
    catch (e) {
        req.session.message = { type: "error", message: e.message };
        res.redirect("/login");
    }
}));
exports.default = router;
