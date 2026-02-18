import { ObjectId } from "mongodb";

export const categories = [
  {
    _id: new ObjectId("641f1f4e3b3c4b2a1f1e1a01"),
    name: "Electronics",
    slug: "electronics",
    description: "Various electronic devices like laptops, phones, and smart gadgets",
    imageUrl: "https://placehold.co/600x400?text=Electronics"
  },
  {
    _id: new ObjectId("641f1f4e3b3c4b2a1f1e1a02"),
    name: "Clothes",
    slug: "clothes",
    description: "Men's and women's clothing for all occasions",
    imageUrl: "https://placehold.co/600x400?text=Clothes"
  },
  {
    _id: new ObjectId("641f1f4e3b3c4b2a1f1e1a03"),
    name: "Books",
    slug: "books",
    description: "A wide collection of literary and educational books",
    imageUrl: "https://placehold.co/600x400?text=Books"
  },
  {
    _id: new ObjectId("641f1f4e3b3c4b2a1f1e1a04"),
    name: "Sports",
    slug: "sports",
    description: "Sports equipment and gear for all activities",
    imageUrl: "https://placehold.co/600x400?text=Sports"
  },
  {
    _id: new ObjectId("641f1f4e3b3c4b2a1f1e1a05"),
    name: "Home Decor",
    slug: "home-decor",
    description: "Modern decorative items for your home",
    imageUrl: "https://placehold.co/600x400?text=Home+Decor"
  }
];
