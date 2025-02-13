const express = require("express");
const { registerUser, logiUser, loginStatus,logoutuser, loginAsSeller, getUser} = require("../controllers/userCtr");
const { protect }= require("../middleware/authMiddleWare");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logiUser); 
router.get("/loggedin", loginStatus); 
router.get("/logout", logoutuser); 
router.post("/seller", loginAsSeller); 
router.get("/getuser", protect, getUser); 

module.exports = router;
