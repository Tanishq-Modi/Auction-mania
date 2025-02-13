const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"],
    },
    email: {
        type: String,
        require: [true, "Please add a email"],
    },
    password: {
        type: String,
        require: [true, "Please add your password"],
    },
    photo: {
        type: String,
        require: [true, "Please add your avatar"],
        default:"",
    },
    role:{
        type: String,
        enum:["admin","seller","buyer"],
        default: "buyer",
    },
    commissionBalance:{
        type: Number,
        default:0,
    },
    balance:{
        type: Number,
        default: 0,
    },
 },
    {timeStamp: true}
);


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();
});

const User = mongoose.model("User",userSchema);
module.exports=User;