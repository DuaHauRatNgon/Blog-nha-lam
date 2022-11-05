const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js')

const app = express();
const port = 3005;
const path = require('path')

app.use(express.static('public'));

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true })
mongoose.connect('mongodb://localhost/test_my_database', {
    useNewUrlParser: true
});

const fileUpload = require('express-fileupload')
app.use(fileUpload())

//mac dinh
// app.get('/', (request, response) => {
//     //     response.sendFile(path.resolve(__dirname, 'pages/index.html'));
//     response.render('index')
// })

//hien bai post ra trang chu
app.get('/', (request, response) => {
    BlogPost.find({}, function (error, blogspot) {
        // console.log(blogspot);
        response.render('index', {
            blogposts: blogspot
        });
    })
})

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
})

// app.get('/post', (req, res) => {
//     res.render('post')
// })

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

//c1 chua them tinh nang upload anh
// app.post('/posts/store', (req, res) => {
//     // model creates a new doc with browser data
//     // console.log(req.body);
// BlogPost.create(req.body, (error, blogpost) => {
//     res.redirect('/')
// })
// })

//c2 da them tinh nang upload anh
app.post('/posts/store', (req, res) => {
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
})

app.get('/post/:id', (req, res) => {
    BlogPost.findById(req.params.id, function (error, detailPost) {
        res.render('post', { detailPost })
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})