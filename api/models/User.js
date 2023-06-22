const mongoose= require('mongoose');
const {Schema, model}= mongoose

const UserSchema= new Schema({
    email: {type:String, required:true, min:4, unique:true},
    password:{type:String, required:true},
    name:{type:String}
});

const UserModel= model('User', UserSchema);

module.exports= UserModel;