import React from 'react'
import './Home.css';
import pic1 from "./Images/download.jpg";
import pic2 from "./Images/success.png";
import { NavLink } from "react-router-dom"
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  return (
    <>
      <Navbar />
      <div className="background"></div>
      {/* <Navbar /> */}
      <section >
        <div className="hero_content container">
          {/* <!--THE BANNER SECTION --> */}
          <div className="right">
            <NavLink to="/signup" style={{ textDecoration: 'none' }}>
              <button className="try">Try For Free Now! </button>
            </NavLink>
            <div className="r_details">
              Let us manage your very own personalized Resume.
            </div>
            {/* <!--THE EMAIL BOX --> */}
            <div className="email">
              @ <input type="text" placeholder="Your email address" /> <NavLink to="/signup" style={{ textDecoration: 'none' }}> <button className="gs res_hide">  Get Started </button> </NavLink>

            </div>
            <NavLink to="/signup" style={{ textDecoration: 'none' }}> <button className="gs res_show">  Get Started </button> </NavLink>
            {/* <!--THE BRAND DESCRIPTION --> */}
            <div className="r_desc">
              Our plan is to built suitable Resume as per the requirements in the the best possible way.
            </div>
          </div>
          {/* <!--THE EMPLOYEE SECTION--> */}
          <div className="left">
            {/* <!--ADDING EMPLOYEE --> */}
            <div className="add_emp_card">
              <div className="emp_card_heading">
                <p className="addnew">Add New Resume</p>
                <p>Inbox</p>
              </div>
              <div className="employees">
                <div className="emp_details">
                  <div className="image"><img src={pic1} alt="abc" /></div>
                  <p className="name">Jane Williams</p>
                  <span className="role">Full Time &bull;<span className="city"> Los Angels</span></span>
                </div>
              </div>

            </div>
            {/* <!--JOB DETAILS CARD --> */}
            <div className="jobdetails">
              <h4 className="job_heading">Job Details</h4>
              <div className="break"></div>
              <div className="job_desc">
                <div className="jobinner_desc">
                  <p className="job_t"> Job Titles</p>
                  <p className="job_t_field">Designer <img src={pic2} width="20px"
                    alt="" /></p>
                </div>
                <div className="jobinner_desc">
                  <p className="job_t"> Department</p>
                  <p className="job_t_field">UI / UX <img src={pic2} width="20px"
                    alt="" /></p>
                </div>
                <div className="jobinner_desc">
                  <p className="job_t"> Work Location</p>
                  <p className="job_t_field">Los Angels <img src={pic2} width="20px"
                    alt="" /></p>
                </div>

                <div className="jobinner_desc">
                  <p className="job_t"> Category</p>
                  <p className="job_t_field">Independent Contractor <img src={pic2} width="20px"
                    alt="" /></p>
                </div>
                <div className="jobinner_desc">
                  <p className="job_t"> Hire Date</p>

                  <p className="job_t_field">{date} <img src={pic2} width="20px" alt="" /></p>
                </div>

              </div>
            </div>
            {/* <!--PAY CARD --> */}
            <div className="paycard">
              <div className="image">
                <img src={pic1} alt="" />

              </div>
              <div className="profile">
                <p className="name">Jane Williams</p>
                <p className="position">UI Designer</p>
                <p className="rate">$45/hr</p>
              </div>
              <div className="amount_details">
                <p className="total">Total Pay</p>
                <p className="amount">$758</p>
                <p className="status">Paid
                  <img src={pic2} width="15px" alt="" />

                </p>
              </div>
            </div>
            {/* <!--MEDICAL  CARD --> */}
            <div className="medicalcard">
              <p>Create the best resume for you</p>
              <div className="ppo">
                <div className="ppo_details">
                  <p>Congratulations</p>
                  <p>You are Hired</p>
                </div>
                <div className="dot"></div>

              </div>
              <p className="ppo_amount">$</p>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default Home