const express = require("express");
const { options } = require("pg/lib/defaults");
const {getAllFeatures, getAllItems} = require("../database-helpers");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    getAllFeatures(db)
      .then((images) => {
        const username = req.session.username
        res.render("homepage", {images, username});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/all-items", (req, res) => {
    getAllItems(db, req.url)
      .then((products) => {
        const username = req.session.username
        res.render("shop", {products, username});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/all-items/filtered", (req, res) => {
    const options = req.body
    getAllItems(db, options)
      .then((products) => {
        const username = req.session.username
        res.render("shop", {products, username});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.get("/favourites", (req, res) => {
    const username = req.session.username
    // need user id here 
    res.render("favourites", {username});
  });

  router.post("/favourites/:id", (req, res) => {
    console.log("URL of favourites URL", req.params.id)

    console.log("Username", req.session.username)

    console.log("User ID", req.session.userId)
    // this route will render the favourites page with the favourited items of the specific user
    res.end()
  });

  router.get("/myshop", (req, res) => {
    const username = req.session.username
    res.render("myshop", {username});
  });

  return router;
};
