import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import "../styles/prescription.css";
import { DOCTOR_ABI, DOCTOR_ADDRESS, PATIENT_ABI, PATIENT_ADDRESS } from "../Config/config"
import Web3 from "web3";
import { Navigate } from "react-router-dom";

function Prescription(props) {

    const [prescription, setPrescription] = useState({
        "notes": "",
        "vitals": "",
        "medicines": "",
        "advice": ""
    });

    const [patientAddr, setPatientAddr] = useState(sessionStorage.getItem("patientAddr"));

    const [redirect, setRedirect] = useState(false);

    const updatePrescription = (event) => {
        const { name, value } = event.target;
        setPrescription((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        if (patientAddr == "") {
            toast.error("Patient's Ethereum Address Not Provided");
            return;
        }

        const doctorAddr = sessionStorage.getItem("addr");

        //TODO: check if pateint has authoriszed this doctor 

        const web3 = new Web3(window.web3.currentProvider);
        const patient = new web3.eth.Contract(PATIENT_ABI, PATIENT_ADDRESS);
        const doctor = new web3.eth.Contract(DOCTOR_ABI, DOCTOR_ADDRESS);
        const isAuth = await patient.methods.isAuthorized(doctorAddr, patientAddr).call();

        if (isAuth) {
            const fee = await doctor.methods.getFee(doctorAddr).call();
            console.log(fee);
            console.log(JSON.stringify(prescription));
            await patient.methods.getPrescription(JSON.stringify(prescription), patientAddr, doctorAddr, fee).send({ from: doctorAddr });
            setRedirect(true);
        }
        else {
            toast.error("You do not have access to prescribe to this patient");
        }

        setPrescription({
            "notes": "",
            "vitals": "",
            "medicines": "",
            "advice": ""
        })

    }

    if (redirect) {
        return <Navigate to="/doctor" />
    }

    return (
        <div className='prescriptionDiv'>
            <h1 className='heading1'>Prescription</h1>
            <Form className="prescriptionFormDiv">
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control onChange={updatePrescription} name='notes' value={prescription.notes} as="textarea" rows={3} placeholder="High Fever" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Vitals</Form.Label>
                    <Form.Control onChange={updatePrescription} name='vitals' value={prescription.vitals} as="textarea" placeholder="101 °C" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Medicines</Form.Label>
                    <Form.Control onChange={updatePrescription} name='medicines' value={prescription.medicines} as="textarea" rows={3} placeholder="Paracetamol 100mg" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Advice</Form.Label>
                    <Form.Control onChange={updatePrescription} name='advice' value={prescription.advice} as="textarea" placeholder="Eat Ice" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Patient's Ethereum Address</Form.Label>
                    <Form.Control disabled onChange={(event) => { setPatientAddr(event.target.value) }} value={patientAddr} placeholder="0x725....." />
                </Form.Group>
                <Button className='customButton' variant="primary" type="submit" onClick={(event) => onSubmit(event)}>
                    Submit
                </Button>
            </Form>
            <ToastContainer />
        </div>
    )
}

export default Prescription;