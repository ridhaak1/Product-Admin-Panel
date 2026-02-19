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
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
router.get("/", middlewares_1.ifLoggedIn, (req, res) => {
    res.render("register.ejs", {
        pageCss: "register.css",
        message: res.locals.message,
        currentUser: req.session.user,
        pageTitle: "Register",
    });
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email; // use email field from form
    const password = req.body.password;
    try {
        yield (0, database_1.registerUser)(email, password);
        req.session.message = {
            type: "success",
            message: "Account created successfully! Please login.",
        };
        res.redirect("/login");
    }
    catch (error) {
        req.session.message = {
            type: "error",
            message: error.message,
        };
        res.redirect("/register");
    }
}));
exports.default = router;
