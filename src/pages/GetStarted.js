import React, { useState } from 'react';
// import Logo from '../images/logo.png';
import { Container, Row, Col } from "react-bootstrap";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Formik, Field, Form } from 'formik';
import OuterHeader  from './OuterHeader';
import axios from 'axios';
import { config } from '../components/Constant';
import Toast from 'react-bootstrap/Toast';
import { Link, useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useDispatch } from 'react-redux';
import { setUser} from '../actions';


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
const GetStarted = () => {
    const [phone, setPhone] = useState(null);
    const [show, setShow] = useState({ show: false, msg: '' });
    const navigate = useNavigate();
    const toggleShow = () => setShow({show: false, msg:''});


    const dispatch = useDispatch();

    return (
        <section className='get-started'>

            <ToastComp show={show} onClose={toggleShow} />
            <OuterHeader getStarted={true}/>
            <Container>
                <Row className="justify-content-center">

                    <Col md={6} sm={12}>
                    <div className="form-heading">
                        <h2>Get Started</h2>
                        <p>Memes that helps you to  reach the right audience</p>
                        </div>
                        <Formik
                            className="contact-us"
                            initialValues={{
                                first_name: '',
                                last_name: '',
                                email: '',
                                mobileNo: phone
                            }}
                            onSubmit={async (values) => {
                                axios.post(`${config.API_URL}/userExist`, { email: values.email }).then(res => {
                                    if (res.data.status === 500) {

                                        setShow({
                                            show: true,
                                            msg: res.data.msg
                                        })
                                    } else {

                                        let user = {
                                            first_name: values.first_name,
                                            last_name: values.last_name,
                                            email: values.email,
                                            company_name: values.company_name,
                                            mobileNo: phone,
                                            password: values.password,
                                            isAllowed: true
                                        }

                                        sessionStorage.setItem('isLoggin',true)
                                        dispatch(setUser(user))
                                        navigate('/info');
                                    }
                                })
                            }}
                        >
                            <Form>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <Field name="first_name" placeholder="First Name" required />
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <Field name="last_name" placeholder="Last Name" required />
                                    </Col>

                                </Row>
                                <Field name="company_name" placeholder="Company Name" required />
                                <PhoneInput
                                    inputProps={{
                                        name: 'mobileNo',
                                        required: true,
                                    }}
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                />
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


                                <button type="submit" className='custom-btn'>Continue</button>
                            </Form>
                        </Formik>

                       <div className='form-bottom text-center mt-4'>
                       <p>By signing up you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></p>
                       </div>
                    </Col>
                </Row>

            </Container>
        </section>
    )
}

export default GetStarted;