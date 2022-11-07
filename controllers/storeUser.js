const User = require('../models/User.js');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            // return res.redirect('/auth/register')
            return res.send("Tai khoan da co nguoi dang ky. Vui long tao tai khoan khac :((");
        }
        res.redirect('/')
    })
}