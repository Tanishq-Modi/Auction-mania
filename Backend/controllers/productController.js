const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, height, lengthpic, width, mediumused, weigth } = req.body;
    const userId = req.user.id;
  
    const originalSlug = slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
    });
  
    let slug = originalSlug;
    let suffix = 1;
  
    while (await Product.findOne({ slug })) {
      slug = `${originalSlug}-${suffix}`;
      suffix++;
    }
  
    if (!title || !description || !price) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }
  
    let fileData = {};
    if (req.file) {
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Bidding/Product",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }
  
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        public_id: uploadedFile.public_id,
      };
    }
  
    const product = await Product.create({
      user: userId,
      title,
      slug: slug,
      description,
      price,
      category,
      height,
      lengthpic,
      width,
      mediumused,
      weigth,
      image: fileData,
    });
    res.status(201).json({
      success: true,
      data: product,
    });
  });

  const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort("-createdAt").populate("user");
  
    // const productsWithDetails = await Promise.all(
    //   products.map(async (product) => {
    //     const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
    //     const biddingPrice = latestBid ? latestBid.price : product.price;
  
    //     const totalBids = await BiddingProduct.countDocuments({ product: product._id });
  
    //     return {
    //       ...product._doc,
    //       biddingPrice,
    //       totalBids, // Adding the total number of bids
    //     };
    //   })
    // );
  
    res.status(200).json(products);
  });

  const deleteProduct = asyncHandler(async (req, res) => {
        const { id }= req.params;
        const product = await Product.findById(id);

        if(!product){
            res.status(400);
            throw new Error("Product not found");
        }
        if(product.user?.toString()!==req.user.id){
            res.status(401);
            throw new Error("User not authorized");
        }
        if(product.image && product.image.public_id){
            try{
                await cloudinary.uploader.destroy(product.image.public_id);
            }
            catch(error){
                console.log(error);
                res.status(500);
                throw new Error("Error deleting image from cloudinary");
            }
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({message:"product deleted successfuly"});
  });

  const updateProduct = asyncHandler(async (req, res) => {
    const { title, description, price, height, lengthpic, width, mediumused, weigth } = req.body;
    const { id } = req.params;
    const product = await Product.findById(id);
  
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
  
    let fileData = {};
    if (req.file) {
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Product-Images",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Image colud not be uploaded");
      }
  
      if (product.image && product.image.public_id) {
        try {
          await cloudinary.uploader.destroy(product.image.public_id);
        } catch (error) {
          console.error("Error deleting previous image from Cloudinary:", error);
        }
      }
      //step 1 :
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        public_id: uploadedFile.public_id,
      };
    }
  
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        price,
        height,
        lengthpic,
        width,
        mediumused,
        weigth,
        image: Object.keys(fileData).length === 0 ? Product?.image : fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedProduct);
  });

  const getAllProductsofUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const products = await Product.find({ user: userId }).sort("-createdAt").populate("user");
  
    // const productsWithPrices = await Promise.all(
    //   products.map(async (product) => {
    //     const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
    //     const biddingPrice = latestBid ? latestBid.price : product.price;
    //     return {
    //       ...product._doc,
    //       biddingPrice, // Adding the price field
    //     };
    //   })
    // );
  
    res.status(200).json(products);  //productsWithPrices
  });

  const getAllSoldProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({ isSoldout: true }).sort("-createdAt").populate("user");
    res.status(200).json(product);
  });
  const getProductBySlug = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  });

  const getWonProducts = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const wonProducts = await Product.find({ soldTo: userId }).sort("-createdAt").populate("user");
  
    const productsWithPrices = await Promise.all(
      wonProducts.map(async (product) => {
        const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
        const biddingPrice = latestBid ? latestBid.price : product.price;
        return {
          ...product._doc,
          biddingPrice, // Adding the price field
        };
      })
    );
  
    res.status(200).json(productsWithPrices);
  });

  // for admin only users
const verifyAndAddCommissionProductByAdmin = asyncHandler(async (req, res) => {
    const { commission } = req.body;
    const { id } = req.params;
  
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
  
    product.isverify = true;
    product.commission = commission;
  
    await product.save();
  
    res.status(200).json({ message: "Product verified successfully", data: product });
  });

  const getAllProductsByAmdin = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort("-createdAt").populate("user");
  
    // const productsWithPrices = await Promise.all(
    //   products.map(async (product) => {
    //     const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
    //     const biddingPrice = latestBid ? latestBid.price : product.price;
    //     return {
    //       ...product._doc,
    //       biddingPrice, // Adding the price field
    //     };
    //   })
    // );
  
    res.status(200).json(products);
  });


  // dot not it
const deleteProductsByAmdin = asyncHandler(async (req, res) => {
    try {
      const { productIds } = req.body;
  
      const result = await Product.findOneAndDelete({ _id: productIds });
  
      res.status(200).json({ message: `${result.deletedCount} products deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getAllProductsofUser,
  verifyAndAddCommissionProductByAdmin,
  getAllProductsByAmdin,
  deleteProductsByAmdin,
  getAllSoldProducts,
  getWonProducts,
  getProductBySlug,
};
