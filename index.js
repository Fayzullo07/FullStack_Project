const express = require("express");
const path = require("path");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post")

const app = express();

mongoose.connect("mongodb+srv://fayzullo:F4995875f@cluster0.tpf56.mongodb.net/node_blog");

app.use(express.static("public"))
app.use(expressEdge.engine)
app.set("views", `${__dirname}/views`)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.get("/posts/new", (req, res) => {
    res.render("create")
})

app.post("/posts/create", (req, res) => {
    Post.create(req.body, (err, post) => {
        res.redirect('/')
    })
})

app.listen(5000, () => {console.log("Server has been started on Port 5000...")})