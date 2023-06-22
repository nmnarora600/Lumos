const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Post = require("../models/Post");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "../api/uploads/"});
const fs = require("fs");
const { findByIdAndDelete } = require("../models/User");

router.post("/", uploadMiddleware.single("files"), (req, res) => {
  const { path } = req.file;
 
  // const partsArray=originalname.split('.');
  // const exten=partsArray[partsArray.length-1];
  let filePath =path + ".JPG";

  fs.renameSync(path, filePath);

  let savefile = new Post({
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
    cover: filePath,
    author: req.body.author,
    authorID: req.body.authorID,
  });
  savefile.save();
  res.send(savefile);
});

router.put('/:id', uploadMiddleware.single("files"), async (req,res)=>{
    try {
      let filePath=null;

   if(req.file){
    const { path } = req.file;
  filePath = path + ".JPG";
  fs.renameSync(path, filePath);
 }

const {id}=req.params;
let result= await Post.findById(req.params.id);
if(result===null){

return  res.status(404).json({jj:"Not Found"});
}

 let savefile = await Post.findByIdAndUpdate(id,{
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
  },{new:true});
 return res.json(savefile)
    } catch{
      return res.status(500).send("Some Error Occured")
    }
})

router.delete('/:id',fetchUser,async(req,res)=>{


  // res.send(req.params.id);
  try {

    let result= await Post.findById(req.params.id);
    if(req.user.id!==result.authorID){
      return res.status(401).send("Unauthorized");
    }
    if(!result){
      return req.status(404).send("Not Found");
    }
    else{
      let a=await Post.findByIdAndDelete(req.params.id);
      return res.send(result);
    }
  
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Some Error Occured");
  }

 }
 
 )
// for getting all blogs
router.get('/', async (req, res)=>{
    try {
        const posts = await Post.find();
        return res.json({posts})
    } catch (error) {
        return res.status(500).json({error:"Some Error Occured"})
    }
})

// For SOloPost
router.get('/:id', async (req, res)=>{
    try {
        const{id}=(req.params);
        const post = await Post.findById(id);
        return res.json(post);
    } catch (error) {
       return res.status(500).json({error:"Some Error Occured"})
    }
})



module.exports = router;
