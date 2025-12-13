import express from "express";
import citiesRouter from "./routes/cities.route"
import countriesRouter from "./routes/contries.route";
import loginRouter from "./routes/login.route"
import registerRouter from "./routes/register.router"
import {connect} from "./database"
import session from "./session";
import { secureMiddleware, flashMiddleware } from "./middlewares/middlewares";

const app = express();

app.use(session); 
app.use(flashMiddleware);           
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
    res.locals.user = req.session?.user;
    next();
});

app.set("view engine", "ejs");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/cities", secureMiddleware, citiesRouter);
app.use("/countries", secureMiddleware, countriesRouter);


app.get("/", (req,res)=>{
    res.redirect("/cities");
});

// ---------------------
// START SERVER
// ---------------------
app.listen(process.env.port, async() => {
    try {
        await connect();
        console.log("Server started on http://localhost:" + process.env.port);
    } catch (e) {
        console.log(e);
        process.exit(1); 
    }
});
