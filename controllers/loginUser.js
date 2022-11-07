const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                    // store user session, will talk about it later
                    res.redirect('/')
                } else {
                    console.log(password);
                    console.log(user.password);
                    // res.redirect('/auth/login');
                    res.send("Ten nguoi dung hoac Mat khau k chinh xac !");
                }
            })
        } else {
            res.redirect('/auth/login')
        }
    })
}