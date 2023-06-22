import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link , useNavigate} from "react-router-dom";





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp(props) {
  
  props.setProgress(20);
  let navigate=useNavigate();

const [password, setPassword]=React.useState('');
const [cpassword, setCpassword]=React.useState('');
const[ischeck, setIsCheck]=React.useState(false);

const handleCheck=()=>{
  
  setIsCheck(!ischeck);
}

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    
    const data = new FormData(event.currentTarget);
   if(cpassword!== password){
    props.showAlert("Passwords must be same", 'danger');
   }
   else if(password.length<4){
    props.showAlert("Passwords must be of atleast 4 letters", 'danger');
   }
   else if((data.get("FirstName").length<3 )){
    props.showAlert("First name must be of atleast 3 characters", 'danger');
   }
   else if((data.get("LastName").length<3)){
    props.showAlert("Last name must be of atleast 3 characters", 'danger');
   }
   else if(ischeck===false){
    props.showAlert("You must agree to the terms & conditions", 'danger');
   }
else{
  const resp = await fetch("http://localhost:4000/api/SignUp", 
    
  {
    method: "POST",

    body: (JSON.stringify({
      FirstName: data.get("FirstName"),
      LastName: data.get("LastName"),
      email: data.get("email"),
      password: data.get("password"),
    })),

    headers: { "Content-Type": "application/json" },
  }
  );
  const json=await resp.json()
  
  if (json.success) {
   props.showAlert("Account Created", "success");

    sessionStorage.setItem("token", json.authToken);
    navigate("/")
  } 
  
  
  else {
   
      props.showAlert("Check the credentials and try again", "danger")

    
    
  }
}
    

  };
props.setProgress(40);
  return (
    <div style={{marginTop:'35px', bottom:0}}>
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="FirstName"
                  required
                  fullWidth
                  id="FirstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              {props.setProgress(60)}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="LastName"
                  label="Last Name"
                  name="LastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  value={cpassword}
                  onChange={(e)=>setCpassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox  id="myCheck" color="primary" value={ischeck} onChange={handleCheck} />
                  }
                  label="I accept all terms and conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {props.setProgress(80)}
                <Link to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
    {props.setProgress(100)}
    </div>
  );
}
