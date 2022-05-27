# Medrec

Medrec is a Decentralized Medical Record Management App

![HomeScreen](https://github.com/wraith-0/medrec/blob/master/assets/home.png)

## Motivation

Medical records need innovation. Patients leave data scattered across various jurisdictions as life events take them away from one provider’s data to another. In doing so, they lose easy access to past data, as the provider, not the patient, generally retains primary stewardship. Patients thus interact with records in a broken manner that reflects the nature of how these records are managed. Patients with a huge medical history across many hospitals should not have to keep their history in the form of huge Patients and providers may face significant hurdles in initiating data retrieval and sharing due to economic incentives that encourage “health information blocking”. In the age of online banking and social media, patients are increasingly willing, able and desirous of managing their data on the web and on the go. However, proposed systems must also recognize that not all provider records can or should be made available to patients (i.e. provider psychotherapy notes or physician intellectual property) and should remain flexible regarding such record-onboarding exceptions. This work explores a blockchain structure with its backend based on a peer-to-peer network using Ethereum for its data storage and a smart contract for its data logic. Medical Records are data with sensitive information, and hence using DAPPS with smart contracts ensures safety features essential such as Zero Downtime (i.e. the data associated with a patient is always ready to be fetched and updated), Privacy (A Patient's data should be secured and of limited accessibility to only the people closely associated with the patient), Complete data integrity (The data must not be changed by someone in no authority to do so). Our MedRec blockchain implementation seeks to solve this vast fragmentation of patient data by bringing it together and organizing it in the form of a ledger while providing it with the benefits provided by blockchain and DAPPs. We organize these references to explicitly create an accessible bread crumb trail for medical history.

## Features

- Anyone can become patient or a doctor.
- Only authorized doctor's can prescribe to a pateint.
- Patient can authorize any doctor, but only after paying his fees via the dapp.
- As soon as doctor prescribes to the patient, his fess gets credited into his account.
- Doctor can update his fees anytime.
- All this logic is taken care by the smart contract, hence completely reliable.
- Patient can view his prescription history in the form of cards.

## How to Run Locally

### Software Requirements

- Node
- Ganache
- Truffle  
- Metamask Extension

### Start Local Blockchain

```
ganache
```

### Compile Contracts

```
truffle migrate 
cd utils 
node helper.js 
```

- Please verify each of deployed contract's address in Config/config.js is similar to that in build folder.

### Start Frontend

```
npm i
npm run start
```

## Tech Used

- React.js
- Web3.js
- Solidity
- Truffle
- Ganache
