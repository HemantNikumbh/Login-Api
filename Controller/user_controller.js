const User = require("../model/user_model")
const bcrypt = require("bcryptjs")

const login = async(req,res) =>{
    try{
        const{email,password} = req.body
        const UserExist = await User.findOne({email})
        if(!UserExist){
            return res.status(200).json({message:"Invalid Credential"})
        }

        const user = await bcrypt.compare(password,UserExist.password)

        if(user){
            res.status(200).json({
                msg:UserExist,
                token: await UserExist.generateToken(),
                userId:UserExist._id.toString(),
            });
        }
        else{
            res.status(401).json({message:"Invalid email and password"})
        }

    }catch(error){
        console.log(error)
    }

}

module.exports = login