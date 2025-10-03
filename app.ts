import * as rl from 'readline-sync';
import type { Country, City } from './types';

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

async function main(){
    console.log("Welcome to the JSON data viewer!")
    console.log();
    let status = true;
    while (status){
        console.log("1. View all Data")
        console.log("2. Filter by ID")
        console.log("3. Exit")

        const choice = rl.questionInt("Please enter your choice: ")

        switch (choice){
            case 1:
                 await viewAllData();
                  console.log();
                break;
            case 2:
                 await filterdData();
                 break;
            case 3: 
                 status = false;
                 break;
            default: console.log("Please enter a valid number;")
            break;


        }
    }
}
main();

async function viewAllData() {
    const dataCity = await getCityInfo();
    const dataCountry = await getCountryInfo();

    dataCity.forEach(el => {
        console.log(`${el.name} (${el.id})`)
    });
    
}

async function filterdData(){
    const dataCity = await getCityInfo();
    const dataCountry = await getCountryInfo();

    const choiceId = rl.question("Please enter the ID you want to filter by: ")
    const choiceData = dataCity.find(el => el.id === choiceId)
    console.log(`
        - ${choiceData?.name} (${choiceData?.id})
        - Description: ${choiceData?.description}
        - Population: ${choiceData?.population}
        - Is Capital: ${choiceData?.isCapital}
        - FoundedDate: ${choiceData?.foundedDate}
        - ImageUrl: ${choiceData?.imageUrl}
        - RegionType: ${choiceData?.regionType}
        - Landmarks: ${choiceData?.landmarks}
        - Countryid: ${choiceData?.countryid}
        `)
}

