import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
const loginFn= async (req, res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password)return res.status(400).json({message: "Fill all required fields"})
        const user = await User.findOne({email:email})
        if(!user){return res.status(404).json({message: "User not found"})}
        const isValidPass = await bcrypt.compare(password, user.password)
        if(!isValidPass)return res.status(400).json({message: "Incorrect password"})
        return res.status(200).json({message: "User logged In", user:user})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const signupFn=async (req,res)=>{
    try {

        const {username, email, password, confirmPassword} = req.body
        if(!username || !email || !password || !confirmPassword)return res.status(400).json({message: "Fill all required fields"})
        const user = await User.findOne({email})
        if(user){return res.status(404).json({message: "User already have an account"})}
        if(password !== confirmPassword)return res.status(400).json({message: "Incorrect password"})
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser  = await User.create({
        username, email, password:hashedPassword})
        return res.status(200).json({message: "Successfully Created", user:newUser})

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export {loginFn, signupFn}