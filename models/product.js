const products = [];

const fs = require("fs");
const path = require("path");

const getProductsFromFile = (callback) => {
  const p = path.join(
    path.dirname(require.main.filename),
    "data",
    "products.json"
  );
  fs.readFile(p, (err, content) => {
    if (err) {
      return callback([]);
    }
    return callback(JSON.parse(content));
  });
};



module.exports = class Product {
  constructor(title,imageUrl,description,price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
