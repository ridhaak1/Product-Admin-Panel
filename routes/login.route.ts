import { Router } from "express";
import { User } from "../types";
import { login } from "../database";
import session from "../session";
import { ifLoggedIn } from "../middlewares/middlewares";

const router = Router();

router.post("/", async(req, res) => {
    const email : string = req.body.email;
    const password : string = req.body.password;
    try {
        let user : User = await login(email, password);
        delete user.password; 
        req.session.user = user;
        req.session.message = {type: "success", message: "Login successful"};
        res.redirect("/")
    } catch (e : any) {
        req.session.message = {type: "error", message: e.message};
        res.redirect("/login");
    }
});

router.post("/logout", async(req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

router.get("/", ifLoggedIn, (req, res)=>{
    res.render("login", {pageCss: "login", message: res.locals.message})
})

export default router;