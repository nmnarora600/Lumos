const jwt=require('jsonwebtoken');
const JWT_SECRET_TOKEN = "blogB1ynaman";
const fetchUser=async (req,res,next)=>{
    const token= await req.header("auth-token")
  
    if(!token){
       return res.status(401).json({error:"Use a Valid Token"})
    }
    try {

	console.log('in the fetchuser');      
       
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
console.log(req.user);
console.log("leave fetch");
        

    next();
    } catch (error) {
console.log('fetchuser return error');
        return res.status(401).json({error:"Not a Valid Token"})
    }
}
module.exports=fetchUser
