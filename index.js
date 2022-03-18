const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");


const homePageController = require("./controllers/homePage");
const getPostsController = require("./controllers/getPosts");
const postsNewController = require("./controllers/postsNew");
const createPostController = require("./controllers/createPost");
const createUserController = require('./controllers/createUser');
const storeUserController = require("./controllers/userStore")

const validatCreatePostMiddleware = require("./middleware/validationMiddleware");
const app = express();

mongoose.connect("mongodb+srv://fayzullo:F4995875f@cluster0.tpf56.mongodb.net/node_blog");

app.use(fileUpload());
app.use(express.static("public"))
app.use(expressEdge.engine)
app.set("views", `${__dirname}/views`)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", homePageController);
app.get("/post/:id", getPostsController);
app.get("/posts/new", postsNewController);
app.post("/posts/create", validatCreatePostMiddleware, createPostController);
app.get("/reg", createUserController);
app.post("/auth/reg", storeUserController);

app.listen(5000, () => {console.log("Server has been started on Port 5000...")})