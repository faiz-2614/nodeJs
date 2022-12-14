const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/shop/product-list",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  //const products = Product.fetchAll((products)=>{
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};
exports.getOrders = (req, res, next) => {
  //const products = Product.fetchAll((products)=>{
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};
exports.getCheckout = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/checkout", {
      pageTitle: "Checkout",
      path: "/checkout",
    });
  });
};
