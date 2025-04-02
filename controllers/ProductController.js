const Product = require("../models/Product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    // Check if image is present
    const image = req.file ? req.file.path : ''; // This should work, but ensure you're receiving the file

    // Destructure the other fields
    const { name, shortdescription, description, price, category, stock } = req.body;

    // Create the product object
    const product = new Product({
      name,
      shortdescription,
      description,
      price,
      category,
      stock,
      image, // Save the image path if available
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get all products or filter by category
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    // Destructure the updated product details from req.body
    const { name, shortdescription, description, price, category, stock } = req.body;

    // Get the image path from req.file (if an image is uploaded)
    const image = req.file ? req.file.path : '';

    // Find the product by ID and update it
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Update the product fields
    product.name = name || product.name;
    product.shortdescription = shortdescription || product.shortdescription;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    // If a new image is uploaded, update the image field
    if (image) {
      product.image = image;
    }

    // Save the updated product
    await product.save();

    // Send the updated product as a response
    res.json(product);
  } catch (err) {
    // If there's an error, send a 400 response with the error message
    res.status(400).json({ error: err.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export all the methods for use in the routes
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
