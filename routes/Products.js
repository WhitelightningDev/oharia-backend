const express = require("express");
const multer = require("multer");
const ProductController = require("../controllers/ProductController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use timestamp to avoid filename conflicts
  }
});

const upload = multer({ storage }); // Initialize multer with the storage configuration

// Create a new product (protected route, only admin can create)
router.post("/", protect, upload.single("image"), ProductController.createProduct);

// Get all products (with optional category filter)
router.get("/", ProductController.getAllProducts);

// Get a single product by ID
router.get("/:id", ProductController.getProductById);

// Update a product by ID (protected route)
router.put("/:id", protect, upload.single("image"), ProductController.updateProduct);

// Delete a product by ID (protected route)
router.delete("/:id", protect, ProductController.deleteProduct);

module.exports = router;
