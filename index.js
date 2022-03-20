const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");


const homePageController = require("./controllers/homePage");
const getPostsController = require("./controllers/getPosts");
const postsNewController = require("./controllers/postsNew");
const createPostController = require("./controllers/createPost");
const createUserController = require('./controllers/createUser');
const storeUserController = require("./controllers/userStore");
const loginControllrer = require('./controllers/login');
const loginStoreController = require('./controllers/loginStore');
const logoutController = require("./controllers/logout");

const app = express();

const validatCreatePostMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/auth");
const redirectIfAuth = require("./middleware/redirect");

const MongoUrl = "mongodb+srv://fayzullo:F4995875f@cluster0.tpf56.mongodb.net/node_blog";

mongoose.connect(MongoUrl);

app.use(expressSession({
    secret: "samar",
    store: mongoStore.create({mongoUrl: MongoUrl})
}))

app.use(fileUpload());
app.use(express.static("public"))
app.use(expressEdge.engine)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(connectFlash());

app.set("views", `${__dirname}/views`);

app.use("*", (req, res, next) => {
    app.locals.auth = req.session.userId;
    next();
})
app.get("/", homePageController);
app.get("/post/:id", getPostsController);
app.get("/posts/new", authMiddleware, postsNewController);
app.post("/posts/create", authMiddleware, validatCreatePostMiddleware, createPostController);
app.get("/reg", redirectIfAuth, createUserController);
app.post("/auth/reg", storeUserController);
app.get("/login", redirectIfAuth, loginControllrer);
app.post("/auth/log", loginStoreController);
app.get("/logout", authMiddleware, logoutController);

app.listen(5000, () => {console.log("Server has been started on Port 5000...")})