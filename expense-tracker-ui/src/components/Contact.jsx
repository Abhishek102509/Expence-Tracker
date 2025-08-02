import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import '../assets/ContactUs.css';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted! We will contact you soon.');
  };

  return (
    <div className="contact-background">
      <Container className="my-5">
        <h1 className="text-center mb-5 contact-title">Contact Us</h1>

        <Row>
          {/* Contact Information Column */}
          <Col md={5} className="mb-4">
            <div className="contact-card p-4 rounded shadow">
              <h3 className="mb-4 contact-card-title">Our Information</h3>

              <div className="d-flex mb-3 contact-info-item">
                <FaMapMarkerAlt className="mt-1 me-3 contact-icon" size={20} />
                <div>
                  <h5>Address</h5>
                  <p>CDAC KHARGHAR<br />MUMBAI</p>
                </div>
              </div>

              <div className="d-flex mb-3 contact-info-item">
                <FaPhone className="mt-1 me-3 contact-icon" size={20} />
                <div>
                  <h5>Phone</h5>
                  <p>+91 9076504598</p>
                </div>
              </div>

              <div className="d-flex mb-3 contact-info-item">
                <FaEnvelope className="mt-1 me-3 contact-icon" size={20} />
                <div>
                  <h5>Email</h5>
                  <p>cdackharghar@gmail.com</p>
                </div>
              </div>

             
            </div>
          </Col>

          {/* Contact Form Column */}
          <Col md={7}>
            <div className="contact-card p-4 rounded shadow">
              <h3 className="mb-4 contact-card-title">Send Us a Message</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your name" 
                    required 
                    className="contact-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    required 
                    className="contact-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                    type="tel" 
                    placeholder="Enter phone number" 
                    className="contact-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Enter your message" 
                    required 
                    className="contact-input"
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="contact-submit-btn w-100 py-2"
                >
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;