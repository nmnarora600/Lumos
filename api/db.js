const mongoose= require('mongoose');
const mongoURI= "mongodb://0.0.0.0:27017/LumosDB";

const connectToMongo=async ()=>{
try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo");
} catch (error) {
    console.log("Cannot Connect to Mongo")
}
}

module.exports=connectToMongo;