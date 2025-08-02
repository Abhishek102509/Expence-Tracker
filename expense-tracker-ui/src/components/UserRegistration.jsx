import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { signUp } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signUpSchema } from "../validation-schemas/SignUpSchema";
import '../assets/UserRegistation.css'

export function UserRegistration() {

    const navigate = useNavigate();

    const initialValues = { name: '', phone: '', password: '', email: '' };

    const handleSubmit = async (formData) => {
        try {
            console.log(formData);
            const response = await signUp(formData);
            //call singnup function using Axios from backend
            console.log(response);
            if (response.status === 200) {
                toast.success("Sign Up Successful")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }

    const redirectToLogin = () => {
        navigate("/login");
    }

    return (
      



          <div className="signup-page-wrapper">
            
            
            <Container className="signup-container">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xl={6} lg={7} md={8} sm={10} xs={12}>
                        <div className="signup-card">
                            <div className="app-header">
                                <h2 className="mb-0 text-center">Expense Tracker</h2>
                            </div>
                            
                            <div className="form-header">
                                <h4 className="mb-0 text-center">Create New Account</h4>
                            </div>
                            
                            <div className="login-redirect">
                                <p>Already have an account? 
                                    <Button variant="link" onClick={redirectToLogin} className="login-link">
                                        Login Now
                                    </Button>
                                </p>
                            </div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={signUpSchema}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    const { errors, touched, isValid, dirty } = formik;
                                    return (
                                        <Form className="p-4">
                                            <Row>
                                                <Col lg={6} md={6} sm={12}>
                                                    <div className="mb-4">
                                                        <label className="form-label">Full Name</label>
                                                        <Field 
                                                            type="text" 
                                                            className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} 
                                                            placeholder="Enter your full name" 
                                                            name="name" 
                                                        />
                                                        <ErrorMessage name="name" component="div" className="error-message"/>
                                                    </div>
                                                </Col>
                                                <Col lg={6} md={6} sm={12}>
                                                    <div className="mb-4">
                                                        <label className="form-label">Phone Number</label>
                                                        <Field 
                                                            type="text" 
                                                            className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`} 
                                                            placeholder="Enter phone number" 
                                                            name="phone" 
                                                        />
                                                        <ErrorMessage name="phone" component="div" className="error-message"/>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={6} md={6} sm={12}>
                                                    <div className="mb-4">
                                                        <label className="form-label">Email</label>
                                                        <Field 
                                                            type="email" 
                                                            className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} 
                                                            placeholder="Enter email address" 
                                                            name="email" 
                                                        />
                                                        <ErrorMessage name="email" component="div" className="error-message"/>
                                                    </div>
                                                </Col>
                                                <Col lg={6} md={6} sm={12}>
                                                    <div className="mb-4">
                                                        <label className="form-label">Password</label>
                                                        <Field 
                                                            type="password" 
                                                            className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} 
                                                            placeholder="Create password" 
                                                            name="password" 
                                                        />
                                                        <ErrorMessage name="password" component="div" className="error-message"/>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="d-grid gap-2 mt-3">
                                                <Button 
                                                    type="submit" 
                                                    className="register-button"
                                                    disabled={!(dirty && isValid)}
                                                >
                                                    Register
                                                </Button>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}