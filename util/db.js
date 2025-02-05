const mongoose = require("mongoose")

URI = process.env.MONGODB_URI

const connectDB = async() =>{
    try{
        await mongoose.connect(URI)
        console.log("Connection Successfull")

    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB