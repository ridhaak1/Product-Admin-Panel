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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const products_router_1 = __importDefault(require("./routes/products-router"));
const categories_router_1 = __importDefault(require("./routes/categories-router"));
const dashboard_router_1 = __importDefault(require("./routes/dashboard-router"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const logout_router_1 = __importDefault(require("./routes/logout-router"));
const register_router_1 = __importDefault(require("./routes/register.router"));
const database_1 = require("./database");
const session_1 = __importDefault(require("./session"));
const middlewares_1 = require("./middlewares/middlewares");
const app = (0, express_1.default)();
app.use(session_1.default);
app.use(middlewares_1.flashMiddleware);
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((req, res, next) => {
    var _a;
    res.locals.user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
    next();
});
app.set("view engine", "ejs");
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    next();
});
app.use("/login", login_route_1.default);
app.use("/logout", logout_router_1.default);
app.use("/register", register_router_1.default);
app.use("/products", middlewares_1.secureMiddleware, products_router_1.default);
app.use("/categories", middlewares_1.secureMiddleware, categories_router_1.default);
app.use("/adminDashboard", middlewares_1.secureMiddleware, dashboard_router_1.default);
app.get("/", (req, res) => {
    res.redirect("/products");
});
// ---------------------
// START SERVER
// ---------------------
app.listen(process.env.port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connect)();
        console.log("Server started on http://localhost:" + process.env.port);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
}));
