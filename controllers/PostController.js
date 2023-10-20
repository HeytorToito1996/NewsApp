const Posts = require('../models/Post');

const getPosts = async function(req,res) {
    const posts = await Posts.find({});
    return res.status(200).json({posts});
}

const getPost = async function(req, postId,res) {
    const post = await Posts.findById(postId);
    return res.status(200).json({post});
}

const createPost = async function(req,postData,res){
    const post = await Posts.create({
        title: postData.title,
        text:postData.text,
        picture: postData.picture,
        author:postData.author,
        postedAt:postData.postedAt
    });
    return res.status(201).send({message:'Postagem Publicada com Sucesso', post});
}

module.exports = {getPosts,getPost,createPost};