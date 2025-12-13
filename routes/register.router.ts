import { Router } from "express";
import { User } from "../types";
import { login, registerUser } from "../database";
import session from "../session";
import { ifLoggedIn } from "../middlewares/middlewares";

const router = Router();

router.post("/", async (req, res)=>{
    const email: string = req.body.identifier;
    const password:string = req.body.password;

    try{
        await registerUser(email, password)
        res.redirect("/login");
    }catch(error:any){
        res.render("register", {pageCss: "register", error: error.message})
    }
})


router.get("/", ifLoggedIn, (req, res)=>{
    res.render("register", {pageCss: "register"})
})

export default router;