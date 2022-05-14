// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.8.0;

//import "./patient.sol";

contract Doctor {
    //address patientContract = 0xA74098e3398EC2f78CdA221D7ec8680e158a0cbF;
    mapping(address => uint256) fee;
    mapping(address => bool) isExists;

    function addDoctor(address doc) public {
        require(!isExists[doc], "Doctor already exists");
        fee[doc] = 0;
        isExists[doc] = true;
    }

    // function addPrescription(
    //     address pat,
    //     address doc,
    //     string memory presc
    // ) public {
    //     require(isExists[doc], "Doctor does not exists");
    //     Patient patient = Patient(patientContract);
    //     uint256 charges = getFee(doc);
    //     patient.getPrescription(presc, pat, payable(doc), charges);
    // }

    // function checkAuthorization(address doc, address pat)
    //     public
    //     view
    //     returns (bool)
    // {
    //     Patient patient = Patient(patientContract);
    //     return patient.isAuthorized(doc, pat);
    // }

    function updateFee(address doc, uint256 amount) public {
        fee[doc] = amount;
    }

    function getFee(address doc) public view returns (uint256) {
        return fee[doc];
    }
}
