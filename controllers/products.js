const express = require("express");
const productRouter = express.Router();
const Product = require("../models/products")

// ROUTES //

// SEED //
// const productSeed = require("../models/productSeed");
// productRouter.get("/products/seed", (req, res) => {
//     Product.create(productSeed, (error, data) => {
//         res.redirect("/products");
//     })
// })

// INDEX //
productRouter.get("/", (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts,
        })
    })
})

// NEW //
productRouter.get("/new", (req, res) => {
    res.render("new.ejs");
})

// DELETE //
productRouter.delete("/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect("/products")
    })
})

// UPDATE //
productRouter.put("/:id", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {
            new:true,
        },
        (error, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`)
    })
})

// CREATE //
productRouter.post("/", (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect("/products")
    })
})

// EDIT //
productRouter.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render("edit.ejs", {
            product: foundProduct,
        })
    })
})

// SHOW //
productRouter.get("/:id", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render("show.ejs", {
            product: foundProduct,
        })
    })
})


module.exports = productRouter;