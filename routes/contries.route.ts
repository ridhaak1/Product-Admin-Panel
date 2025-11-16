import { Router } from "express";
import { Country } from "../types";

const router = Router();

async function getCountryInfo():Promise<Country[]> {
    try {
        const response = await fetch("https://raw.githubusercontent.com/ridhaak1/dataset-webontwekkeling/refs/heads/main/landen.json");
        const dataCountry: Country[] = await response.json();
        return dataCountry;
    } catch (error: any){
        return error;
    }
}

router.get("/", async (req, res) => {
    const countries = await getCountryInfo();

    const search = req.query.search?.toString().toLowerCase() || "";
    const sortField = req.query.sortField || "";
    const order = req.query.order || "asc";

    let filteredCountries = [...countries];

    if (search) {
        filteredCountries = filteredCountries.filter(c =>
            c.name.toLowerCase().includes(search)
        );
    }

    if (sortField === "name") {
        filteredCountries.sort((a, b) =>
            order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
    }

    if (sortField === "independenceYear") {
        filteredCountries.sort((a, b) =>
            order === "asc" ? a.independenceYear - b.independenceYear : b.independenceYear - a.independenceYear
        );
    }

    res.render("countries.ejs", {
        countries: filteredCountries,
        search,
        currentSort: sortField,
        currentOrder: order
    });
})
router.get("/details/:id", async (req, res) => {
    const countries = await getCountryInfo();
    const country = countries.find(c => c.id === req.params.id);
    res.render("countryDetail.ejs", { country });
});

export default router;