
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  useNavigate} from "react-router-dom";
import Spinner from "./Spinner";





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Reset = (props) => {

  let navigate=useNavigate();
const [render, setRender]=React.useState(false);
  React.useEffect(()=>{
if(sessionStorage.getItem('token'))
navigate('/')
else
setRender(true);
  },[navigate])

const [email, setEmail]= React.useState("")
const [loadAlert, setLoadAlert]=React.useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    setLoadAlert(true);
    const data = new FormData(event.currentTarget);
   

    const resp = await fetch("https://lumosback.namanarora.in/api/Reset", 
    
    {
      method: "POST",

      body: (JSON.stringify({
        email: data.get("email"),
      })),

      headers: { "Content-Type": "application/json" },
    }
    );
    event.preventDefault();
  
    if (resp.ok) {
     props.showAlert("Password sent to email", "success");
      setEmail('');
      setLoadAlert(false);
    
    } 
    
    
    else {
     
        props.showAlert("Check the credentials and try again", "danger")
        setLoadAlert(false);
      
      
    }

  };

  return(
    render && <div style={{marginTop:'53px', bottom:0}}>
       <ThemeProvider theme={defaultTheme}>
         <Container component="main" maxWidth="xs">
           <CssBaseline />
           <Box
             sx={{
               marginTop: 0,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
                marginBottom:'55px'
             }}
           >
             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
               <LockOutlinedIcon />
             </Avatar>
             <Typography component="h1" className="text-center mt-3 mb-2" variant="h5">
               Enter your registered email to continue
             </Typography>
             <Box
               component="form"
               noValidate
               onSubmit={handleSubmit}
               sx={{ mt: 3}}
               style={{width:'100%'}}
             >
               
                
                 <Grid item xs={12}>
                   <TextField
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     value={email}
                     onChange={(e)=>{setEmail(e.target.value)}}
                   />
                 </Grid>
                <div style={{height:'45px'}} className="mt-2">

                 {loadAlert && <Spinner />}
                </div>
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{  mb: 1 }}
               >
                 Continue
               </Button>
               
             </Box>
           </Box>
           
         </Container>
       </ThemeProvider>
       {props.setProgress(100)}
       </div>
     );
}

export default Reset
