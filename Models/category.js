const mongoose = require("mongoose");

//scheema of product that will be store in monodb cloud
const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    icon:{
        type: String
    },
    color:{
        type:String
    }
});

categorySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

categorySchema.set('toJSON',{
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
    }
});

exports.Category = mongoose.model('Category', categorySchema);
