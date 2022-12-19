const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.price) {
    res.status(400).send({
      message: "Name/Price can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = {
    name: req.body.name,
    price: req.body.price
  };

  // Save Product in the database
  Products.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const name = req.params.name;

  Products.findByPk(name)
    .then(data => {
      if (data) {
        Products.increment({ viewCount : +1 }, { where: { name: name }})
        .then(data => {
          res.send(data);
        });
      } else {
        res.status(404).send({
          message: `Cannot find Product with name=${name}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Product with name=${name}`
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const name = req.params.name;

  Products.destroy({
    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with name=${name}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Product with name=${name}`
      });
    });
};

// find all most viewed products
exports.findMostViewed = (req, res) => {
  Products.findAll({ where: { viewCount: {
    $gt : 5
  }} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};
