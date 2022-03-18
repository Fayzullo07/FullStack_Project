const User = require("../models/User");

module.exports = (req, res) => {
    User.create(req.body, (err, user) => {
        if(err){
            return res.redirect('/reg')
        }
        res.redirect("/")
    })
}