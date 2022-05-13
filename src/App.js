import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      const web3 = new Web3("http://127.0.0.1:8545");
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    fetchAccount();
  }, []);

  return (
    <div className="App">
      <div>{account}</div>
    </div>
  );
}

export default App;
