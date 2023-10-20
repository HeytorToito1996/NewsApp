const Posts = require('../models/Post');

const getPosts = async function(req,res) {
    const posts = await Posts.find({});
    return res.status(200).json({posts});
}

const createPost = async function(req,postData,res){
    const post = await Posts.create({
        title: postData.title,
        content:postData.content,
        author:postData.author,
    });
    return res.status(201).send({message:'Postagem Publicada com Sucesso', post});
}

module.exports = {getPosts,createPost};