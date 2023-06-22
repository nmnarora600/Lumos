const mongoose= require('mongoose');
const {Schema, model}= mongoose

const PostSchema= new Schema({
    title: {type:String},
    summary:{type:String},
    content:{type:String},
    cover:{type:String},
    author:{type:String},
    authorID:{type:String},
},{
    timestamps:true
});

const PostModel= model('Post', PostSchema);

module.exports=PostModel;