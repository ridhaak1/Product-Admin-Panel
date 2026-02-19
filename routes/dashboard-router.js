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
router.get("/", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1️⃣ Count totals
        const totalProducts = yield database_1.productsCollection.countDocuments({
            isDeleted: { $ne: true },
        });
        const totalCategories = yield database_1.categoriesCollection.countDocuments();
        const totalUsers = yield database_1.userCollection.countDocuments();
        // 2️⃣ Recent products
        const recentProducts = yield database_1.productsCollection
            .find({ isDeleted: { $ne: true } })
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();
        // 3️⃣ Recent categories
        const recentCategories = yield database_1.categoriesCollection
            .find()
            .sort({ _id: -1 })
            .limit(5)
            .toArray();
        // 4️⃣ Recent users
        const recentUsers = yield database_1.userCollection
            .find()
            .sort({ _id: -1 })
            .limit(5)
            .toArray();
        // 5️⃣ Render dashboard
        res.render("adminDashboard.ejs", {
            totalProducts,
            totalCategories,
            totalUsers,
            recentProducts,
            recentCategories,
            recentUsers,
            currentUser: req.session.user,
            pageCss: "adminDashboard.css",
            pageTitle: "Admin Dashboard",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}));
exports.default = router;
