import { Router } from "express";
import { Category } from "../types";
import { categoriesCollection } from "../database";
import { secureMiddleware, isAdmin } from "../middlewares/middlewares";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/", secureMiddleware, async (req, res) => {
  const search = req.query.search?.toString().toLowerCase() || "";
  const sortField = req.query.sortField || "name";
  const order = req.query.order || "asc";

  const categories = await categoriesCollection.find().toArray();
  let filteredCategories = [...categories];

  // Search by name
  if (search) {
    filteredCategories = filteredCategories.filter((c) =>
      c.name.toLowerCase().includes(search),
    );
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
});

router.get("/details/:id", secureMiddleware, async (req, res) => {
  const category = await categoriesCollection.findOne({
    _id: new ObjectId(req.params.id),
  });

  if (!category) return res.status(404).send("Category not found");

  res.render("categoryDetail.ejs", {
    category,
    pageCss: "categoryDetails.css",
    currentUser: req.session.user,
    pageTitle: "Category Detail",
  });
});

router.get("/create", secureMiddleware, isAdmin, async (req, res) => {
  res.render("createCategory.ejs", { pageCss: "createPage" });
});

router.post("/create", secureMiddleware, isAdmin, async (req, res) => {
  const { name, slug, description, imageUrl } = req.body;

  await categoriesCollection.insertOne({
    name,
    slug,
    description,
    imageUrl,
  });

  res.redirect("/categories");
});

router.get("/edit/:id", secureMiddleware, isAdmin, async (req, res) => {
  const category = await categoriesCollection.findOne({
    _id: new ObjectId(req.params.id),
  });

  if (!category) return res.status(404).send("Category not found");

  res.render("editCategory.ejs", {
    category,
    pageCss: "editPage",
  });
});

router.post("/edit", secureMiddleware, isAdmin, async (req, res) => {
  const { id, name, slug, description, imageUrl } = req.body;

  await categoriesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, slug, description, imageUrl } },
  );

  res.redirect("/categories");
});

router.post("/delete/:id", secureMiddleware, isAdmin, async (req, res) => {
  await categoriesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect("/categories");
});

export default router;
