import { ObjectId } from "mongodb";

export const products = [
  {
    _id: new ObjectId(),
    name: "Laptop Pro 16",
    description: "High performance laptop for programming and gaming",
    price: 1500,
    stock: 10,
    discount: 10,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a01"), // Electronics
    imageUrl: "https://placehold.co/600x400?text=Laptop+Pro+16",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Smartphone X",
    description: "Smartphone with advanced camera",
    price: 800,
    stock: 25,
    discount: 5,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a01"), // Electronics
    imageUrl: "https://placehold.co/600x400?text=Smartphone+X",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Men's T-Shirt",
    description: "Comfortable cotton t-shirt for men",
    price: 25,
    stock: 100,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a02"), // Clothes
    imageUrl: "https://placehold.co/600x400?text=Mens+T-Shirt",
    createdAt: new Date()
  }, 
  {
    _id: new ObjectId(),
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with 30h battery life",
    price: 200,
    stock: 50,
    discount: 15,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a01"),
    imageUrl: "https://placehold.co/600x400?text=Headphones",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Smart Watch Series 7",
    description: "Fitness tracker with heart rate monitor and GPS",
    price: 350,
    stock: 30,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a01"),
    imageUrl: "https://placehold.co/600x400?text=Smart+Watch",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "4K Monitor 27 inch",
    description: "Ultra HD monitor for professional editing and gaming",
    price: 450,
    stock: 15,
    discount: 5,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a01"),
    imageUrl: "https://placehold.co/600x400?text=4K+Monitor",
    createdAt: new Date()
  },

  // --- Clothes (641f1f4e3b3c4b2a1f1e1a02) ---
  {
    _id: new ObjectId(),
    name: "Classic Blue Jeans",
    description: "Slim-fit denim jeans for everyday wear",
    price: 45,
    stock: 80,
    discount: 10,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a02"),
    imageUrl: "https://placehold.co/600x400?text=Blue+Jeans",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Winter Leather Jacket",
    description: "Premium synthetic leather jacket with fleece lining",
    price: 120,
    stock: 20,
    discount: 20,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a02"),
    imageUrl: "https://placehold.co/600x400?text=Leather+Jacket",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Floral Summer Dress",
    description: "Lightweight breathable dress for women",
    price: 35,
    stock: 45,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a02"),
    imageUrl: "https://placehold.co/600x400?text=Summer+Dress",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Cotton Hoodie",
    description: "Unisex oversized hoodie for casual comfort",
    price: 55,
    stock: 60,
    discount: 5,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a02"),
    imageUrl: "https://placehold.co/600x400?text=Hoodie",
    createdAt: new Date()
  },

  // --- Books (641f1f4e3b3c4b2a1f1e1a03) ---
  {
    _id: new ObjectId(),
    name: "The Mystery of Mars",
    description: "A deep dive into the red planet and space exploration",
    price: 18,
    stock: 100,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a03"),
    imageUrl: "https://placehold.co/600x400?text=Science+Book",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Cooking Masterclass",
    description: "Learn the secrets of gourmet cooking at home",
    price: 25,
    stock: 40,
    discount: 10,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a03"),
    imageUrl: "https://placehold.co/600x400?text=Cookbook",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Advanced JavaScript Guide",
    description: "Master modern JS patterns and frameworks",
    price: 40,
    stock: 55,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a03"),
    imageUrl: "https://placehold.co/600x400?text=JS+Book",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "The Great Gatsby",
    description: "Classic literature from the Jazz Age",
    price: 12,
    stock: 150,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a03"),
    imageUrl: "https://placehold.co/600x400?text=Classic+Novel",
    createdAt: new Date()
  },

  // --- Sports (641f1f4e3b3c4b2a1f1e1a04) ---
  {
    _id: new ObjectId(),
    name: "Yoga Mat Pro",
    description: "Non-slip eco-friendly yoga mat for advanced practice",
    price: 30,
    stock: 200,
    discount: 5,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a04"),
    imageUrl: "https://placehold.co/600x400?text=Yoga+Mat",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Adjustable Dumbbells",
    description: "Space-saving weights for home gym workouts",
    price: 180,
    stock: 12,
    discount: 15,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a04"),
    imageUrl: "https://placehold.co/600x400?text=Dumbbells",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Professional Football",
    description: "Match-quality football for professional training",
    price: 25,
    stock: 75,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a04"),
    imageUrl: "https://placehold.co/600x400?text=Football",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Electric Treadmill",
    description: "Foldable treadmill with heart rate monitor",
    price: 600,
    stock: 8,
    discount: 10,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a04"),
    imageUrl: "https://placehold.co/600x400?text=Treadmill",
    createdAt: new Date()
  },

  // --- Home Decor (641f1f4e3b3c4b2a1f1e1a05) ---
  {
    _id: new ObjectId(),
    name: "Modern Table Lamp",
    description: "Minimalist LED lamp with adjustable brightness",
    price: 50,
    stock: 35,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a05"),
    imageUrl: "https://placehold.co/600x400?text=Table+Lamp",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Ceramic Flower Vase",
    description: "Hand-crafted aesthetic vase for living room",
    price: 28,
    stock: 50,
    discount: 5,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a05"),
    imageUrl: "https://placehold.co/600x400?text=Vase",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Wall Clock - Wood Style",
    description: "Silent wooden wall clock for office or home",
    price: 40,
    stock: 22,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a05"),
    imageUrl: "https://placehold.co/600x400?text=Wall+Clock",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Scented Candle Set",
    description: "Set of 3 lavender and vanilla aromatherapy candles",
    price: 20,
    stock: 120,
    discount: 0,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a05"),
    imageUrl: "https://placehold.co/600x400?text=Candles",
    createdAt: new Date()
  },
  {
    _id: new ObjectId(),
    name: "Velvet Throw Pillow",
    description: "Soft decorative pillow in emerald green",
    price: 15,
    stock: 90,
    discount: 10,
    categoryId: new ObjectId("641f1f4e3b3c4b2a1f1e1a05"),
    imageUrl: "https://placehold.co/600x400?text=Pillow",
    createdAt: new Date()
  }
];
