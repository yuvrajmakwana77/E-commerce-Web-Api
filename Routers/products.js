const express = require('express');
const router = express.Router();
const {Product} = require('../Models/products');
const {Category} = require('../Models/category');
const mongoose = require('mongoose');

router.get(`/`,async (req , res) => {
// test data to test get to postman
// const products = {
//     id : 1,
//     name : "hair_dresser",
//     Image : 'some_url'
// }
// res.send(products);
    let filter = {};
    if(req.query.categories)
        {
            filter = {category: req.query.categories.split(',')}
        }
    const productList = await Product.find(filter).select('-_image -_name').populate('category');
    if(!productList){
        res.status(500).json({success:false});
    }
    res.send(productList);
});

router.get(`/:id`,async (req , res) => {
        const product = await Product.findById(req.params.id).populate('category');
        if(!product){
            res.status(500).json({success:false});
        }
        res.send(product);
    });

router.post(`/`, async(req , res) => {
    const category = await Category.findById(req.body.category);
    if(!category)
        return res.status(400).send('Invalid category');
    const product = new Product({
        name :req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock :req.body.countInStock,
        rating:req.body.rating,
        numReview:req.body.numReview,
        isFeatured:req.body.isFeatured
    });

    // product = await product.save();
    //     if(!product)
    //         return res.status(500).send('The product can nto be created');
    //     return res.send(product);

    newProduct.save()
    .then(createdProduct => {
        res.status(201).json(createdProduct);
    }).catch(err=>{
        res.status(500).json({
            error: err,
            success: false
        });
    });
    //res.send(newProduct);
});

router.put('/:id',async (req,res) => {

    if(!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(400).send('Invalid product id');
    }
    const category = await Category.findById(req.body.category);
    if(!category)
        {
        return res.status(500).send('Invalid category');
        }
    const product = await Product.findByIdAndUpdate(
        req.params.id,{
            name :req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:req.body.image,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInStock :req.body.countInStock,
            rating:req.body.rating,
            numReview:req.body.numReview,
            isFeatured:req.body.isFeatured
        },
        {new:true}
    )

    if(!product)
        return res.status(404).send('Product can not be created');
    res.send(product);
});

router.delete('/:id' ,(req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(product => {
        if(product){
            return res.status(200).json({success:true, message:'The product is deleted sucssesfully'});
        }
        else{
            return res.status(404).json({success:false,message:'The product is not found'});
        }
    }).catch(err => {
        return res.status(400).json({success:false,error:err});
    })
});

// display totle products avalaibale in stock
router.get('/get/count',async (req , res) => {
    const productCount = await Product.countDocuments();
    if(!productCount){
        res.status(500).json({success:false});
    }
    res.send({
        productCount: productCount
    });
});

router.get('/get/featured/:count',async (req , res) => {
    const count = req.params.count ? req.params.count : 0 ;
    const products = await Product.find({
        isFeatured:true
    }).limit(+count);
    if(!products){
        res.status(500).json({success:false});
    }
    res.send(products);
});

module.exports = router;