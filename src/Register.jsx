import React, { useState, useEffect } from 'react';
import app from "./firebase.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { NavLink, useNavigate } from "react-router-dom";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function Register() {
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/user');
            } else {
                // navigate('/signup');
            }
        });
    }, []);
    const [user, setUser] = useState({ email: "", password: "" });
    let name, value;
    const handleinput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }



    const signupUser = (event) => {
        event.preventDefault();
        const { email, password } = user;
        createUserWithEmailAndPassword(auth, email, password)
            .then((val) => { alert('Signup Successfull'); navigate('/login'); })
            .catch((err) => { alert('Invalid Credentials'); console.log(err) })
    }

    const signupGoogle = (event) => {
        event.preventDefault();
        signInWithPopup(auth, googleProvider);
    }
    return (
        <div className="register_form">
            <h1>Signup Page</h1>
            <form className="register_form">
                <input className="inputtag" type="text" placeholder="Enter Email" name='email' value={user.email} onChange={handleinput} />
                <input className="inputtag" type="password" placeholder="Enter Password" name='password' value={user.password} onChange={handleinput} />
                <button onClick={signupUser} className="buttontag"> Register </button>
                <button onClick={signupGoogle} className="buttontag"> Sign in by Google </button>
                <NavLink to="/login" style={{ textDecoration: 'none' }} ><p className='redirect_login'>Already have an account</p></NavLink>
            </form>
        </div>
    )
}