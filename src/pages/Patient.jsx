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
  const [prescriptionList, setPrescriptionList] = useState([]);

  useEffect(() => {
    const fetchPrescriptionList = async () => {
      const addr = sessionStorage.getItem("addr");
      const web3 = new Web3(window.web3.currentProvider);
      const patient = new web3.eth.Contract(PATIENT_ABI,PATIENT_ADDRESS);
      var pres = await patient.methods.viewPrescription(addr).call();
      var parsed = [];
      for(var i=pres.length-1;i>0;i--){
        parsed.push(JSON.parse(pres[i]));
      }
      setPrescriptionList(parsed);
    }
    fetchPrescriptionList();
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
    await patient.methods.addAuthorization(doctorAddr, addr, fee).send({from: addr, value:fee});
  }
  
  return (
    <div className='patientDiv'>
      <h1 className='heading1'>Patient's Dashboard</h1>
      <div className='latestPresctiption'>
        {prescriptionList.length == 0 ? (
          <h4>No History Available</h4>
        ):(
          <div className='latestPresctiptionContent'>
            <h4>Notes</h4>
            <p>{prescriptionList[0].note}s</p>
            <h4>Vitals</h4>
            <p>{prescriptionList[0].vitals}</p>
            <h4>Medicines</h4>
            <p>{prescriptionList[0].medicines}</p>
            <h4>Advice</h4>
            <p>{prescriptionList[0].advice}</p>
            {prescriptionList.length > 1 && (
              <Link to="/patientHistory"><Button type="submit" className='customButton historyButton'>Show Complete History</Button></Link>
            )}
          </div>
        )}
      </div>
      <Form className='patientForm'>
        <h4 className='heading1'>Authorize Doctor</h4>
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