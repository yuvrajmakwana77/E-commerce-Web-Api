const {Category} = require('../Models/category');
const express = require('express');
const { route } = require('./categories');
const router = express.Router();

//get all the catogory avalable in cluster
router.get('/' , async (req , res) => {
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success:false});
    }
    res.status(200).send(categoryList);
});

// get specific catogory by id 
router.get('/:id', async(req,res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(500).json({message:'The catogory can not be found'});
    }
    res.status(200).send(category);
});

router.post('/', async(req,res)=>{
    let category =new Category({
        name:req.body.name ,
        icon:req.body.icon ,
        color:req.body.color
    });
    category = await category.save();

    if(!category)
        return res.status(404).send('Category not found');
    res.send(category);
});

router.delete('/:id' ,(req, res) => {
    Category.findByIdAndDelete(req.params.id)
    .then(category => {
        if(category){
            return res.status(200).json({success:true, message:'The category is deleted sucssesfully'});
        }
        else{
            return res.status(404).json({success:false,message:'The category is not found'});
        }
    }).catch(err => {
        return res.status(400).json({success:false,error:err});
    })
});

router.put('/:id',async (req,res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,{
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {new:true}
    )

    if(!category)
        return res.status(404).send('Category can not be created');
    res.send(category);
})

module.exports = router;