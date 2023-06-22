import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoImage from './../lumos-t-logo.png'


const Headers = (props) => {

  const capitalFirst=(str)=>{
    const word = str.trim(" ");
    let idx = word.indexOf(" ");
    if (idx !== -1) {
      let firstWord = word.substring(0, idx);
      return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const navigate=useNavigate();
  const[loggedInUser, setLoggedInUser]=useState('');
  const handleLogout=(e)=>{
    e.preventDefault();
    sessionStorage.removeItem('token');
    navigate('/login');
    props.showAlert('logged out Successfully', 'success');
  }
  var nameChange=sessionStorage.getItem('token');
  useEffect(()=>{
    
    let getUserName = async () => {
      const response = await fetch("http://localhost:4000/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token"),
          },
        });
        const json = await response.json();
       
        
        response.ok ? setLoggedInUser(json.name) : setLoggedInUser("User");
      }
      if(nameChange)
      getUserName();
  },[nameChange])
  return (
    <div className='sticky' >
      <header   >
        
        <div id="welcomeuser">
        <Link to='/'>

        <img alt='logoImage' src={logoImage}/>
        </Link>
          </div>
        
        {sessionStorage.getItem('token')?
        <nav>
          <h4 style={{fontSize:'1.2rem'}} className='userDetails'>{`Hello, ${capitalFirst(loggedInUser) }`}&emsp;</h4>
          <Link to="/addnew" id='link1' style={{display:'ruby'}}><p className='button-border'>Create New Blog</p> </Link>
          <Link to="/Changepwd" id='link3' style={{display:'ruby'}}><p className='button-border'>Change Password</p> </Link>
          
          <Link to="/login" id='link2' onClick={handleLogout}  style={{display:'ruby',  marginRight: '40px'}}><p className='button-border'> Logout</p></Link>
        </nav>:
        <nav>
          <Link to="/login" className='logoutedBtn'>Login</Link>
          <Link to="/Signup" className='logoutedBtn'>Register</Link>
          
        </nav>
        }
        
      </header>
    </div>
  )
}

export default Headers
