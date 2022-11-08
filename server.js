const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newRegister = require("./controllers/register");
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser')

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

app.get('/', homeController)

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
})

// app.get('/contact', (req, res) => {
//     res.render('contact')
// })

app.get('/posts/new',newPostController);

app.post('/posts/store',app.post('/posts/store', storePostController));

app.get('/post/:id', getPostController);

app.get('/auth/register', newRegister);

app.post('/users/register', storeUserController);

app.get('/auth/login', loginController);

app.post('/users/login',loginUserController);

app.use((req, res) => res.render('notfound'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})