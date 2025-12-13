import { NextFunction, Request, Response } from "express";

export function secureMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect("/login");
    }
};

export function flashMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.locals.message = req.session.message || null;
    delete req.session.message;
    next();
}

export function isAdmin(req: any, res: any, next: any) {
    if (!req.session.user || req.session.user.role !== "ADMIN") {
        return res.redirect("/");
    }
    next();
}

export function ifLoggedIn(req: any, res: any, next: any){
    if(req.session && req.session.user){
        return res.redirect("/")
    }
    next();
}
