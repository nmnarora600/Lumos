import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SlidePage from "./components/pages/SlidePage";

import SignInSide from "./components/pages/SignInSide";
import SignUp from "./components/pages/SignUp";
import Addnew from "./components/pages/Addnew";
import SoloPost from "./components/pages/SoloPost";
import EditPost from "./components/pages/EditPost";
import { useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import Alert from './components/Alert'
import Footer from "./components/Footer";
import Reset from "./components/pages/Reset";
import Changepwd from "./components/pages/Changepwd";

function App() {
  const [alert, setAlert]=useState(null);
  const showAlert=(message, type)=>{
    setAlert({msg:message
      ,type:type})
    
      setTimeout(()=>{
        setAlert(null)
      },1500);
    }

    const [progress, setProgress]= useState(0)
  return (
    <>
    <Alert alert={alert}/>
    <LoadingBar color='#f11946' progress={progress} height={4} />
    <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<Layout showAlert={showAlert} />}>
        <Route index element={<SlidePage setProgress={setProgress}/>} />
        <Route path="/login" element={<SignInSide showAlert={showAlert} setProgress={setProgress} />} />
        <Route path="/Signup" element={<SignUp showAlert={showAlert} setProgress={setProgress} />} />
        <Route path="/Reset" element={<Reset showAlert={showAlert} setProgress={setProgress} />} />
        <Route path="/Changepwd" element={<Changepwd showAlert={showAlert} setProgress={setProgress} />} />
        <Route path="/addnew" element={<Addnew  showAlert={showAlert} setProgress={setProgress}/>} />
        <Route path="/posts/:id" element={<SoloPost showAlert={showAlert} setProgress={setProgress}/>} />
        <Route path="/edit/:id" element={<EditPost  showAlert={showAlert} setProgress={setProgress}/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
