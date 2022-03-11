const express = require("express");
const path = require("path");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");

const app = express();

mongoose.connect("mongodb+srv://fayzullo:F4995875f@cluster0.tpf56.mongodb.net/node_blog");

app.use(fileUpload());
app.use(express.static("public"))
app.use(expressEdge.engine)
app.set("views", `${__dirname}/views`)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const posts = await Post.find();
    res.render("index", {posts})
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.get("/post/:id", async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render("post", {post})
})

app.get("/posts/new", (req, res) => {
    res.render("create")
})

app.post("/posts/create", (req, res) => {
    const { image } = req.files;
    image.mv(path.resolve(__dirname, "public/posts", image.name), (err) => {
        if(err){
            console.log(err)
        }
        Post.create({...req.body, image: `/posts/${image.name}`}, (err, post) => {
            res.redirect('/')
        })
    })
})

app.listen(5000, () => {console.log("Server has been started on Port 5000...")})