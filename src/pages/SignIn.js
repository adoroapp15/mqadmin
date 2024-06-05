import React, { useState } from 'react';
// import Logo from '../images/logo.png';
import { Container, Row, Col } from "react-bootstrap";
import 'react-phone-input-2/lib/style.css'
import { Formik, Field, Form } from 'formik';

import axios from 'axios';
import { config } from '../components/Constant';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useDispatch } from 'react-redux';
import { setUser, setUserID} from '../actions';
import OuterHeader from './OuterHeader';


const ToastComp = ({ show,onClose }) => {
    
    return (
        <ToastContainer  position={'top-end'}>
        <Toast show={show.show}  delay={3000} autohide onClose={onClose}>
            <Toast.Header >
                <strong className="me-auto">ALERT</strong>
            </Toast.Header>
            <Toast.Body>{show.msg}</Toast.Body>
        </Toast>
        </ToastContainer>
    )
}
const SignIn = () => {
    const [show, setShow] = useState({ show: false, msg: '' });
    const navigate = useNavigate();
    const toggleShow = () => setShow({show: false, msg:''});


    const dispatch = useDispatch();

    return (
        <section className='get-started'>

            <ToastComp show={show} onClose={toggleShow} />
            <OuterHeader />
            <Container>
                <Row className="justify-content-center">

                    <Col md={6} sm={12}>
                       <div className="form-heading">
                       {/* <h2>Welcome back</h2> */}
                        <h4>Login to your Admin dashboard and start managing and more </h4>
                       </div>
                        <Formik
                            className="contact-us"
                            initialValues={{
                                email: '',
                                password: '',
                                
                            }}
                            onSubmit={async (values) => {
                                console.log(values,"hittting")
                                axios.post(`${config.API_URL}/admin/login`, values).then(res => {
                                    if(res.status === 200){
                                       
                                        // dispatch(setUserID(res.data.userId));
                                        // sessionStorage.setItem('userId', res.data.userId)

                                        sessionStorage.setItem('isLoggin', true)
                                        sessionStorage.setItem('User',values.email)
                                       
                                        navigate("/dashboard/home")
                                       
                                    }else{
                                        setShow({
                                            show: true,
                                            msg: "Incorrect Email and Password"
                                        })
                                    }
                                })
                                .catch((err)=>{alert(err)})
                            }}
                        >
                            <Form>
                                <Field
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    required
                                />

                                
                                <Field
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    required
                                />


                                <button type="submit" className='custom-btn'>Log In</button>
                            </Form>
                        </Formik>


                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default SignIn;