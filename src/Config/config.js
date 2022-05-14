export const DOCTOR_ADDRESS = "0xf15B9F09faaD9e280Bb665745Bd7aAabdBBecA79";
export const DOCTOR_ABI = [
  {
    constant: false,
    inputs: [{ internalType: "address", name: "doc", type: "address" }],
    name: "addDoctor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "doc", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "updateFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "doc", type: "address" }],
    name: "getFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
export const PATIENT_ADDRESS = "0xB1B58c23371C50E83A39C61059b74d46490829Cc";
export const PATIENT_ABI = [
  {
    constant: false,
    inputs: [{ internalType: "address", name: "pat", type: "address" }],
    name: "addPatient",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "doc", type: "address" },
      { internalType: "address", name: "pat", type: "address" },
      { internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "addAuthorization",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "pat", type: "address" }],
    name: "viewPrescription",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "presc", type: "string" },
      { internalType: "address", name: "pat", type: "address" },
      { internalType: "address payable", name: "doc", type: "address" },
      { internalType: "uint256", name: "charges", type: "uint256" },
    ],
    name: "getPrescription",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "doc", type: "address" },
      { internalType: "address", name: "pat", type: "address" },
    ],
    name: "isAuthorized",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
