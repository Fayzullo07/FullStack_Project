const mongoose = require("mongoose");
const Post = require("./models/Post");

mongoose.connect("mongodb+srv://fayzullo:F4995875f@cluster0.tpf56.mongodb.net/node_blog_test");

// Post.find({title: "My first blog"}, (err, post) => console.log(post));

// Post.findByIdAndUpdate("622b519559f213d1426650cc", {
//     tite: "Update"
// }, (err, post) => console.log(post))

Post.findById("622b519559f213d1426650cc", (err, post) => console.log(post));

// Post.create({
//     title: "My second blog",
//     description: "My second description",
//     content: "Lorem ipsum second content"
// }, (err, post) => {console.log(err, post)})
