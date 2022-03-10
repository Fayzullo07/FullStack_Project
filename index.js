const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(5001, () => {console.log("Server has been started on Port 5001...")})