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

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
};
