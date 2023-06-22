import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Posts = (props) => {
  let {title, summary, cover,_id, createdAt, updatedAt, author}=props
  const navigate= useNavigate();
  // const img='http://localhost:4000/'+{cover}.cover;
  let destImg={cover}.cover;
  let finalimg=destImg.slice(7);
  const img='http://localhost:4000/'+finalimg;
 
  const[shouldRender, setShouldRender]=useState(false);
  useEffect(()=>{
   
    if(!sessionStorage.getItem('token')){
      navigate('/login');
    }
    else{
      setShouldRender(true)
    }
  },[navigate, shouldRender, props])




  return (

     shouldRender && <div  style={{marginBottom:'50px', marginTop:'20px'}}>
      <div className="post">
        <div className="image-container" style={{overflow:"hidden", height:'200px', width:'auto', }}>
          <Link to={`/posts/${_id}`} style={{textDecoration:'none', color:'inherit'}}>
          <img
            src={img}
            alt="imag"
            id="zoom-image"
            height={'100%'}
            width={'80%'}
            style={{objectFit:'cover'}}
            
          />
          </Link>
          
          
        
        </div>

{/* ------------------------------------------------------------------------ */}
        <div className="texts" >
          <Link to={`/posts/${_id}`} style={{textDecoration:'none', color:'inherit'}}>
          <h2 style={{marginTop:5, fontSize:'2.7rem'}}>{title}</h2>
          </Link>
          <p className="info" style={{marginBottom:20, fontSize:'0.8rem'}}>
            
            <div style={{paddingRight:'40px'}}>
              <Link to="#" className="author">
              Author: {author?author:"Unknown"}
            </Link>
            </div>
            
            <br/>
            <div>
              <div>
              <time> Created:&ensp; {new Date(createdAt).toLocaleString()}</time>
              </div>
               <div>&ensp;&ensp; </div>
             
            </div>
            <time>&ensp;Last Updated:&ensp;{new Date(updatedAt).toLocaleString()}</time>
           
          </p>
          
          <p className="summary" style={{wordBreak:"break-all", whiteSpace:"normal", fontSize:'1rem', lineHeight:1.6, wordSpacing:'3px'}}>
            {summary.slice(0, 250)
                        }...
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Posts;

