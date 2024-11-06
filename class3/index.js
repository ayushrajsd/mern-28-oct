const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbURL =
  "mongodb+srv://ayushrajsd:X19RgdyckQt9EeRa@cluster0.fke58.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// app.use(express.static("public"));

// const loggerMiddleware = (req, res, next) => {
//   console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
//   next(); // telling express to proceed to another middleware or route handler
// };

// // app.use(loggerMiddleware);

// app.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });

// app.get("/data", (req, res) => {
//   console.log("This is data page");
//   res.send("This is data page");
// });

// app.get("/special", loggerMiddleware, (req, res) => {
//   res.send("this route is special");
// });

// app.get("/search", (req, res) => {
//   const queryParams = req.query;
//   const { name, filter } = queryParams; // destructuring the object

//   res.send("your parameters are " + JSON.stringify(queryParams));
// });

/**
 * 404 pages - if someones enters a random url
 * if the request does not match any of the routes, return a 404 status and a message
 *
 * Solution approach
 * a. app.use() - a middleware that will be executed for all the requests
 * b. if no route match is found then return a 404
 */
// app.use((req, res, next) => {
//   res.status(404).send("Page not found");
// });

mongoose
  .connect(dbURL)
  .then(function (connection) {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.log("Error connecting to MongoDB");
  });

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    isInStock: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);

app.use(express.json());

// create a product

app.post("/api/product", async (req, res) => {
  const body = req.body;
  const product = await ProductModel.create({
    // Insert into products (col definition) values (body)
    product_name: body.product_name,
    product_price: body.product_price,
    isInStock: body.isInStock,
    category: body.category,
  });
  console.log(product);
  return res.status(201).json({ message: "Prouct created", product: product });
});

// get all products
app.get("/api/products", async (req, res) => {
  const products = await ProductModel.find();
  return res.json(products);
});

// find a prodyuct by id
app.get("/api/product/:id", async (req, res) => {
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
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
