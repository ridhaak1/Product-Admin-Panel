import { Router } from "express";
import { registerUser } from "../database";
import { ifLoggedIn } from "../middlewares/middlewares";

const router = Router();

router.get("/", ifLoggedIn, (req, res) => {
  res.render("register.ejs", {
    pageCss: "register.css",
    message: res.locals.message,
    currentUser: req.session.user,
    pageTitle: "Register",
  });
});

router.post("/", async (req, res) => {
  const email: string = req.body.email; // use email field from form
  const password: string = req.body.password;

  try {
    await registerUser(email, password);

    req.session.message = {
      type: "success",
      message: "Account created successfully! Please login.",
    };
    res.redirect("/login");
  } catch (error: any) {
    req.session.message = {
      type: "error",
      message: error.message,
    };
    res.redirect("/register");
  }
});

export default router;
