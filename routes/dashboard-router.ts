import { Router } from "express";
import {
  productsCollection,
  categoriesCollection,
  userCollection,
} from "../database";
import { secureMiddleware, isAdmin } from "../middlewares/middlewares";

const router = Router();

router.get("/", secureMiddleware, isAdmin, async (req, res) => {
  try {
    // 1️⃣ Count totals
    const totalProducts = await productsCollection.countDocuments({
      isDeleted: { $ne: true },
    });
    const totalCategories = await categoriesCollection.countDocuments();
    const totalUsers = await userCollection.countDocuments();

    // 2️⃣ Recent products
    const recentProducts = await productsCollection
      .find({ isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // 3️⃣ Recent categories
    const recentCategories = await categoriesCollection
      .find()
      .sort({ _id: -1 })
      .limit(5)
      .toArray();

    // 4️⃣ Recent users
    const recentUsers = await userCollection
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
