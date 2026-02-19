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
exports.userCollection = exports.categoriesCollection = exports.productsCollection = exports.client = exports.MONGODB_URI = void 0;
exports.updateProduct = updateProduct;
exports.registerUser = registerUser;
exports.login = login;
exports.connect = connect;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.client = new mongodb_1.MongoClient(exports.MONGODB_URI);
exports.productsCollection = exports.client
    .db("shopDB")
    .collection("products");
exports.categoriesCollection = exports.client
    .db("shopDB")
    .collection("categories");
exports.userCollection = exports.client
    .db("worldDB")
    .collection("users");
function updateProduct(id, updatedCity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield exports.productsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updatedCity });
        }
        catch (e) {
            console.log(e);
        }
    });
}
function createInitialUser() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield exports.userCollection.countDocuments()) > 1) {
            return;
        }
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        if (email === undefined || password === undefined) {
            throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment");
        }
        yield exports.userCollection.insertOne({
            email: email,
            password: yield bcrypt_1.default.hash(password, 10),
            role: "ADMIN",
        });
        const userEmail = process.env.USER_USERNAME;
        const userPassword = process.env.USER_PASSWORD;
        if (!userEmail || !userPassword) {
            throw new Error("USER_USERNAME and USER_PASSWORD must be set in environment");
        }
        yield exports.userCollection.insertOne({
            email: userEmail,
            password: yield bcrypt_1.default.hash(userPassword, 10),
            role: "USER",
        });
        console.log("Initial users added: ADMIN and USER");
    });
}
function registerUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw new Error("All fields are required");
        }
        const existingUser = yield exports.userCollection.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield exports.userCollection.insertOne({
            email,
            password: hashedPassword,
            role: "USER",
        });
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (email === "" || password === "") {
            throw new Error("Email and password are required");
        }
        let user = yield exports.userCollection.findOne({ email: email });
        if (user) {
            if (yield bcrypt_1.default.compare(password, user.password)) {
                return user;
            }
            else {
                throw new Error("Incorrect password");
            }
        }
        else {
            throw new Error("User not found");
        }
    });
}
function exit() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.close();
            console.log("Disconnected from database");
        }
        catch (error) {
            console.error(error);
        }
        process.exit(0);
    });
}
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield createInitialUser();
            console.log("Connected to DB");
            process.on("SIGINT", exit);
        }
        catch (e) {
            console.log(e);
        }
    });
}
