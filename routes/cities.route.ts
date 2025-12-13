import { Router } from "express";
import { City } from "../types";
import { citiesCollection, updateCity } from "../database";
import { secureMiddleware, isAdmin } from "../middlewares/middlewares";

const router = Router();

router.get("/", secureMiddleware, async (req, res)=>{
    const cities = await citiesCollection.find().toArray();
    const search = req.query.search?.toString().toLocaleLowerCase() || "";
    const sortField = req.query.sortField || "name";
    const order = req.query.order || "asc";
    let sortedCities = [...cities];
    if(search){
        sortedCities = sortedCities.filter(c => c.name.toLocaleLowerCase().includes(search));
    }
    if(sortField === "name"){
        order === "asc" ? sortedCities.sort((a,b)=> a.name.localeCompare(b.name)) :
        sortedCities.sort((a,b)=> b.name.localeCompare(a.name))
    }
    if(sortField ==="foundDate") {
        sortedCities.sort((a,b)=> {
            const dateA = new Date(a.foundedDate);
            const dateB = new Date(b.foundedDate);
            const timeA = dateA.getTime();
            const timeB = dateB.getTime();

            return order === "asc" ? timeA - timeB : timeB - timeA
        });
    }
    if(sortField === "population"){
        sortedCities.sort((a,b) => 
        order=== "asc" ? a.population - b.population : b.population - a.population)
    }
    res.render("cities.ejs", {cities: sortedCities, search, currentSort: sortField, currentOrder: order})
})

router.get("/details/:id", secureMiddleware, async (req, res)=>{
    const cities = await citiesCollection.find().toArray();
    const id = req.params.id;
    const city = cities.find(c => c.id === id);
    res.render("cityDetails.ejs", {city, pageCss: "details", currentUser: req.session.user})
})

router.get("/editcity/:id", secureMiddleware, isAdmin, async (req, res)=>{
    const cities = await citiesCollection.find().toArray();
    const id = req.params.id;
    const city = cities.find(c => c.id === id);
    res.render("edit.ejs", {city, pageCss: "editPage"})
})

router.post("/editcity", secureMiddleware, async (req, res) => {
    const {id, name, description, population, isCapital } = req.body;
    await updateCity(id, {
        name,
        description,
        population: Number(population),
        isCapital: isCapital === "true"
    });
    res.redirect("/cities");
});

export default router;