import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide(props) {

  const navigate= useNavigate();
  const[render, setRender]=useState(false)
  props.setProgress(10);
 useEffect(()=>{
  
  if(sessionStorage.getItem('token')){
    navigate('/')
  }
  setRender('true')
  
 },[navigate])

 props.setProgress(20);
  const handleSubmit = async (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const resp = await fetch("https://lumosback.namanarora.in/api/login", 
    
    {
      method: "POST",

      body: (JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      })),

      headers: { "Content-Type": "application/json" },
    }
    );
    const json=await resp.json()

    if (json.success) {
      sessionStorage.setItem("token", json.authToken);
      console.log("token is set");
      props.showAlert("Logged in successfully", "success")

      navigate("/")
    } 
    
    else {
      props.showAlert("Invalid Credentials", "danger")
    }

  };
if(!render){
  return;
}
props.setProgress(40);
  return (
    <div style={{marginTop:'21px'}}>
     <ThemeProvider theme={defaultTheme} >
      <Grid container component="main" sx={{ height: '50vh', marginBottom:24 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 6,
              mx: 4,
              height:'60vh',
              width:'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent:'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' , marginBottom:2}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{marginTop:5}}>
              Welcome Back
            </Typography>
            {props.setProgress(60)}
            <Box component="form" className='mb-5' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {props.setProgress(80)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container className='mt-2'>
                <Grid item xs >
                <Link to="/Reset" variant="body2" style={{textDecoration:'none'}}>
                  {"Forgot Password?"}
                  </Link>
                </Grid>
                <Grid item >
                  <Link to="/SignUp" variant="body2" style={{textDecoration:'none'}}>
                    {"Don't have an account? Register Now"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
          {props.setProgress(100)}
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  );
}