import React from 'react'
import App from './App';
import { NavLink } from "react-router-dom"
import "./App.css";
import './Home.css';

export const Home = () => {
    return (
        <>
            <div className="background"></div>
            <div className="hero_content container">
                <div className="right">
                    <div className="r_details">
                        Let us manage your very own personalized Resume.
                    </div>
                    <button className="buttontag1"> <NavLink to="/login" style={{ textDecoration: 'none' }}>User Login </NavLink></button>
                    <div className="r_desc">
                        Our plan is to built suitable Resume as per the requirements in the the best possible way.
                    </div>
                    
                </div>
            </div>
            </>
            )
}
