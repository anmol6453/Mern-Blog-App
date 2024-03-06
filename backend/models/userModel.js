const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username']
    },
    email:{
        type:String,
        required:[true,'email']
    },
    password:{
        type:String,
        required:[true,'password']
    },
    blogs:[
        {
            type: mongoose.Types.ObjectId,
            ref:"Blog",
        },
    ],
},{
    timestamps:true
})

const userModel=mongoose.model('User',userSchema)

module.exports=userModel