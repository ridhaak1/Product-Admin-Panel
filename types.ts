import { ObjectId } from "mongodb";

export interface Product {
    _id?: ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount: number;
    categoryId: ObjectId;          
    imageUrl?: string;           
    isDeleted?: boolean;         
    createdAt?: Date;
}

export interface Category {
    _id?: ObjectId;
    name: string;
    slug: string;
    description: string;
    imageUrl?: string;          }


export interface User {
  email: string;
  password?: string;
  role: string;
}

export interface FlashMessage {
    type: "error" | "success"
    message: string;
}