import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../services/UserService";

export function NavigationBar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    }

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/dashboard">
                            <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/income-form">
                            <Nav.Link>Record Income</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/income-list">
                            <Nav.Link>View All Incomes</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/expense-form">
                            <Nav.Link>Record Expense</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/expense-list">
                            <Nav.Link>View All Expenses</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/aboutus">
                            <Nav.Link>AboutUS</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contactus">
                            <Nav.Link>ContactUs</Nav.Link>
                        </LinkContainer>
                       


                    </Nav>
                    <Button variant="success" onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}