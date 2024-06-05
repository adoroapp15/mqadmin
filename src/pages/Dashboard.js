import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {  Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import CreateCampaign from "../components/CreateCampaign";
import NavImg from '../images/header.png';
import Logo from '../images/logo.png';




const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState('');
    const [redirectToHome, setRedirectToHome] =useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    const handleOnClick = (e) => {
        e.preventDefault()
        let cPage = window.location.pathname.split("/")[2];
        setCurrentPage(cPage)
    }
    
    const signOut = () => {
        sessionStorage.setItem("isLoggin",false)
        sessionStorage.setItem("userId",null)
        setRedirectToHome(true)
    }

    useEffect(() => {

    })

    return (
        <section className="dashboard">
            <CreateCampaign status={show} handleClose={handleClose}/>
            <div className="dashboard-nav">
                <div>
                    <div className="dashboard-logo">
                        <img src={Logo} alt="" />
                    </div>
                    <ul className="dashboard-link" onClick={handleOnClick}>
                        <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/home">Home</NavLink>
                        </li>
                        <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/all-projects">All Projects</NavLink>
                        </li>
                        <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/all-posts">Posts</NavLink>
                        </li>
                        <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/all-contest">Contest</NavLink>
                        </li>

                        <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/all-template">Template</NavLink>
                        </li>
                        <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/all-user">User</NavLink>
                        </li>
                        <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/all-support">Support</NavLink>
                        </li>
                        {/* <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/all-projects">All Blogs</NavLink>
                        </li>
                        <li>
                            <img src="" alt="" />
                            <NavLink to="/dashboard/all-projects">All CaseStudy</NavLink>
                        </li> */}

                        
                    </ul>
                </div>
                <button className="custom-btn" onClick={handleShow}>
                    +  Blog or Casestudy
                </button>
            </div>
            <div className="dashboard-content">
                <Container fluid>
                    <div className="dashboard-header">
                        <div className="dashboard-name">
                            <img src={NavImg} alt="" />
                            <h5>{currentPage === 'home' ? "Home" : "All Projects"}</h5>
                        </div>
                        <div onClick={signOut}>
                            Sign Out
                        </div>
                    </div>
                    <Row>
                        {!redirectToHome ? <Outlet /> : <Navigate to="/" />}
                        
                    </Row>
                </Container>
            </div>

        </section>
    )
}

export default Dashboard;