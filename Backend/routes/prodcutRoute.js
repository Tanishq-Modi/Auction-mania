const express = require("express");
const { createProduct,getAllProducts,deleteProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleWare");
const { isSeller } = require("../middleware/authMiddleWare");
const { upload } = require("../utils/fileUpload");
const router = express.Router();


router.post("/",protect,isSeller,upload.single("image"), createProduct);
router.get("/",getAllProducts);
router.delete("/:id",protect,isSeller,deleteProduct);

module.exports = router; 
