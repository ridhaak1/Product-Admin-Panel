import * as rl from 'readline-sync';
import type { Country, City } from './types';
import express from "express";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


async function getCityInfo():Promise<City[]>{
    try {
        const response = await fetch("https://raw.githubusercontent.com/ridhaak1/dataset-webontwekkeling/refs/heads/main/steden.json");
        const dataCity:City[] = await response.json();
        return dataCity;
    } catch (error: any){
        return error;
    }
}
async function getCountryInfo():Promise<Country[]> {
    try {
        const response = await fetch("https://raw.githubusercontent.com/ridhaak1/dataset-webontwekkeling/refs/heads/main/landen.json");
        const dataCountry: Country[] = await response.json();
        return dataCountry;
    } catch (error: any){
        return error;
    }
}

app.get("/", async (req, res)=>{
    const cities = await getCityInfo();
    const search = req.query.search?.toString().toLocaleLowerCase() || "";
    const sortField = req.query.sortField;
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
    res.render("index.ejs", {cities: sortedCities, search, currentSort: sortField, currentOrder: order})
})

app.get("/details/:id", async (req, res)=>{
    const cities = await getCityInfo();
    const id = req.params.id;
    const city = cities.find(c => c.id === id);
    res.render("details.ejs", {city})
})

app.listen(5000, ()=>{
    console.log("Server is running ...")
})