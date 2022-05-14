import React, {useState, useEffect} from 'react'
import {DOCTOR_ABI, DOCTOR_ADDRESS, PATIENT_ABI, PATIENT_ADDRESS} from "../Config/config"
import Web3 from "web3";

function PatientHistory() {
  
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

  return (
    <div>PatientHistory</div>
  )
}

export default PatientHistory