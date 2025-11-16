import express from "express";
import citiesRouter from "./routes/cities.route"
import countriesRouter from "./routes/contries.route";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/cities", citiesRouter);
app.use("/countries", countriesRouter);

app.get("/", (req,res)=>{
    res.redirect("/cities");
})

app.listen(5000, ()=>{
    console.log("Server is running ...")
})