const mongoose = require("mongoose");

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
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function () {
          return this.password === this.confirmPassword;
        },
        message: "Password and confirm password do not match",
      },
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
