import { Router } from "express";
import { Country } from "../types";
import { countriesCollection } from "../database";
import { secureMiddleware } from "../middlewares/middlewares";

const router = Router();


router.get("/", secureMiddleware, async (req, res) => {
    const countries = await countriesCollection.find().toArray();

    const search = req.query.search?.toString().toLowerCase() || "";
    const sortField = req.query.sortField || "name";
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
router.get("/details/:id", secureMiddleware, async (req, res) => {
    const countries = await countriesCollection.find().toArray();
    const country = countries.find(c => c.id === req.params.id);
    res.render("countryDetail.ejs", { country, pageCss: "countryDetail"});
});

export default router;