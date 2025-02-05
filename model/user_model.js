const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }

})

userSchema.pre("save",async function(next){
    const user = this
    if(!user.isModified("password")){
        next()
    }
    try{
        const setround = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password,setround)
        user.password = hash_password
    }catch(error){
        console.log(error)
    }
})

userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.KEY,{
            expiresIn:"30d",
        }
    )

    }catch(error){
        console.log(error)
    }
}

const User = new mongoose.model("User",userSchema)

module.exports = User