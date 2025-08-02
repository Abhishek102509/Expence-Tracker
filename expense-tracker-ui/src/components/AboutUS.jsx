import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../assets/AboutUs.css';
import AbhishekImage from './Abhishek.jpg';
import AnjaliImage from './Anjali.jpg';
import AmanImage from './Aman.jpg';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-success mb-3">Our Team</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
            We're a passionate team dedicated to building amazing experiences. 
            Our diverse skills come together to create something truly special.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {/* Team Member 1 */}
          <Col lg={4} md={6}>
            <Card className="team-card h-100 border-0 shadow-sm  ">
              <div className="team-img-container mx-auto mt-4">
                <Card.Img 
                  variant="top" 
                
                  src={AbhishekImage}

                  alt="Abhishek Yadav"
                  className="rounded-circle"
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-bold fs-5 mb-1">ABHISHEK YADAV</Card.Title>
                <Card.Text className="text-secondary mb-3">FRONTEND DEVELOPER</Card.Text>
                <div className="social-links d-flex justify-content-center gap-3">


                  <a href="https://www.linkedin.com/in/abhishek-yadav-79a930234" className="text-primary"  target="_blank" rel="noopener noreferrer" ><FaLinkedin size={20} /></a>
                  <a href="https://github.com/Abhishek102509" target="_blank" className="text-dark"><FaGithub size={20} /></a>
                  <a href="https://www.instagram.com/itsabhi_yaduvanshi/?igsh=c2pnaDNrMWxqdDdp&utm_source=qr#"  target="_blank"  className="text-danger"><FaInstagram size={20} /></a>
                  <a href="https://www.youtube.com/@AAbhishekVlog" className="text-danger"  target="_blank" rel="noopener noreferrer" ><FaYoutube size={20} /></a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Team Member 2 */}
          <Col lg={4} md={6}>
            <Card className="team-card h-100 border-0 shadow-sm">
              <div className="team-img-container mx-auto mt-4">
                <Card.Img 
                  variant="top" 
                 src={AmanImage}
                  alt="Aman Sharma"
                  className="rounded-circle"
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-bold fs-5 mb-1">AMAN SHARMA</Card.Title>
                <Card.Text className="text-secondary mb-3">BACKEND DEVELOPER</Card.Text>
                <div className="social-links d-flex justify-content-center gap-3">
                  <a href="https://www.linkedin.com/in/aman-sharma-54875a203?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app " target="_blank" className="text-primary"><FaLinkedin size={20} /></a>
                  <a href="https://github.com/AmanSharma202" target="_blank" className="text-dark"><FaGithub size={20} /></a>
                  <a href="https://www.instagram.com/__devilscaf__jay/" target="_blank" className="text-danger"><FaInstagram size={20} /></a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Team Member 3 */}
          <Col lg={4} md={6}>
            <Card className="team-card h-100 border-0 shadow-sm">
              <div className="team-img-container mx-auto mt-4">
                <Card.Img 
                  variant="top" 
               
                  src={AnjaliImage}
                  alt="Anjali Pal"
                  className="rounded-circle"
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-bold fs-5 mb-1">ANJALI PAL</Card.Title>
                <Card.Text className="text-secondary mb-3">DATABASE DEVELOPER </Card.Text>
                <div className="social-links d-flex justify-content-center gap-3">
                  <a href="https://www.linkedin.com/in/anjali-pal-131a71149?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " target="_blank" className="text-primary"><FaLinkedin size={20} /></a>
                  <a href="https://github.com/Anjalipal99" target="_blank" className="text-dark"><FaGithub size={20} /></a>
                  <a href="#" target="_blank"className="text-danger"><FaInstagram size={20} /></a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;