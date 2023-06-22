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

const defaultTheme = createTheme();

const Changepwd = (props) => {
const [render, setRender]=React.useState(false);
    let navigate=useNavigate();
React.useEffect(()=>{
  if(!sessionStorage.getItem('token')){
    navigate('/login')
  }
  else{
    setRender(true);
  }
},[navigate])

    const [newPass, setNewPass]= React.useState("")
    const [cnewPass, setCnewPass]= React.useState("")
    
      const handleSubmit = async (event) => {
    
        event.preventDefault();
        
        
        const data = new FormData(event.currentTarget);
       
        if(newPass===''){
            props.showAlert("Password can not be blank", "danger")
        }
        else if(newPass!==cnewPass){
          props.showAlert("Passwords must be same", 'danger')
        }
        else{
            const resp = await fetch("http://localhost:4000/api/changepwd", 
        
        {
          method: "POST",
    
          body: (JSON.stringify({
            password: data.get("newPass"),
          })),
    
          headers: { "Content-Type": "application/json" ,
        "auth-token":sessionStorage.getItem('token')},
        }
        );
        
        if (resp.ok) {
         props.showAlert("Password Changed", "success");
          setNewPass('');
          setCnewPass('');
        } 
    
        
        else {
         
            props.showAlert("Check the credentials and try again", "danger")
    
          
          
        }
        }
      };

  return (
    render && <div style={{marginTop:'35px', bottom:0}}>
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
             <Typography component="h1" className="text-center mb-4" variant="h5">
               Enter the details to continue
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
                     id="newPass"
                     label="Enter New Password"
                     name="newPass"
                     type="password"
                     value={newPass}
                     onChange={(e)=>{setNewPass(e.target.value)}}
                   />
                 </Grid>

                 <Grid item xs={12} className="mt-4">
                   <TextField
                     required
                     fullWidth
                     id="CnewPass"
                     label="Confirm New Password"
                     name="CnewPass"
                     type="password"
                     value={cnewPass}
                     onChange={(e)=>{setCnewPass(e.target.value)}}
                   />
                 </Grid>
                
                 
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 4, mb: 1 }}
               >
                 Continue
               </Button>
               
             </Box>
           </Box>
           
         </Container>
       </ThemeProvider>
       {props.setProgress(100)}
       </div>
  )
}

export default Changepwd
