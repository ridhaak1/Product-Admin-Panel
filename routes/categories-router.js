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
const mongodb_1 = require("mongodb");
const router = (0, express_1.Router)();
router.get("/", middlewares_1.secureMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const search = ((_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) || "";
    const sortField = req.query.sortField || "name";
    const order = req.query.order || "asc";
    const categories = yield database_1.categoriesCollection.find().toArray();
    let filteredCategories = [...categories];
    // Search by name
    if (search) {
        filteredCategories = filteredCategories.filter((c) => c.name.toLowerCase().includes(search));
    }
    // Sorting
    filteredCategories.sort((a, b) => {
        if (sortField === "name") {
            return order === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }
        return 0; // default no sorting
    });
    res.render("categories.ejs", {
        categories: filteredCategories,
        search,
        currentSort: sortField,
        currentOrder: order,
        currentUser: req.session.user,
        pageTitle: "Catogories",
        pageCss: "categories.css",
    });
}));
router.get("/details/:id", middlewares_1.secureMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield database_1.categoriesCollection.findOne({
        _id: new mongodb_1.ObjectId(req.params.id),
    });
    if (!category)
        return res.status(404).send("Category not found");
    res.render("categoryDetail.ejs", {
        category,
        pageCss: "categoryDetails.css",
        currentUser: req.session.user,
        pageTitle: "Category Detail",
    });
}));
router.get("/create", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("createCategory.ejs", { pageCss: "createPage" });
}));
router.post("/create", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, slug, description, imageUrl } = req.body;
    yield database_1.categoriesCollection.insertOne({
        name,
        slug,
        description,
        imageUrl,
    });
    res.redirect("/categories");
}));
router.get("/edit/:id", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield database_1.categoriesCollection.findOne({
        _id: new mongodb_1.ObjectId(req.params.id),
    });
    if (!category)
        return res.status(404).send("Category not found");
    res.render("editCategory.ejs", {
        category,
        pageCss: "editPage",
    });
}));
router.post("/edit", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, slug, description, imageUrl } = req.body;
    yield database_1.categoriesCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name, slug, description, imageUrl } });
    res.redirect("/categories");
}));
router.post("/delete/:id", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.categoriesCollection.deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
    res.redirect("/categories");
}));
exports.default = router;
