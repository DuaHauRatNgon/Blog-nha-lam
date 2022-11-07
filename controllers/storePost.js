const BlogPost = require('../models/BlogPost.js')

const path = require('path')
module.exports =  (req, res) => {
    if (req.files != null) {
        let image = req.files.image;
        image.mv(path.resolve(__dirname, 'public/upload', image.name), function (err) {
            BlogPost.create({
                ...req.body,
                image: '/upload/' + image.name
            }, function (err) {
                res.redirect('/')
            })
        })
    }
    else {
        BlogPost.create(req.body, (error, blogpost) => {
            res.redirect('/')
        })
    }
}