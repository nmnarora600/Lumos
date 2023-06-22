const jwt=require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

const fetchUser=async (req,res,next)=>{
    const token= await req.header("auth-token")
  
    if(!token){
        res.status(401).json({error:"Use a Valid Token"})
    }
    try {

      
       
        const data = jwt.verify(token, JWT_SECRET_TOKEN);
       
        if(data.newUser){
            req.user= data.newUser
        
        }
        else if(data.id){
            req.user=data;
        }
    else{
        req.user=data.user
        
    }
        

    next();
    } catch (error) {
        res.status(401).json({error:"Not a Valid Token"})
    }
}
module.exports=fetchUser