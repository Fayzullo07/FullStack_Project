const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const {password, email} = req.body;
    User.findOne({email}, (err, user) => {
        console.log(user)
        if(user){
            bcrypt.compare(password, user.password, (err, same) => {
                if(same){
                    res.redirect("/")
                }else{
                    res.redirect('/login')
                }
            })
        }else{
            res.redirect("/login")
        }
    })
    res.redirect('/');
}