const  mongoose = require('mongoose')
const blogModel=require('../models/blogModel')
const userModel = require('../models/userModel')

exports.getAllBlogsController =async(req,res)=>{
    try{
        const blogs=await blogModel.find({}).populate('user')
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"Not Found"
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount:blogs.length,
            message:"Blogs List",
            blogs,
        })

    }catch(error){
        console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
      error,
    });
    }
}

exports.createBlogController =async(req,res)=>{
    try{
    const {title,description,image,user}=req.body
    if(!title || !description || !image || !user){
        return res.status(400).send({
            success:false,
            message:'Provide all fields'
        })
    }
        const existingUser=await userModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'unable to find user'
            })
        }
        const newBlog=new blogModel({title,description,image,user})
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()
        await newBlog.save()
        return res.status(201).send({
            success:true,
            message:"Blog Created",
            newBlog,
        })
    
    }catch(error){
        console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error",
      error,
    });
    }
}

exports.updateBlogController =async(req,res)=>{
    try{
          const {id}=req.params
        //   from url params
          const {title,description,image}=req.body
          const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
          return res.status(200).send({
            success:true,
            message:"Blog Updated",
            blog,
          })
    }catch(error){
        console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error",
      error,
    });
    }
}

exports.getBlogByIdController =async(req,res)=>{
    try{
          const {id} =req.params
          const blog=await blogModel.findById(id)
          if(!blog){
            return res.status(404).send({
                success:false,
                message:'Not found',
            })
          }
          return res.status(200).send({
            success:true,
            message:'fetch single blog',
            blog
          })
    }catch(error){
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error",
          error,
        });
    }
}

exports.deleteBlogController =async(req,res)=>{
    try{
        const blog =await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).send({
            success:true,
            message:'Blog Deleted'
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error",
          error,
        });
    }
}

// get user blog
exports.userBlogController=async(req,res)=>{
    try{
     const userBlog=await userModel.findById(req.params.id).populate("blogs")
     if(!userBlog){
        return res.status(404).send({
            success:false,
            message:'not found'
        })
     }
     return res.status(200).send({
        success:true,
        message:"user blogs",
        userBlog,
     })
    }catch(error)
   { return res.status(400).send({
        success: false,
        message: "Error",
        error,
      });
    }
}