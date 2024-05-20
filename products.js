const mongoose = require("mongoose");

//scheema of product that will be store in monodb cloud
const productSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images:[{
      type: String,
      default: ''  
    }],
    brand:{
        type: String,
        default: ''
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock : {
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        default:''
    },
    numReview:{
        type:Number,
        default:0
    },
    isFeatured:{
        type: Boolean,
        default: false
    },
    dataCreated:{
        type: Date,
        default: Date.now
    }
});

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

productSchema.set('toJSON',{
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
    }
});

exports.Product = mongoose.model('Product',productSchema);
