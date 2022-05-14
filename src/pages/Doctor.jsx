import React, {useState, useEffect} from 'react'
import {Form, Button, InputGroup, DropdownButton, Dropdown} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import {Navigate } from "react-router-dom";
import "../styles/doctor.css";
import {DOCTOR_ABI, DOCTOR_ADDRESS, PATIENT_ABI, PATIENT_ADDRESS} from "../Config/config"
import Web3 from "web3";

function Doctor() {

    const [patientAddr, setPatientAddr] = useState();    
    const [fees, setFees] = useState();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const fetchCurrentFee = async () => {
            const addr = sessionStorage.getItem("addr");
            const web3 = new Web3(window.web3.currentProvider);
            const doctor = new web3.eth.Contract(DOCTOR_ABI, DOCTOR_ADDRESS);
            const fee = await doctor.methods.getFee(addr).call();
            console.log(fee);
            setFees(fee);
        }
        fetchCurrentFee();
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();

        if(patientAddr == ""){
            toast.error("Patient's Ethereum Address Not Provided");
            return;
        }

        const doctorAddr = sessionStorage.getItem("addr");
        const web3 = new Web3(window.web3.currentProvider);
        const patient = new web3.eth.Contract(PATIENT_ABI, PATIENT_ADDRESS);
        const isAuth = await patient.methods.isAuthorized(doctorAddr, patientAddr).call();

        if(isAuth){
            setRedirect(true);
            return;
        }
        
        toast.error("You do not have access to prescribe to this patient");
        return;

    }

    const updateFees = async (event) => {
        event.preventDefault();
        console.log(fees);
        if(fees < 0){
            toast.error("Invalid Fees");
            return;
        }
        const addr = sessionStorage.getItem("addr");
        const web3 = new Web3(window.web3.currentProvider);
        const doctor = new web3.eth.Contract(DOCTOR_ABI, DOCTOR_ADDRESS);
        await doctor.methods.updateFee(addr, fees).send({from: addr});
    }

    if(redirect){
        sessionStorage.setItem("patientAddr", patientAddr);
        return <Navigate to="/prescription" />
    }

    return (
        <div className='doctorDiv'>
            <h1 className='heading1'>Doctor's Home</h1>
            <Form className="doctorFormDiv">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Patient's Ethereum Address</Form.Label>
                    <Form.Control onChange={(event) => {setPatientAddr(event.target.value)}} value={patientAddr} placeholder="0x725....." />
                    <Button className='customButton formButton' variant="primary" type="submit" onClick={(event) => onSubmit(event)}>
                        Open Prescription
                    </Button>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Fees</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control onChange={(event) => {setFees(event.target.value)}} value={fees} placeholder="12" type="Number" />
                        <InputGroup.Text>wie</InputGroup.Text>
                    </InputGroup>
                    <Button className='customButton' variant="primary" type="submit" onClick={(event) => updateFees(event)}>
                        Update Fees
                    </Button>
                </Form.Group>
            </Form>
            <ToastContainer />
        </div>
    )
}

export default Doctor