
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import '../assets/Footer.css'
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { path: "/aboutus", label: "About" },
    { path: "/contactus", label: "Contact" }
  ];
  
  const socialLinks = [
    { icon: <FaYoutube size={20} color="red" />, url: "https://youtube.com/@aabhishekvlog?si=1NB1gm3lXo-tV4B9" },
    { icon: <FaFacebook size={20} color="blue" />, url: "https://www.facebook.com/" },
    { icon: <FaTwitter size={20}  color="black" />, url: "https://x.com/" },
    { icon: <FaInstagram size={20} color=" #e95950" />, url: "https://www.instagram.com/itsabhi_yaduvanshi/?igsh=c2pnaDNrMWxqdDdp&utm_source=qr#" },
    { icon: <FaLinkedin size={20}  color="#0077B5" />, url: "https://www.linkedin.com/in/abhishek-yadav-79a930234" }
  ];

  return (
    <footer className="footer-container  ">
      <Container>
        <Row>
          {/* Quick Links */}
          <Col md={4} className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path}>{link.label}</a>
                </li>
              ))}
            </ul>
          </Col>
          
          {/* Contact Info */}
          <Col md={4} className="footer-section">
            <h4>Contact Us</h4>
            <p>
              <i className="bi bi-geo-alt-fill"></i> CDAC KHARGHAR , MUMBAI
            </p>
            <p>
              <i className="bi bi-telephone-fill"></i> PH NO.: 5578995641
            </p>
            <p>
              <i className="bi bi-envelope-fill"></i> contact@Expencecompany.com
            </p>
          </Col>
          
          {/* Social Media */}
          <Col md={4} className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} ExpenceTracker Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;