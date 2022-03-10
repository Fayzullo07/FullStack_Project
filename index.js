const express = require("express");
const path = require("path");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://fayzullo:F4995875f@cluster0.tpf56.mongodb.net/node_blog", () => {
    console.log("Database created successfully!")
})

app.use(express.static("public"))
app.use(expressEdge.engine)
app.set("views", `${__dirname}/views`)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.get("/post", (req, res) => {
    res.render("post")
})

app.listen(5000, () => {console.log("Server has been started on Port 5000...")})