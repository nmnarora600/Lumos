import React from 'react'



export default function prompt(props) {

  const firstCap = (word)=>{
    if(word==="danger"){
      word="error";
    }
    const lower= word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);

  }
  return (
    <div style={{height:'100px'}}>
      <div style={{position:'fixed', width:'100%', top:120, left:'50%', transform: 'translateX(-50%) ', zIndex:33}}>
      
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{firstCap(props.alert.type)}: </strong>{props.alert.msg} 
    </div>}
      </div>
        
    </div>
    
  )
}

prompt.defaultProps={
  type:'danger',
  msg :'This is Sample'
}