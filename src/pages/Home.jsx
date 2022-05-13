import React, { useState } from 'react'
import {Button} from "react-bootstrap"
import "../styles/home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate } from "react-router-dom";
import loginImg from "../assets/undraw_lighthouse_frb8.svg"

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
        <div className='leftDiv'>
            <img className="login-img" src={loginImg} />
        </div>
        <div className='rightDiv'>
            <h1 className='rightDivHeading'>Welcome !</h1>
            <div className='rightDivButtons'>
                <Button onClick={() => login("doctor")} variant="outline-primary" className='login-buttons customButton'>
                    Login As Doctor   
                </Button>
                <Button onClick={() => login("patient")} variant="outline-primary" className='login-buttons customButton'>
                    Login As Patient   
                </Button>  
            </div>  
            <ToastContainer />
        </div>
    </div>
  )

}

export default Home