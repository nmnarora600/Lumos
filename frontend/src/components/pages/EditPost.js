import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useNavigate, useParams} from 'react-router-dom'

const EditPost = (props) => {
const navigate=useNavigate();
var quill=document.getElementsByClassName('ql-editor')



const handleUpload=(e)=>{
    if(e.target.files[0])
    setCoverTitle(e.target.files[0].name);
    setFiles(e.target.files)
}

const handleReset=()=>{
    setTitle('');
    setSummary('') 
    setCoverTitle('')
    quill[0].innerHTML='';
   
}

    const UpdatePost=async (e)=>{
        e.preventDefault();
      
        const data= new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id)
        
        if(files?.[0]){

            data.set('files',files?.[0]);
        }
      
        
        const resp= await fetch(`http://localhost:4000/edit/${id}`,{
          method:"PUT",
          body: data
        })
 
        if(resp.ok){
         
          props.showAlert('Updated Successfully', 'success');
          navigate(`/posts/${id}`)
        }
        else{
          props.showAlert('Some Error Occured', 'danger');
        }
    
    }
    const {id}= useParams();
    const[coverTitle, setCoverTitle]= useState('');
    const[title, setTitle]= useState('');
    const[summary, setSummary]= useState('');
    const[content, setContent]= useState('');
    const[files, setFiles]= useState('');
    const[userID, setuserID]=useState('')
    const[authorID, setauthorID]=useState('')

    useEffect(()=>{
      if(!sessionStorage.getItem('token')){
        props.showAlert("Unauthorized Access", "danger");
        navigate('/login')
      }

        fetch(`http://localhost:4000/posts/${id}`).then(
            response=>{
                response.json().then(postInfo=>{
                    setTitle(postInfo.title)
                    setContent(postInfo.content)
                    setSummary(postInfo.summary)
                    setCoverTitle(postInfo.cover)
                    
                })
            }
        )


        const isauth=async ()=>{
          const checkPerson= await fetch("http://localhost:4000/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token"),
          },
        });
      
        const result=await checkPerson.json();
        setuserID(result._id);
        }
      
      const author=async ()=>{
        const check=await fetch(`http://localhost:4000/posts/${id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            },
          });
   
          const writer=await check.json();
          setauthorID(writer.authorID)
        if(!check.ok){
          props.showAlert("Enter Valid Credentials","danger");
          navigate('/')
        }
      }
isauth();
author();
    },[id,navigate,props])

    if(userID!==authorID){
      props.showAlert("Unauthorized Access","danger")
      navigate('/')
    }


  return (
   <>
   <h1 style={{textAlign:'center', marginTop:'15px'}}>Update Your Blog</h1>

   {/* Form starts here --------------------------------------------------------------------------------------*/}
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1,display:'flex', width: '100%' },
      }}
      noValidate
      onSubmit={UpdatePost}
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
  style={{marginTop:15,marginBottom:20}}
>
  {coverTitle? coverTitle :'Upload Cover Image'}
  <input
    accept='image'
    type='file'
    hidden
    onChange={handleUpload}
  />
</Button>


{/* // React quill------------------------------------------------------------------------------------------------ */}


<div style={{ textAlign:'center'}}>
    <ReactQuill theme="snow" placeholder="Enter the Details Here" 
    value={content}
    onChange={(value, delta, source, editor) =>{ setContent( editor.getHTML() )}}
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
      />




{/* //Post and Reset Button--------------------------------------------------------------------------------------- */}


    <div style={{display:'flex', justifyContent:'space-evenly'}}>
    <Button
  variant='contained'
  type='submit'
  color='success'
  style={{marginTop:30, height:50, width:'25%', fontSize:20}}>
     Update the blog</Button>
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

export default EditPost
