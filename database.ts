import { Collection, MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { Product, Category, User } from "./types";
import { products } from "./products";
import { categories } from "./categories";
import bcrypt from "bcrypt";
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI!;

export const client = new MongoClient(MONGODB_URI as string);
export const productsCollection = client
  .db("shopDB")
  .collection<Product>("products");

export const categoriesCollection = client
  .db("shopDB")
  .collection<Category>("categories");

export const userCollection: Collection<User> = client.db("worldDB").collection<User>("users");

export async function addDataToDB() {
    try {
        // -------------------------
        // 1️⃣ Categories
        // -------------------------
        const countCategories = await categoriesCollection.countDocuments();
        if (countCategories === 0) {
            await categoriesCollection.insertMany(categories);
            console.log("✅ Categories added to DB");
        }

        // -------------------------
        // 2️⃣ Products
        // -------------------------
        const countProducts = await productsCollection.countDocuments();
        if (countProducts === 0) {
            await productsCollection.insertMany(products);
            console.log("✅ Products added to DB");
        }
    } catch (e) {
        console.log("❌ Error adding initial data:", e);
    }
}

export async function updateProduct(
    id: string | ObjectId,
    updatedCity: Partial<Product>
) {
    try{
        const result = await productsCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: updatedCity}
        )
    }catch (e){
        console.log(e)
    }
    
}

async function createInitialUser() {
    if (await userCollection.countDocuments() > 1) {
        return;
    }
    const email : string | undefined = process.env.ADMIN_EMAIL;
    const password : string | undefined = process.env.ADMIN_PASSWORD;
    if (email === undefined || password === undefined) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment");
    }
    await userCollection.insertOne({
        email: email,
        password: await bcrypt.hash(password, 10),
        role: "ADMIN"
    });

    const userEmail = process.env.USER_USERNAME;
    const userPassword = process.env.USER_PASSWORD;
    if (!userEmail || !userPassword) {
        throw new Error("USER_USERNAME and USER_PASSWORD must be set in environment");
    }
    await userCollection.insertOne({
        email: userEmail,
        password: await bcrypt.hash(userPassword, 10),
        role: "USER"
    });

    console.log("Initial users added: ADMIN and USER");
}

export async function registerUser(email:string, password:string) {
     if (!email || !password) {
        throw new Error("Alle velden zijn verplicht");
    }

     const existingUser = await userCollection.findOne({email});
    if (existingUser) {
        throw new Error("Gebruiker bestaat al");
    }

     const hashedPassword = await bcrypt.hash(password, 10);

      await userCollection.insertOne({
        email,
        password: hashedPassword,
        role: "USER"
    });
}

export async function login(email: string, password: string) {
    if (email === "" || password === "") {
        throw new Error("E-mailadres en wachtwoord zijn verplicht");
    }
    let user : User | null = await userCollection.findOne<User>({email: email});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            return user;
        } else {
            throw new Error("Wachtwoord is onjuist");
        }
    } else {
        throw new Error("Gebruiker niet gevonden");
    }
}

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        await addDataToDB();      
        await createInitialUser();
        console.log("Connected to DB");
        process.on("SIGINT", exit);
    } catch(e) {
        console.log(e);
    }
}
