const express = require("express");
const router = express.Router();
require('dotenv').config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const nodemailer=require("nodemailer")
const crypto=require('crypto')


//checking connection
router.get("/", (req, res) => {
  res.json("api is working");
});

//Creating New User
router.post(
  "/SignUp",
  [
    body("FirstName", "Invalid FirstName").isLength({ min: 3 }),
    body("LastName", "Invalid FirstName").isLength({ min: 3 }),
    body("email", "invalid email").isEmail(),
    body("password", "Non valid password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        console.log("in tryphase")
        let newUser = await User.findOne({ email: req.body.email });

        if (newUser) {
          return res
            .status(400)
            .json({ success: false, error: "User Already Exists" });
        } else {
          const salt = await bcrypt.genSalt(10);
          let secPass = await bcrypt.hash(req.body.password, salt);
          newUser = await User.create({
            name: req.body.FirstName + " " + req.body.LastName,
            email: req.body.email,
            password: secPass,
          });
          newUser.save();
          // const data=newUser._id

          const data = {
            newUser: {
              id: newUser._id,
            },
          };
          
          const authToken = jwt.sign(data, JWT_SECRET_TOKEN);
          success = true;
          console.log("leave tryphase")
          return res.json({ success, authToken });
        }
      } catch (error) {
        res.send("Internal Server Error");
      }
    } else {
     
      return res.status(400).json({ success: success, errors: errors.array() });
    }
  }
);

//Logging User
router.post(
  "/login",
  [
    body("email", "invalid email").isEmail(),
    body("password", "Incorrect Password").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
 
      const { email, password } = req.body;
      try {
       
        let user = await User.findOne({ email: email });
        if (!user) {
          return res.status(400).json({ error: "User Not exists" });
        }
        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
          return res.status(400).json({ success, error: "Invalid Password" });
        }
        console.log("got correct user");
        const data = {
          user: {
            id: user.id,
          },
        };
        console.log(data);
        console.log(JWT_SECRET_TOKEN)
        const authToken = jwt.sign(data.user, JWT_SECRET_TOKEN);
        success = true;
        console.log(authToken);
        return res.json({ success, authToken });
      } catch (error) {
        console.log("error from catch block");
        return res.status(500).send("Internal Server Error");
      }
    }
  }
);

//User Details
router.post("/getuser", fetchUser, 
async (req,res)=>{
    try {
    
      let userId=req.user.id; 

      
    
        const user= await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
      // console.log("could not get the details")
        return res.status(500).send("Some Error Occured")
    }
})

//reset password
router.post("/reset",[body("email", "invalid email").isEmail()], async (req, res)=>{
  try { 

    const {email}=req.body;
      const user= await User.findOne({email:email})
      if(!user){

        return res.status(500).send("User does not Exist");
      }
      else{
        
        const tempPassword = crypto.randomBytes(8).toString("hex");

        // Hash the temporary password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPassword, salt);

        user.password = hashedPassword;
        await user.save();
        
                try {
              
                  let transporter = nodemailer.createTransport({
                    service: "Gmail",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: 'k1vikky@gmail.com', // generated ethereal user
                      pass: process.env.PASS, // generated ethereal password
                    },
                  });
                
                  
                



                  // send mail with defined transport object
                  let info = await transporter.sendMail({
                    from: 'k1vikky@gmail.com', // sender address
                    to: `${user.email}`, // list of receivers
                    subject: "Password Reset ✔", // Subject line
                    text: `Dear User,

                    We have received a request to reset your password. Please find below your temporary password:
                    
                    Temporary Password: ${tempPassword}
                  
                    We recommend that you change this temporary password with a new one as soon as possible after logging in to your account.
                   
                    If you did not request a password reset, please disregard this email and ensure the security of your account.

                    Thank you for using our services.
                    Best regards`
, // plain text body
                    html: `<b>Dear User,</b>
                    <br><br>

                    We have received a request to reset your password. Please find below your temporary password:
                    <br><br>
                    <b>Temporary Password: ${tempPassword} </b>
                    <br><br>
                    We recommend that you change this temporary password with a new one as soon as possible after logging in to your account.
                    <br><br>
                    If you did not request a password reset, please disregard this email and ensure the security of your account.
<br><br>
Thank you for using our services.
<br><br><br>
Best regards,
<br><br>
Lumos
`, // html body
                  });
                  console.log("mail sent to :", user.email)
                  return res.json({result:"OK"});
               
                } catch (error) {
                
                  return res.status(500).send("Some Error Occured");
                  
                }
        
      }
      
  } catch (error) {
    
      return res.status(500).send("Some Error Occured")
  }
})

// change password
router.post("/changepwd",fetchUser ,async(req,res)=>{
  const {password}=req.body;

  const user= await User.findById(req.user.id);
  const salt = await bcrypt.genSalt(10);
  let secPass = await bcrypt.hash(password, salt);

  user.password=secPass
  await user.save();
 
  return res.json({suceess:"OK"})

})

module.exports = router;
