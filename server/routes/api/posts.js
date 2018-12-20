const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
//GET POSTS
router.get('/', async(req,res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});


//ADD POST
router.post('/', async(req, res)=>{
    const post=await loadPostsCollection();
    await post.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();

})


//DELETE POSTS
router.delete('/:id',async(req, res)=>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect('mongodb://test123:epolag12@ds055495.mlab.com:55495/vue_express',{
        useNewUrlParser:true
    });
    //await makes JavaScript wait until that promise settles and returns its result.
    return client.db('vue_express').collection('posts');
}

module.exports = router;