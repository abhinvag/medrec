const DoctorContract = require("../build/contracts/Doctor.json");
const PatientContract = require("../build/contracts/Patient.json");
const fs = require("fs");

const content = `
export const DOCTOR_ADDRESS = "${
  DoctorContract.networks[1652858638124].address
}";
export const DOCTOR_ABI = ${JSON.stringify(DoctorContract.abi)};
export const PATIENT_ADDRESS = "${
  PatientContract.networks[1652858638124].address
}";
export const PATIENT_ABI = ${JSON.stringify(PatientContract.abi)};
`;

//console.log(DoctorContract.abi);

fs.writeFile("./src/Config/config.js", content, (err) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("Write Suucessfull");
  }
});
