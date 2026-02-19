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
    var _a, _b, _c;
    try {
        const search = ((_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        const currentCategory = ((_b = req.query.category) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        const sortField = ((_c = req.query.sortField) === null || _c === void 0 ? void 0 : _c.toString()) || "name";
        const order = req.query.order === "desc" ? -1 : 1;
        const filter = { isDeleted: { $ne: true } };
        if (search)
            filter.name = { $regex: search, $options: "i" };
        if (currentCategory)
            filter.categoryId = new mongodb_1.ObjectId(currentCategory);
        const sort = {};
        sort[sortField] = order;
        const products = yield database_1.productsCollection.find(filter).sort(sort).toArray();
        const categories = yield database_1.categoriesCollection.find().toArray();
        const productsWithCategoryName = products.map((product) => {
            const category = categories.find((cat) => cat._id.toString() === product.categoryId.toString());
            return Object.assign(Object.assign({}, product), { categoryName: category ? category.name : "Unknown" });
        });
        res.render("products.ejs", {
            products: productsWithCategoryName,
            categories,
            search,
            currentCategory,
            currentSort: sortField,
            currentOrder: order === 1 ? "asc" : "desc",
            currentUser: req.session.user,
            pageCss: "products.css",
            pageTitle: "Products",
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}));
router.get("/details/:id", middlewares_1.secureMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield database_1.productsCollection.findOne({
        _id: new mongodb_1.ObjectId(req.params.id),
        isDeleted: { $ne: true },
    });
    if (!product)
        return res.status(404).send("Product not found");
    res.render("productDetails.ejs", {
        product,
        pageCss: "productDetails.css",
        currentUser: req.session.user,
        pageTitle: "Product Detail",
    });
}));
router.get("/edit/:id", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield database_1.productsCollection.findOne({
        _id: new mongodb_1.ObjectId(req.params.id),
    });
    const categories = yield database_1.categoriesCollection.find().toArray();
    if (!product)
        return res.status(404).send("Product not found");
    res.render("editProduct.ejs", {
        product,
        categories,
        pageCss: "editPage.css",
        currentUser: req.session.user,
        pageTitle: "Edit Product",
    });
}));
router.post("/edit", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, description, price, stock, discount, categoryId } = req.body;
    yield (0, database_1.updateProduct)(id, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        discount: Number(discount),
        categoryId,
    });
    res.redirect("/products");
}));
router.get("/create", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield database_1.categoriesCollection.find().toArray();
    res.render("createProduct.ejs", {
        categories,
        pageCss: "createPage.css",
        pageTitle: "Create Product",
        currentUser: req.session.user,
    });
}));
router.post("/create", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, discount, categoryId, imageUrl } = req.body;
    yield database_1.productsCollection.insertOne({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        discount: Number(discount),
        categoryId: new mongodb_1.ObjectId(categoryId),
        imageUrl,
        isDeleted: false,
        createdAt: new Date(),
    });
    res.redirect("/products");
}));
router.post("/delete/:id", middlewares_1.secureMiddleware, middlewares_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.updateProduct)(req.params.id, { isDeleted: true });
    res.redirect("/products");
}));
exports.default = router;
