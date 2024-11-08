const ProductModel = require("../models/product");

const getAllProducts = async (req, res) => {
  const products = await ProductModel.find();
  return res.json(products);
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// create a product
const createProduct = async (req, res) => {
  const body = req.body;
  try {
    const product = await ProductModel.create({
      // Insert into products (col definition) values (body)
      product_name: body.product_name,
      product_price: body.product_price,
      isInStock: body.isInStock,
      category: body.category,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });
    console.log(product);
    return res
      .status(201)
      .json({ message: "Prouct created", product: product });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const updateProductById = async (req, res) => {
  const productId = req.params.productID;
  await ProductModel.findByIdAndUpdate(productId, req.body);
  return res.status(201).json({ message: "Product updated" });
};

const deleteProductById = async (req, res) => {
  const productId = req.params.productID;
  await ProductModel.findByIdAndDelete(productId);
  return res.status(200).json({ message: "Product deleted" });
};

module.export = {
  getAllProducts,
};
