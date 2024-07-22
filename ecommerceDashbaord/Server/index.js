const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./db/config");
const User = require("./db/user");

const Product = require("./db/product");
const product = require("./db/product");

const jwt = require("jsonwebtoken");
const jwtKey = "e-Commerce";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  if (user) {
    jwt.sign({ result }, jwtKey, (err, token) => {
      resp.send({ result, auth: token });
    });
  } else {
    resp.send("No User Found!!");
  }
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "2hr" }, (err, token) => {
        resp.send({ user, auth: token });
      });
    } else {
      resp.send("No User Found!!");
    }
  } else {
    resp.send("No user found");
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send("No prdouct forunbd ");
  }
});

app.delete("/product/:id", async (req, resp) => {
  const result = await product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  const result = await product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send("Result not Found");
  }
});

app.put("/product/:id", async (req, resp) => {
  let result = await product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

app.listen(5000);
