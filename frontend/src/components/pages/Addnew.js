import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useNavigate} from 'react-router-dom'
const Addnew = (props) => {
  const navigate= useNavigate();

 
const createNewPost=async (e)=>{
    const data= new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('files',files[0]);
    data.set('author',author);
    data.set('authorID',authorID);
    e.preventDefault();
    
    const resp= await fetch("http://localhost:4000/api/feed",{
      method:"POST",
      body: data
    })
    if(resp.ok){
      props.showAlert('Posted Successfully', 'success');
   
      navigate('/')
    }
    else{
      props.showAlert('Some error occured', 'danger');
    }

}

    //State Variables to Clear on reset
    const[coverTitle, setCoverTitle]= useState('');
    const[title, setTitle]= useState('');
    const[summary, setSummary]= useState('');
    const[content, setContent]= useState('');
    const[files, setFiles]= useState('');
    const[author, setAuthor]= useState('');
    const[authorID, setAuthorID]= useState('');

   

// get user name----------------------------------------------->
var authorPresent=sessionStorage.getItem('token');

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
    
      
      response.ok ? setAuthor(json.name) : setAuthor("Unknown");
      if(response.ok) {setAuthorID(json._id)}
    
  };

  if(sessionStorage.getItem('token')){
    getUserName();


  }
},[authorPresent, props])






    //To add title of file after upload
   const handleUpload=(e)=>{
        if(e.target.files[0])
        setCoverTitle(e.target.files[0].name);
        setFiles(e.target.files)
    }

    // to access content of quill
    
        var quill=document.getElementsByClassName('ql-editor')
        

    // Reset  Button
    const handleReset=()=>{
           setTitle('');
           setSummary('') 
           setCoverTitle('')
           quill[0].innerHTML='';
          
    }
  return (
   <>
   <h1 style={{textAlign:'center', marginTop:'55px'}}>Create New Blog</h1>

   {/* Form starts here --------------------------------------------------------------------------------------*/}
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1,display:'flex', width: '100%' },
      }}
      noValidate
      onSubmit={createNewPost}
      autoComplete="off"
    >

        <TextField
        
          id="title"
          label="Title of Blog"
          value={title}
          variant="standard"
          onChange={(e)=>{setTitle(e.target.value)}}
        />
     
        <TextField
        
          id="summary"
          label="A Brief Summary"
          value={summary}
          multiline
          variant="standard"
          onChange={(e)=>{setSummary(e.target.value)}}
          
        />

{/* Image Upload ----------------------------------------------------------------------------------*/}
<Button
  variant="outlined"
  component="label"
  color='secondary'
  style={{marginTop:15,marginBottom:30}}
>
  {coverTitle? coverTitle :'Upload Cover Image'}
  <input
    accept='image'
    type='file'
    hidden
    onChange={handleUpload}
  />
</Button>


{/* // Reat quill------------------------------------------------------------------------------------------------ */}


<div style={{ textAlign:'center'}}>
    <ReactQuill theme="snow" placeholder="Enter the Details Here" 
    modules={{
        toolbar: {
          container: [
              [{'font':[]}],
            [{ header: [1, 2, 3, 4, 5, 6] }],
            [{'align':[]}],
            ['bold', 'italic', 'underline', 'strike'], // Default toolbar buttons
            [{ 'code-block':'code' }], // Custom code block button
            [{ list: 'ordered' }, { list: 'bullet' }], // List buttons
            ['clean'], // Remove formatting button
          ],
        },
      }} formats={['header','bold', 'italic', 'underline', 'strike', 'code-block','list']}
      onChange={ (content, delta, source, editor)=> {
        const text = editor.getText(content);
        setContent(text);
      }}/>




{/* //Post and Reset Button--------------------------------------------------------------------------------------- */}


    <div style={{display:'flex', justifyContent:'space-evenly'}}>
    <Button
  variant='contained'
  type='submit'
  color='success'
  style={{marginTop:30, height:50, width:'25%', fontSize:20}}>
     Post the blog</Button>
  <Button
  variant='contained'
  color='error'
  style={{marginTop:30, height:50, width:'25%', fontSize:20}} onClick={handleReset}>Reset All fields</Button>
    </div>


</div>
       
    </Box>

   </>
  )
}

export default Addnew
