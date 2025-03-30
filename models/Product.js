const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL or file path
  category: { type: String, enum: ["Vitality", "Essence", "Canna"], required: true },
  stock: { type: Number, default: 0 }, // Optional: Track inventory
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
