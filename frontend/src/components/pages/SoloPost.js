import React, {  useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useParams, Link, useNavigate } from 'react-router-dom';

// import 'highlight.js/styles/base16/monk.css'; // Replace 'default.css' with the desired highlighting style
import '../../monk.css'; // Replace 'default.css' with the desired highlighting style





const CapEach=(mySentence)=>{
  const words = mySentence.split(" ");

for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
}

return words.join(" ");
}

const SoloPost = (props) => {
  props.setProgress(10);
    const {id}= useParams();
    const[postInfo, setPostInfo]=useState(null)
    const[userID, setuserID]=useState('');
    const navigate = useNavigate();
props.setProgress(20);
    const handlePostDelete=async(e)=>{
      
      e.preventDefault();
      const delResult= await fetch(`http://localhost:4000/remove/${id}`,{
        method:'DELETE',
        headers:{
          "Content-Type": "application/json",
          "auth-token":sessionStorage.getItem('token')
        },
      });
     
     await delResult.json();
      
      if(delResult.ok){
        props.showAlert("Post Deleted", "success");
        navigate('/')
      }
      else{
        props.showAlert("Something went wrong", "danger");
      }

    }

   
  
    useEffect(()=>{
      if(!sessionStorage.getItem('token')){
        props.showAlert("Unauthorized Access", "danger")
        navigate('/login')
      }
        fetch(`http://localhost:4000/posts/${id}`).then(response=>{
            response.json().then(postInfo=>{
                setPostInfo(postInfo)
            })
        })
        const getAuthorID=async ()=>{
            const response = await fetch("http://localhost:4000/api/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setuserID(json._id);
      

        }
        getAuthorID();


    },[id, navigate, props])
    if(postInfo===null || userID===''){
        return
    }
    const {title, cover, content,_id, createdAt,updatedAt, author, authorID}=postInfo
    let destImg={cover}.cover;
    let finalimg=destImg.slice(7);
    const img='http://localhost:4000/'+finalimg;
   props.setProgress(40);



  return (
     <div className='post-page'>
        <h1 className='mt-4' style={{fontSize:'4rem'}}>{title}</h1>
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
        <time style={{fontSize:'1rem'}}><strong style={{color:'black'}}>Created on:</strong> &ensp;{new Date(createdAt).toLocaleString()}</time>
        <time style={{fontSize:'1rem'}}>&emsp;|&emsp;<strong style={{color:'black'}}>Last Updated:</strong> &ensp;{new Date(updatedAt).toLocaleString()}</time>
        </div>
       
        <div className="author mt-2" style={{fontSize:'1rem'}}><b style={{color:'black'}}>Author:</b> {CapEach(author)}</div>
        {(userID===authorID)?
                (<div style={{display:'flex', justifyContent:'space-evenly'}}>
                    <div className='edit-row'>

                        <Link className='edit-button' id='editpostbtn' to={`/edit/${_id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
                            Edit this post</Link>
                    </div>
                    {props.setProgress(60)}
                    <div className='edit-row'>

                        <Link className='edit-button' id='deletepostbtn' onClick={handlePostDelete}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                            Delete this post</Link>
                    </div>
                    
                    {props.setProgress(80)}
                    </div>
                ):(console.log("t"))
            }
        <div className="image" >
            <img src={img} alt='' style={{width:'100%',  margin: 0, padding: 0}}/>
        </div>
        <div className='mt-5 ' style={{fontWeight:600, fontSize:'3.5rem', textAlign:'center'}}>Content</div>
        <div className='mb-5 py-5 px-3 mx-3 hljs-keyword quillClass' style={{border:'3px solid black', borderRadius:'40px', backgroundColor:'#F2EECB'}}>

        <ReactQuill theme='snow' className='quillContainer' readOnly="true" value={content} modules={{toolbar:false}}  /> 
        </div>
        
      {props.setProgress(100)}
     
    </div>
  )
}

export default SoloPost
