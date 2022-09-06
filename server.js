/// DEPENDENCIES //
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/products")
const productSeed = require("./models/productSeed");

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

// ROUTES //

// SEED //
app.get("/products/seed", (req, res) => {
    Product.create(productSeed, (error, data) => {
        res.redirect("/products");
    })
})

// INDEX //
app.get("/products", (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts,
        })
    })
})

// NEW //
app.get("/products/new", (req, res) => {
    res.render("new.ejs");
})

// DELETE //

// UPDATE //

// CREATE //


// EDIT //

// SHOW //

// Listener //
app.listen(port, () => {
    console.log("server is listening on port", port);
})