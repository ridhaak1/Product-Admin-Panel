import { Router } from "express";
import { User } from "../types";
import { login } from "../database";
import { ifLoggedIn } from "../middlewares/middlewares";

const router = Router();

router.get("/", (req, res) => {
    res.render("login.ejs", {
        pageCss: "login.css",
        message: res.locals.message,
        pageTitle: "Login",
        currentUser: req.session.user
    });
});

router.post("/", async (req, res) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        let user: User = await login(email, password);
        delete user.password; // remove password before storing in session

        req.session.user = user;
        req.session.message = { type: "success", message: "Login successful" };
        res.redirect("/products"); // Redirect to products page after login
    } catch (e: any) {
        req.session.message = { type: "error", message: e.message };
        res.redirect("/login");
    }
});

export default router;