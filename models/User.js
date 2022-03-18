const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre("save", function(next){
    const user = this;
    bcrypt.hash("user.password", 10, function(err, encrypted){
        user.password = encrypted;
        next();
    })
})

const User = mongoose.model("User", UserSchema);
module.exports = User;