import {
    FormikStepper,
    FormikStep,
    InputField
} from "formik-stepper";
import { Field } from "formik";
import "formik-stepper/dist/style.css";
// import * as Yup from "yup";
import axios from "axios";
import { config } from "./Constant";

import { IndustryOptions } from "./IndustryOptions";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserID } from "../actions";


// const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("The First Name field is required"),
//     lastName: Yup.string().required("The First Name field is required"),
//     email: Yup.string()
//         .email("Invalid email")
//         .required("The email field is required"),
//     password: Yup.string().required("The password field is required"),
//     privacy: Yup.boolean().oneOf([true], "You must accept the privacy policy"),
// });



const Form = () => {
    const navigate = useNavigate();

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleGoals = (e) => {
        e.preventDefault();
        var target = e.target;

        var parent = target.parentElement;//parent of "t
        if (e.target.checked) {
            parent.classList.add("selected");
        } else {
            parent.classList.remove("selected");
        }
    }
    const handleEstimation = (e) => {
        const allElements = document.querySelectorAll('.estimation label');
        allElements.forEach((element) => {
            element.classList.remove('selected');
        });
        var target = e.target;
        var parent = target.parentElement;//parent of "t
        parent.classList.add("selected");
    }
    const onSubmit = async (
        
        values,
        { setSubmitting }
    ) => {

        axios.post(`${config.API_URL}/agencySignup`, {...user, ...values}).then(res => {
            if(res.status === 200){
                dispatch(setUserID(res.data.userId))
                sessionStorage.setItem('isLoggin', true)
                sessionStorage.setItem('userId', res.data.userId)
                navigate('/dashboard/home');
            }
        })
        
    };

    return (
        <FormikStepper
            /// Accept all Formik props
            onSubmit={onSubmit} /// onSubmit Function
            initialValues={{
                marketing_budget: "Less than 2 lacs",
                marketing_goals: ["Brand Awareness"],
                privacy: false,
            }}
            // validationSchema={validationSchema}
            withStepperLine={false} /// false as default and If it is false, it hides stepper line
            nextButton={{ label: "Next" }}
            prevButton={{ label: "Back" }}
        // submitButton={{ label: "Done", style: { background: "blue" } }}
        >
            {/*  First Step */}
            <FormikStep>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} sm={12}>
                            <div className="form-header-content">
                                <span>Step 1 of 3</span>
                                <h2 className="stepper-form-heading">What is your estimated monthly marketing budget?</h2>
                                <h6>Select an estimated range</h6>
                            </div>
                            <div role="group" className="estimation" aria-labelledby="my-radio-group" onClick={handleEstimation}>
                                <label className="selected">
                                    <Field type="radio" name="budget" value="Less than 2 lacs" />
                                    Less than 2 lacs
                                </label>
                                <label>
                                    <Field type="radio" name="budget" value="2 lacs - 8 lacs" />
                                    2 lacs - 8 lacs
                                </label>
                                
                                <label>
                                    <Field type="radio" name="budget" value="8 lacs - 50 lacs " />
                                    8 lacs - 50 lacs
                                </label>
                                <label>
                                    <Field type="radio" name="budget" value="50 lacs & above" />
                                    50 lacs & above
                                </label>
                                <label>
                                    <Field type="radio" name="budget" value="Preferred not to disclose" />
                                    Preferred not to disclose
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Container>


            </FormikStep>
            {/* Second Step */}
            <FormikStep>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} sm={12}>
                            <div className="form-header-content">
                                <span>Step 2 of 3</span>
                                <h2>Which Meme formats are you looking for?</h2>

                            </div>
                            <div className="form-meme">
                                <InputField
                                    name="staticMeme"
                                    label="Static Meme"
                                    placeholder="Quantity"
                                    type="text"
                                />
                                <InputField
                                    name="gifMeme"
                                    label="Gif Meme"
                                    type="text"
                                    placeholder="Quantity"
                                />
                                <InputField
                                    name="videoMeme"
                                    label="Video Meme"
                                    type="text"
                                    placeholder="Quantity"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </FormikStep>
            <FormikStep>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} sm={12}>
                            <div className="form-header-content">
                                <span>Step 3 of 3</span>
                                <h2>What are your primary content marketing goals?</h2>
                                <h6>Select your goals</h6>

                            </div>
                            <div className="form-goals" >
                                <div role="group" aria-labelledby="checkbox-group" onChange={(e) => handleGoals(e)}>
                                    <label className="selected">
                                        <Field type="checkbox" name="marketing_goals" value="Brand Awareness" />
                                        Brand Awareness
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="marketing_goals" value="Lead Generation" />
                                        Lead Generation
                                    </label>
                                    <label>
                                        <Field type="checkbox" name="marketing_goals" value="Customer Loyalty" />
                                        Customer Loyalty
                                    </label>
                                </div>
                            </div>

                            <div className="form-campaign">
                                
                            <div className="form-header-content">
                                <h2>Enter Campaign Details</h2>
                            </div>
                            <InputField
                                name="campaignName"
                                placeholder="Campaign Name"
                                type="text"
                            />
                            <Field
                                as="select"
                                name="campaign_industry"
                                placeholder="Choose the industry of your project">
                                {
                                    IndustryOptions.map(i => (
                                        <option value={i.value}>{i.value}</option>
                                    ))
                                }
                            </Field>
                            {/* <SelectField
                                name="industry"
                                placeholder="Choose the industry of your project"
                                options={IndustryOptions}
                            /> */}
                            <Field name="targetAudience" as="textarea" placeholder="What’s your target audience?">

                            </Field>
                            </div>
                            <div className="form-logo">
                            <p>Do you need your logo on design?</p>
                            <div role="group" aria-labelledby="my-radio-group">
                               
                                <label>
                                    <Field type="radio" name="logoDesign" value="true" checked />
                                    Yes
                                </label>
                                <label>
                                    <Field type="radio" name="logoDesign" value="false" />
                                    No
                                </label>
                            </div>
                            <p>Can Designer Use Stock Images?</p>
                            <div role="group" aria-labelledby="my-radio-group">
                                
                                <label>
                                    <Field type="radio" name="stockImages" value="true" checked />
                                    Yes
                                </label>
                                <label>
                                    <Field type="radio" name="stockImages" value="false" />
                                    No
                                </label>
                            </div>
                            <Field name="brandGuidelines" as="textarea" placeholder="Brand Guidelines">

                            </Field>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </FormikStep>
        </FormikStepper>
    );
};

export const StepperForm = () => {
    return(
        <Container>
            <Row>
                <Col sm={12}>
                    <Form />
                </Col>
            </Row>
        </Container>
    )
}
