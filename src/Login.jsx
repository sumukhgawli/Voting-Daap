import app from "./firebase.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup , onAuthStateChanged} from "firebase/auth"
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState ,useEffect } from 'react'

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });
    let name, value;
    const handleinput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/user');
            } else {
                // navigate('/signup');
            }
        });
    }, []);
    const signupUser = (event) => {
        event.preventDefault();
        const { email, password } = user;
        signInWithEmailAndPassword(auth, email, password)
            .then((val) => { alert('Signin Successfull'); navigate('/user'); })
            .catch((err) => { alert('Invalid Credentials'); console.log(err) })
    }
    const signinGoogle = (event) => {
        event.preventDefault();
        signInWithPopup(auth, googleProvider);
    }
    return (
        <div className="register_form">
            <h1>login Page</h1>
            <form className="register_form">

                <input className="inputtag" type="text" placeholder="Enter Email" name='email' value={user.email} onChange={handleinput} />
                <input className="inputtag" type="password" placeholder="Enter Password" name='password' value={user.password} onChange={handleinput} />
                <button onClick={signupUser} className="buttontag"> Login </button>
                <button onClick={signinGoogle} className="buttontag"> Sign in by Google </button>
                <NavLink to="/signup" style={{ textDecoration: 'none' }} ><p className='redirect_login'>Create an account</p></NavLink>
            </form>
        </div>
    )
}

