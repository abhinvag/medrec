import React, { useState } from 'react'
import {Button} from "react-bootstrap"
import "../styles/home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate } from "react-router-dom";

function Home() {

    const [loginAs, setLoginAs] = useState("")

    const checkAccountChange = () => {
        const addr = sessionStorage.getItem("addr");
        if(!addr){
            toast.error("Connect MetaMask !");
            return false;
        }    
        return true;
    }

    const login = (as) => {
        if(checkAccountChange()){
            setLoginAs(as);
        }
    }

    if(loginAs == "doctor"){
        return <Navigate  to="/doctor" />;
    }
    else if(loginAs == "patient"){
        return <Navigate  to="/patient" />
    }

  return (
    <div className='homeDiv'>
       <Button onClick={() => login("doctor")} variant="outline-primary" className='login-buttons'>
            Doctor Login   
        </Button>
        <Button onClick={() => login("patient")} variant="outline-primary" className='login-buttons'>
            Patient Login   
        </Button>    
        <ToastContainer />
    </div>
  )

}

export default Home