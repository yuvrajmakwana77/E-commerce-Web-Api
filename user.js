const mongoose = require("mongoose");

//scheema of user that will be store in monodb cloud
const userSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true,
    },
    email:{
        type: String,
        require: true,
    },
    passwordHash:{
        type: String,
        require: true,
    },
    phone:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    street:{
        type:String,
        default:'',
    },
    apartment:{
        type:String,
        default:'',
    },
    zip:{
        type:String,
        default:'',
    },
    city:{
        type:String,
        default:'',
    },
    country:{
        type:String,
        default:'',
    }
});

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON',{
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
    }
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;