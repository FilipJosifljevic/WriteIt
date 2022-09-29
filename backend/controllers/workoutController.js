const { json } = require("express")
const Post = require("../models/PostModel")
const mongoose = require("mongoose")

const getPosts = async (req,res) => {
    const posts = await Post.find({}).sort({createdAt: -1})
    res.status(200).json(posts)
}

const getPost = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Post not found"})
    }
    const post = await Post.findById(id)
    
    if(!post) {
        return res.status(404).json({error:"Post not found"})
    }
    res.status(200).json(post)
}

const createPost = async (req,res) => {
    const {title, text, author} = req.body
    
    try {
        const post = await Post.create({
            title,text,author
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deletePost = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Post not found"})
    }
    
    const post = await Post.findOneAndDelete({_id: id})
    if(!post) {
        return res.status(404).json({error:"Post not found"})
    }
    res.status(200).json(post)
}

const updatePost = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Post not found"})
    }

    const post = await Post.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!post) {
        return res.status(404).json({error:"Post not found"})
    }
    res.status(200).json(post)
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}