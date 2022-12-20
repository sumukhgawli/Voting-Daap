import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./firebase.js";
import SimpleStorage_abi from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./App.css";

const auth = getAuth(app);

function App() {
	const navigate = useNavigate();

	let contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	const url = "http://localhost:8545";

	const [pagename, setpagename] = useState("WELCOME");
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [currentContractVal, setCurrentContractVal] = useState("Show Winner");
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
	const [username, setusername] = useState("");
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if (user.displayName == "314 SUMUKH GAWLI") { navigate('/admin'); }
				else {
					if (user.displayName) { setusername(user.displayName) }
					else { setusername(user.email) }
				}
			} else { navigate('/login'); }
		});
	}, []);
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
	const setHandler = (event) => {
		event.preventDefault();
		const addr = document.getElementById("setText1");
		const age = document.getElementById("setText2");
		let sucess = signer.registervoter(addr.value, age.value);
		console.log(sucess)
	}
	const votehandler = (event) => {
		event.preventDefault();
		const addr = document.getElementById("setText1");
		var ele = document.getElementsByName('current_candidate');
		for (let index = 0; index < ele.length; index++) {
			if (ele[index].checked) {
				let no = ele[index].value;
				let sucess = signer.vote(addr.value, no);
				console.log(sucess)
			}
		}
	}
	const getCurrentVal = async () => {
		const provider = new ethers.providers.JsonRpcProvider(url);
		const contract = new ethers.Contract(contractAddress, SimpleStorage_abi.abi, provider);
		let val = await contract.display();
		setCurrentContractVal("Winner : " + val);
	}
	const changestage = (event) => {
		event.preventDefault();
		const index = document.getElementById("setText4");
		let sucess = signer.setcurrstage(index.value);
		console.log(sucess)
	}
	const fun1 = () => {
		setpagename("REGISTER")
	}
	const fun2 = () => {
		setpagename("VOTE")
	}
	const fun3 = () => {
		setpagename("RESULTS")
	}
	const PageContent = () => {
		if (pagename == "REGISTER") {
			return <>
				<h1>REGISTER</h1>
				<form className="register_form">
					<input id="setText1" className="inputtag" type="text" placeholder="Adhaar Number" />
					<input id="setText2" className="inputtag" type="number" placeholder="Age " />
					<button onClick={setHandler} className="buttontag"> Register </button>
				</form>
			</>;
		} else if (pagename == "VOTE") {
			return <>
				<h1>VOTE</h1>
				<form className="register_form">
					<input id="setText1" className="inputtag" type="text" placeholder="Adhaar Number" />
					<div>
						<input type="radio" className='radiostage' name="current_candidate" value="tcsc" id="tcsc" />
						<label htmlFor="tcsc">TCSC</label><br />
						<input type="radio" className='radiostage' name="current_candidate" value="tcet" id="tcet" />
						<label htmlFor="tcet">TCET</label>
					</div>
					<button onClick={votehandler} className="buttontag"> Vote </button>
				</form>
			</>;
		} else if (pagename == "WELCOME") {
			return <>
				<h1>WELCOME {username}</h1>
				<ol>
					<li>Connect Wallet</li>
					<li>Register as a voter </li>
					<li>Vote the candidate</li>
					<li>Check Results</li>
				</ol>
			</>;
		}
		else {
			return <>
				<h1>RESULTS</h1>
				<button onClick={getCurrentVal} className="buttontag">{currentContractVal}</button>
			</>;
		}

	}


	return (
		<div className="main_parent">
			<nav className="main_nav_container">
				<ul>
					<li onClick={fun1}>REGISTER</li>
					<li onClick={fun2}>VOTE </li>
					<li onClick={fun3}>RESULTS </li>

				</ul>
				<header className="main_header">
					<button onClick={() => { signOut(auth); navigate('/login'); }} className="main_header_button">Logout</button>
					<div className="main_header_container">

						<button onClick={connectWalletHandler} className="main_header_button">{connButtonText}</button>
						<h4 className="main_header_container_text">{defaultAccount} {errorMessage}</h4>
					</div>
				</header>
			</nav>
			<section className="main_body">
				<PageContent />
			</section>

		</div>
	);
}

export default App;
