// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract Patient {
    mapping(address => uint256) patientBalance;
    mapping(address => bool) isExists;
    mapping(address => string[]) prescriptions;
    mapping(address => mapping(address => bool)) authorized;

    modifier checkExistence(address pat) {
        require(isExists[pat], "Patient does not exists");
        _;
    }

    function addPatient(address pat) public {
        require(!isExists[pat], "Patient already exists");
        patientBalance[pat] = 0;
        isExists[pat] = true;
    }

    function addAuthorization(
        address doc,
        address pat,
        uint256 fee
    ) public payable {
        //require(msg.value >= fee, "Amount not sufficient");
        patientBalance[pat] += fee;
        authorized[pat][doc] = true;
    }

    function viewPrescription(address pat)
        public
        view
        returns (string[] memory)
    {
        return prescriptions[pat];
    }

    function setPrescription(
        string memory presc,
        address pat,
        address payable doc,
        uint256 charges
    ) public {
        // require(authorized[pat][doc] == true, "Doctor is not authorized");
        // require(patientBalance[pat] >= charges, "Not sufficent balance");
        // require(bytes(presc).length != 0, "Faulty Prescription");
        prescriptions[pat].push(presc);
        patientBalance[pat] -= charges;
        authorized[pat][doc] = false;
        doc.transfer(charges);
    }

    function isAuthorized(address doc, address pat) public view returns (bool) {
        return authorized[pat][doc];
    }

    function getbalance() public view returns (uint256) {
        return address(this).balance;
    }
}
