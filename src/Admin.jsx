import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./firebase.js";
import SimpleStorage_abi from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";


const auth = getAuth(app);

export const Admin = () => {

    const navigate = useNavigate();
    let contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const url = "http://localhost:8545";

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [currentContractVal, setCurrentContractVal] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    // ---------------------------
    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0]);
                    setConnButtonText("")
                })
                .catch(error => {
                    setErrorMessage(error.message);
                    console.log(error)
                });
        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }
    // update account, will cause component re-render
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        updateEthers();
    }
    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
    }
    // listen for account changes
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);
    // creating provider and contract instance
    const updateEthers = () => {
        const provider = new ethers.providers.JsonRpcProvider(url);
        const contract = new ethers.Contract(contractAddress, SimpleStorage_abi.abi, provider);
        setContract(contract);
        const provider1 = new ethers.providers.Web3Provider(window.ethereum);
        const signer = contract.connect(provider1.getSigner());
        setSigner(signer);
    }
    const changestage = (event) => {
        event.preventDefault();
        var ele = document.getElementsByName('current_stage');
        for (let index = 0; index < ele.length; index++) {
            if (ele[index].checked) {
                let no = parseInt(ele[index].value);
                let sucess = signer.setcurrstage(no);
                console.log(sucess)
            }

        }

    }
    // -----------------------------------
    return (
        <div className="main_parent">
            <nav className="main_nav_container">
                <h1>Welcome Admin</h1>
                <header className="main_header">
                    <button onClick={() => { signOut(auth); navigate('/login'); }} className="main_header_button">Logout</button>
                    <div className="main_header_container">
                        <button onClick={connectWalletHandler} className="main_header_button">{connButtonText}</button>
                        <h4 className="main_header_container_text">{defaultAccount} {errorMessage}</h4>
                    </div>
                </header>
            </nav>
            <section className="main_body">
                <div className='register_form' >
                    <h1 id='stageheading'>Change Voting Stage</h1>
                    <div>
                        <input type="radio" className='radiostage' name="current_stage" value="0" id="reg" />
                        <label htmlFor="reg">Registeration</label><br />
                        <input type="radio" className='radiostage' name="current_stage" value="1" id="vote" />
                        <label htmlFor="vote">Voting</label><br />
                        <input type="radio" className='radiostage' name="current_stage" value="2" id="display" />
                        <label htmlFor="display">Results</label>
                    </div>
                    <button className="buttontag" onClick={changestage} style={{ marginTop: '5em' }}> change stage </button>
                </div>
            </section>
        </div>

    )
}
