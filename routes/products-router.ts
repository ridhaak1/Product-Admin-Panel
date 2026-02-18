import { Router } from "express";
import { Product } from "../types";
import {
  productsCollection,
  categoriesCollection,
  updateProduct,
} from "../database";
import { secureMiddleware, isAdmin } from "../middlewares/middlewares";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/", secureMiddleware, async (req, res) => {
  try {
    const search = req.query.search?.toString() || "";
    const currentCategory = req.query.category?.toString() || "";
    const sortField = req.query.sortField?.toString() || "name";
    const order = req.query.order === "desc" ? -1 : 1;

    const filter: any = { isDeleted: { $ne: true } };
    if (search) filter.name = { $regex: search, $options: "i" };
    if (currentCategory) filter.categoryId = new ObjectId(currentCategory);

    const sort: any = {};
    sort[sortField] = order;

    const products = await productsCollection.find(filter).sort(sort).toArray();
    const categories = await categoriesCollection.find().toArray();

    const productsWithCategoryName = products.map((product) => {
      const category = categories.find(
        (cat) => cat._id.toString() === product.categoryId.toString(),
      );
      return {
        ...product,
        categoryName: category ? category.name : "Unknown",
      };
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
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/details/:id", secureMiddleware, async (req, res) => {
  const product = await productsCollection.findOne({
    _id: new ObjectId(req.params.id),
    isDeleted: { $ne: true },
  });

  if (!product) return res.status(404).send("Product not found");

  res.render("productDetails.ejs", {
    product,
    pageCss: "productDetails.css",
    currentUser: req.session.user,
    pageTitle: "Product Detail",
  });
});

router.get("/edit/:id", secureMiddleware, isAdmin, async (req, res) => {
  const product = await productsCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  const categories = await categoriesCollection.find().toArray();
  if (!product) return res.status(404).send("Product not found");

  res.render("editProduct.ejs", {
    product,
    categories,
    pageCss: "editPage.css",
    currentUser: req.session.user,
    pageTitle: "Edit Product",
  });
});

router.post("/edit", secureMiddleware, isAdmin, async (req, res) => {
  const { id, name, description, price, stock, discount, categoryId } =
    req.body;

  await updateProduct(id, {
    name,
    description,
    price: Number(price),
    stock: Number(stock),
    discount: Number(discount),
    categoryId,
  });

  res.redirect("/products");
});

router.get("/create", secureMiddleware, isAdmin, async (req, res) => {
  const categories = await categoriesCollection.find().toArray();

  res.render("createProduct.ejs", {
    categories,
    pageCss: "createPage.css",
    pageTitle: "Create Product",
    currentUser: req.session.user,
  });
});

router.post("/create", secureMiddleware, isAdmin, async (req, res) => {
  const { name, description, price, stock, discount, categoryId, imageUrl } =
    req.body;

  await productsCollection.insertOne({
    name,
    description,
    price: Number(price),
    stock: Number(stock),
    discount: Number(discount),
    categoryId: new ObjectId(categoryId),
    imageUrl,
    isDeleted: false,
    createdAt: new Date(),
  });

  res.redirect("/products");
});

router.post("/delete/:id", secureMiddleware, isAdmin, async (req, res) => {
  await updateProduct(req.params.id, { isDeleted: true });
  res.redirect("/products");
});

export default router;
