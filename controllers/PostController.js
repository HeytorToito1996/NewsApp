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

const updatePost = async function (req,postData,res) {
    const updatedPost = await Posts.findByIdAndUpdate(postData.postId,{
        title: postData.title,
        text: postData.text,
        picture: postData.picture,
        author: postData.author,
        postedAt: postData.postedAt
    });

    if(!updatedPost){
        return res.status(404).send({message: 'Postagem não encontrada'});
    }
    return res.status(201).send({message:'Postagem Atualizada com Sucesso'});
}

const deletePost = async function (postId,res) {
    const deletedPost = await Posts.findOneAndDelete({_id:postId})
    if(!deletedPost){
        console.log('Postagem não encontrada');
        return res.status(404).send({message: 'Postagem não encontrada'});
    }
    console.log('Postagem Excluída com Sucesso');
    return res.status(204).send({message:'Postagem excluída com Sucesso'});
}

module.exports = {getPosts,getPost,createPost,updatePost,deletePost};