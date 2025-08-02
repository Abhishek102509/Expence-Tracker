import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, storeToken } from "../services/UserService";
import "../assets/UserLogin.css";

export function UserLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ phone: '', password: '' });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await login(formData);
            if(response.status === 200){
                storeToken(response.data.token);
                navigate("/dashboard");
                toast.success("Welcome back! Login successful");
            }
        } catch (error) {
            console.log(error);
            if(error.response.status === 400){
                toast.error(error.response.data.message);
            }
            else{
                toast.error('Login failed. Please try again.'); 
            }
        }
    }

    const openSignUpForm = () => {
        navigate("/");
    }

    return (
        <div className="login-page-wrapper">
            <Container className="login-container">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xl={4} lg={5} md={6} sm={8} xs={12}>
                        <div className="login-card">
                            <Alert variant="primary" className="text-center login-alert">
                                <div className="app-logo">
                                    <i className="bi bi-currency-dollar"></i>
                                </div>
                                <h2 className="mb-0">Expense Tracker Pro</h2>
                                <p className="mb-0 mt-1 premium-tagline">
                                    Premium Financial Management Solution
                                </p>
                            </Alert>
                            
                            <div className="form-header">
                                <h4 className="mb-0 text-center">Sign In to Your Account</h4>
                                <p className="text-muted text-center mb-0">Track every penny with precision</p>
                            </div>
                            
                            <Form onSubmit={handleSubmit} className="p-4">
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label">Phone Number</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-phone"></i>
                                        </span>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter phone number" 
                                            name="phone" 
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label className="form-label">Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Enter password" 
                                            name="password" 
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                </Form.Group>
                                
                                <div className="d-grid gap-2 mb-3">
                                    <Button variant="primary" type="submit" className="login-button">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        Sign In
                                    </Button>
                                </div>
                                
                                <div className="text-center mt-3">
                                    <p className="text-muted mb-2">New to Expense Tracker Pro?</p>
                                    <Button 
                                        variant="outline-success" 
                                        onClick={openSignUpForm}
                                        className="signup-button"
                                    >
                                        <i className="bi bi-person-plus me-2"></i>
                                        Create Premium Account
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}