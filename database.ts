import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { City, Country } from "./types";

dotenv.config();

export const client = new MongoClient(process.env.MongoUrl as string);

export const citiesCollection : Collection<City> = client.db("worldDB").collection<City>("cities");
export const landsCollection : Collection<Country> = client.db("worldDB").collection<Country>("countries");

export async function addDataToDB() {
    try{
        const resCities = await fetch("https://raw.githubusercontent.com/ridhaak1/dataset-webontwekkeling/refs/heads/main/steden.json");
        const cities = await resCities.json();
        const countCities = await citiesCollection.countDocuments();
        if (countCities === 0){
           await citiesCollection.insertMany(cities);
            console.log("Cities added in the database")
        }
         const resCountries = await fetch("https://raw.githubusercontent.com/ridhaak1/dataset-webontwekkeling/refs/heads/main/landen.json");
        const countries = await resCountries.json();
        const countContries = await landsCollection.countDocuments();
        if (countContries === 0){
           await landsCollection.insertMany(countries);
            console.log("countries added in the database")
        }
    }catch (e){
        console.log(e)
    }
}

async function exit() {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
}


export async function connect() {
    try{
        await client.connect();
        await addDataToDB();
        console.log("Connected to DB")
        process.on("SIGINT", exit)
    }catch(e){
        console.log(e)
    }finally{

    }    
}