const asyncHandler = require("express-async-handler");
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => { 
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, Please Login");
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id).select("-password");
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, Please Login");
    }
});

const isAdmin = (req,res,next)=>{
    if(req.user && req.user.role ==="admin"){
        next();
    }
    else{
        res.status(403);
        throw new Error("Acess Denied, You are not an administrator");
    }
}

const isSeller = (req,res,next)=>{
    if(req.user && req.user.role ==="seller"|| req.user.role ==="admin"){
        next();
    }
    else{
        res.status(403);
        throw new Error("Acess Denied, You are not an seller");
    }
}

module.exports = { protect, isAdmin, isSeller };
