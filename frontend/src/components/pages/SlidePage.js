import React, { useEffect, useState } from 'react'
import Posts from '../Posts'
import { useNavigate } from 'react-router-dom';


const SlidePage = (props) => {
  const navigate=useNavigate();
  const[posts, setPosts]=useState([]);
  const[loading, setLoading]=useState(true)
  useEffect( ()=>{
    if(!sessionStorage.getItem('token')){
      navigate('/login');
    }
    fetch("http://localhost:4000/api/allposts").then(response=>{
      response.json().then(posts=>{
        setPosts(posts);
        setLoading(false);
      });
    });
    
    
  },[props, navigate])
  
  if (loading) {
  
  return
  }
  
  const x=[...posts["posts"]];
const p=x.reverse();
  return ( 
    <div style={{marginTop:'70px'}}>
    <div>
    {(p).length===0 && "No Posts"}
    </div>
   
   {p && (p).map((element, index)=>{
      return <Posts key={(p[index]._id)} setProgress={props.setProgress} {...element}/>
      
    }) }

    
    </div>
    
  )
}

export default SlidePage
