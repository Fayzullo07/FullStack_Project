const express = require("express");
const path = require("path")
const app = express();
const expressEdge = require("express-edge");

app.use(express.static("public"))
app.use(expressEdge.engine)
app.set("views", `${__dirname}/views`)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.sendFile(path.resolve(__dirname, "pages", "about.html"))
})

app.get("/contact", (req, res) => {
    res.sendFile(path.resolve(__dirname, "pages", "contact.html"))
})

app.get("/post", (req, res) => {
    res.sendFile(path.resolve(__dirname, "pages", "post.html"))
})

app.listen(5000, () => {console.log("Server has been started on Port 5000...")})