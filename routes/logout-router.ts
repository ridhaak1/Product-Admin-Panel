import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.redirect("/products");
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
});

export default router;