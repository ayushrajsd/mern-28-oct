const express = require("express");
const productRouter = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

productRouter.get("/", getAllProducts); // /api/products/ - GET
productRouter.get("/:id", getProductById); // /api/product/1234 - GET
productRouter.post("/", createProduct); // /api/product/ - POST
productRouter.put("/:productID", updateProductById); // /api/product/1234 - PUT
productRouter.delete("/:productID", deleteProductById); // /api/product/1234 - DELETE

module.exports = productRouter;
