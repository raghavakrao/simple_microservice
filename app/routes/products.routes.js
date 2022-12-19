module.exports = app => {
  const products = require("../controllers/product.controller.js");

  let router = require("express").Router();

  // Create a new Product
  router.post("/", products.create);

  // Retrieve a single Product with name
  router.get("/:name", products.findOne);

  // Delete a Product with name
  router.delete("/:name", products.delete);

  app.use('/api/products', router);
};
