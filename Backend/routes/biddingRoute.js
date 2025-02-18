const express = require("express");
 const {  getBiddingHistory,placeBid,sellProduct } = require("../controllers/biddingCtr");
const { protect, isSeller } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/:productId", getBiddingHistory);
router.post("/sell", protect, isSeller, sellProduct);
router.post("/", protect, placeBid);

module.exports = router;