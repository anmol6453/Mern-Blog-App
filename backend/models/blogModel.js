const mongoose=require('mongoose')
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,'Title']
    },
    description:{
        type:String,
        required:[true,'Description']
    },
    image:{
        type:String,
        required:[true,'Image']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:[true,'user id']
    }

},{timestamps:true})

const blogModel=mongoose.model('Blog',blogSchema)
module.exports=blogModel