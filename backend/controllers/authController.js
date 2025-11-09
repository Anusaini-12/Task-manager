import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';


//REGISTER USER
export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name , email, password} = req.body;

    //check all fields
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields!");
    }

    //if User EXISTS 
    const userExits = await User.findOne({email});
    if(userExits) {
        res.status(400);
        throw new Error("User Already Exists!");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword,
    });

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } 
    else {
        res.status(400);
        throw new Error("Invalid User Data!");
    }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } 
    else {
        res.status(400);
        throw new Error("Invalid Credentials!");
    }
    res.json({message: "Login User"});
});

//Get Me
export const getMe = expressAsyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name, 
        email,
    });
});

//JWT token Helper
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}