import React, { useState } from 'react'
import { Button } from "react-bootstrap"
import "../styles/home.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";
import loginImg from "../assets/undraw_lighthouse_frb8.svg"
import { DOCTOR_ABI, DOCTOR_ADDRESS, PATIENT_ABI, PATIENT_ADDRESS } from "../Config/config"

import Web3 from "web3";

function Home() {

    const [loginAs, setLoginAs] = useState("")

    const checkConnection = () => {
        const addr = sessionStorage.getItem("addr");
        if (!addr) {
            toast.error("Connect MetaMask !");
            return false;
        }
        return true;
    }

    const login = async (as) => {

        if (checkConnection()) {
            const addr = sessionStorage.getItem("addr");
            const web3 = new Web3(window.web3.currentProvider);
            if (as == "doctor") {
                const doctor = new web3.eth.Contract(DOCTOR_ABI, DOCTOR_ADDRESS);
                const isDoc = await doctor.methods.isDoctor(addr).call();
                console.log(isDoc);
                if (!isDoc) {
                    await doctor.methods.addDoctor(addr).send({ from: addr });
                }
            }
            else {
                const patient = new web3.eth.Contract(PATIENT_ABI, PATIENT_ADDRESS);
                const isPat = await patient.methods.isPatient(addr).call();
                console.log(isPat);
                if (!isPat) {
                    await patient.methods.addPatient(addr).send({ from: addr });
                }
            }
            setLoginAs(as);
        }
    }

    if (loginAs == "doctor") {
        return <Navigate to="/doctor" />;
    }
    else if (loginAs == "patient") {
        return <Navigate to="/patient" />
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