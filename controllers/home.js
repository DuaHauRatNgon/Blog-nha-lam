const BlogPost = require('../models/BlogPost.js')

module.exports = (req, res) => {
    BlogPost.find({}, function (error, blogspot) {
        // console.log(blogspot);
        res.render('index', {
            blogposts: blogspot
        });
    })
}
