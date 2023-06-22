import React from 'react'
import { Outlet } from 'react-router-dom'
import Headers from './Headers';
// import { Alert } from '@mui/material';

const Layout = (props) => {



  return (

   <main>
        <Headers showAlert={props.showAlert} />
     
         <Outlet />
    </main>
  )
}

export default Layout
