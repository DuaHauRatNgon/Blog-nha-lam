const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/test_my_database', {
    useNewUrlParser: true
});

BlogPost.create(
    {
        title: 'Câu chuyên ngày tận thế',
        body: 'Sẽ ra sao nếu 1 ngày loài người biến mất'
    },
    (error, blogpost) => {
        console.log(error, blogpost)
    })

// BlogPost.find({}, (error, blogspot) => {
//     console.log(error, blogspot)
//    })

// var id = "6363168d9c7a62b090ab49e1";
// BlogPost.findByIdAndUpdate(id, {
//     title: 'Updated title'
// }, (error, blogspot) => {
//     console.log(error, blogspot)
// })

