import React, {useState, useEffect} from 'react'
import {Form, Button, FormGroup} from "react-bootstrap";
import "../styles/patient.css";
import {Link} from "react-router-dom"
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai"
import {DOCTOR_ABI, DOCTOR_ADDRESS, PATIENT_ABI, PATIENT_ADDRESS} from "../Config/config"
import Web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';

function Patient() {

  const [doctorAddr, setDoctorAddr] = useState("");
  const [prescriptionList, setPrescriptionList] = useState([1,2]);

  useEffect(() => {
    // TODO: fetch prescription list
  }, [])

  const changeAuth = async (event) => {
    event.preventDefault();
    if(doctorAddr == ""){
      toast.error("Doctor Address Empty !");
      return;
    }
    const addr = sessionStorage.getItem("addr");
    const web3 = new Web3(window.web3.currentProvider);
    const doctor = new web3.eth.Contract(DOCTOR_ABI, DOCTOR_ADDRESS);
    const fee = await doctor.methods.getFee(doctorAddr).call();
    console.log(fee);
    const patient = new web3.eth.Contract(PATIENT_ABI,PATIENT_ADDRESS);
    console.log(doctorAddr);
    console.log(addr);
    await patient.methods.addAuthorization(doctorAddr, addr, fee).send({from: addr});
  }
  
  return (
    <div className='patientDiv'>
      <h1 className='heading1'>Patient's Home</h1>
      <div className='latestPresctiption'>
        {prescriptionList.length == 0 ? (
          <h4>No History Available</h4>
        ):(
          <div>
            <h1>History</h1>
            {prescriptionList.length > 1 && (
              <Link to="/patientHistory"><Button type="submit" className='customButton historyButton'>Show Complete History</Button></Link>
            )}
          </div>
        )}
      </div>
      <Form className='patientForm'>
        <FormGroup className='patientFormGrp'>
          <Form.Control onChange={(event) => {setDoctorAddr(event.target.value)}} value={doctorAddr} placeholder="0x725....."></Form.Control>
          <Button className='customButton' variant="primary" type="submit" onClick={(event) => changeAuth(event)}><AiOutlinePlus /></Button>
        </FormGroup>
        {/* <FormGroup className='patientFormGrp'>
          <Form.Control onChange={(event) => {setDoctorAddr(event.target.value)}} value={doctorAddr} placeholder="0x725....."></Form.Control>
          <Button className='customButton' variant="primary" type="submit" onClick={changeAuth(false)}><AiOutlineMinus /></Button>
        </FormGroup> */}
      </Form>
      <ToastContainer />
    </div>
  )
}

export default Patient