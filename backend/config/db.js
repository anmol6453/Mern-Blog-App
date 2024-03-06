const mongoose=require('mongoose')

const connectDB= async ()=>{
  try{
  await mongoose.connect( process.env.MONGO_URL)
  }catch(error){
    console.log(`Mongo Connect Error`)
  }
}

module.exports=connectDB