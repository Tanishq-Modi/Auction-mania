const express = require("express");
const { createProduct,getAllProducts,deleteProduct, updateProduct,getAllProductsofUser,verifyAndAddCommissionProductByAdmin,getAllProductsByAmdin,deleteProductsByAmdin,getAllSoldProducts,getProductBySlug,
    getWonProducts, } = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/authMiddleWare");
const { isSeller } = require("../middleware/authMiddleWare");
const { upload } = require("../utils/fileUpload");
const router = express.Router();


router.post("/",protect,isSeller,upload.single("image"), createProduct);
router.delete("/:id",protect,isSeller,deleteProduct);
router.put("/:id",protect,isSeller,upload.single("image"), updateProduct);

router.get("/",getAllProducts);
router.get("/won-products", protect, getWonProducts);
router.get("/user",protect, getAllProductsofUser );
router.get("/sold", getAllSoldProducts);
router.get("/:id", getProductBySlug);

// Only access for admin users
router.patch("/admin/product-verified/:id", protect, isAdmin, verifyAndAddCommissionProductByAdmin);
router.get("/admin/products", protect, isAdmin, getAllProductsByAmdin);
router.delete("/admin/products", protect, isAdmin, deleteProductsByAmdin);

module.exports = router; 
