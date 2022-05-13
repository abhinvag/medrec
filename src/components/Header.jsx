import React, {useState, useEffect} from 'react'
import Web3 from "web3";
import {Navbar, Nav, Container, Button} from 'react-bootstrap'

function Header() {

    const [account, setAccount] = useState("");

    useEffect(() => {
        const addr = sessionStorage.getItem("addr");
        if(addr){
            setAccount(addr);
        }
    }, [])
    

    const connectMetamask = async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.requestAccounts();
        sessionStorage.setItem("addr", accounts[0]);
        setAccount(accounts[0]);
      } else {
        console.log("No MetaMask");
      }
    };
  
    window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
            setAccount("");
            sessionStorage.removeItem("addr");
        } else {
            setAccount(accounts[0]);
        }
    });

  return (
    <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="/">MecRec</Navbar.Brand>
        <Nav className="me-auto">
            {account === "" ? (
                <Button onClick={() => connectMetamask()} variant="outline-light">Connect MetaMask</Button>
            ):(
                <Nav.Link>{account}</Nav.Link>
            )}
        </Nav>
        </Container>
    </Navbar>
  )
}

export default Header