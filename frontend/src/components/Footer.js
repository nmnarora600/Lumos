import React from 'react'
const Footer = () => {
  return (
    <div className="footer-container " style={{marginTop:'80px'}} >
    <footer className='bg-dark text-light ' style={{height:'125px', position:'relative'}}>

      <p className="text-center "  style={{paddingTop:'25px'}}>
      Copyright &copy; Lumos 2023
      </p>
      <p className="text-center foot">Designed and Developed by &nbsp;
      <p  style={{display:'inline-flex'}} >

      <a href='https://www.namanarora.in' className='text-decoration-none text-light FootName'> 
       Naman Arora </a>
      </p>
      </p>
    </footer>
    </div>
  )
}

export default Footer
