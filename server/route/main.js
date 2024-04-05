const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/*
GET
Home
*/
router.get('', async (req,res) => {
    try{
        const locals = {
        title : "NodeJs Blog",
        description : "This is a sample application on nodeJS"
        }

        let perPage = 2;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ {$sort: {createdAt: -1 }}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count/ perPage);
        
        res.render('index' , {
            locals, 
            data,
            current: page,
            nextPage: hasNextPage? nextPage : null
        });

    }catch (error) {
        console.log(error);
    }
});


/*
GET
post :id
*/

router.get('/post/:id',async(req,res) => {
    try{
     
        let slug = req.params.id;
        
        const data = await Post.findById({_id: slug});
        
        const locals = {
            title: data.title,
            description: "NodeJs"
        }
        res.render('post',{locals,data});
    }catch (error) {
        console.log(error);
    }
});

router.post('/search', async (req,res) => {
    try {
        const locals = {
            title: "Search",
            description : "Simple Blog"
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        
        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i' )}},
                { body:  { $regex: new RegExp(searchNoSpecialChar, 'i' )}}
            ]

        })
        res.render("search", {
            data,
            locals
        });
    }catch (error) {
        console.log(error);
    }

});

router.get('/about', (req,res) => {
    res.render('about');
})

module.exports = router;


// function insertPostData(){
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body: "Building blog web with nodeJs"
//         },
//     ])
// }

// insertPostData();

 