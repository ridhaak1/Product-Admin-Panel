import express from "express";
import path from "path";
import productsRouter from "./routes/products-router";
import categoriesRouter from "./routes/categories-router";
import adminDashboard from "./routes/dashboard-router";
import loginRouter from "./routes/login.route";
import logoutRouter from "./routes/logout-router";
import registerRouter from "./routes/register.router";
import { connect } from "./database";
import session from "./session";
import { secureMiddleware, flashMiddleware } from "./middlewares/middlewares";

const app = express();

app.use(session);
app.use(flashMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.user = req.session?.user;
  next();
});

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);
app.use("/products", secureMiddleware, productsRouter);
app.use("/categories", secureMiddleware, categoriesRouter);
app.use("/adminDashboard", secureMiddleware, adminDashboard);

app.get("/", (req, res) => {
  res.redirect("/products");
});

// ---------------------
// START SERVER
// ---------------------
app.listen(process.env.port, async () => {
  try {
    await connect();
    console.log("Server started on http://localhost:" + process.env.port);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});
