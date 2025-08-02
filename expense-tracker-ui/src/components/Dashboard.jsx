// import { useEffect, useState } from "react";
// import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
// import { getFinancialSummary } from "../services/DashboardService";
// import { useNavigate } from "react-router-dom";
// import '../assets/Dashboard.css'

// export function Dashboard() {

//     const [summary, setSummary] = useState({
//         total_expense:0,
//         total_income:0,
//         available_balance:0
//     });

//     //summary ===holds the current financial summary in state.
// // setSummary ====updates  state once data is fetched.

//     const getSummary=  async ()=>{
//         try {
//             const response = await getFinancialSummary();
//             if(response.status==200){
//                 setSummary(response.data);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(()=>{
//         getSummary();
//     },[]);

//     const navigate = useNavigate();

//     return (
//         <Container className="mt-4 mb-4">
//             <Alert variant="success">Welcome to expense tracker app</Alert>
//             <Container className="mt-4">
//                 <Row>
//                     <Col lg={4}>
//                         <Card className="text-center">
//                             <Card.Body>
//                                 <Card.Title>
//                                     <Alert variant="success">Total Income</Alert>
//                                 </Card.Title>
//                                 <Card.Text>
//                                     <h5>&#8377; {summary.total_income}</h5>
//                                 </Card.Text>
//                                 <Button  variant="primary"  onClick={() => navigate('/income-list')} >View All</Button>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                     <Col lg={4}>
//                         <Card className="text-center">
//                             <Card.Body>
//                                 <Card.Title>
//                                     <Alert variant="danger">Total Expense</Alert>
//                                 </Card.Title>
//                                 <Card.Text>
//                                     <h5>&#8377; {summary.total_expense}</h5>
//                                 </Card.Text>
//                                 <Button variant="primary"  onClick={() => navigate('/expense-list')}  >View All</Button>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                     <Col lg={4}>
//                         <Card className="text-center">
//                             <Card.Body>
//                                 <Card.Title>
//                                     <Alert variant="primary">Available Balance</Alert>
//                                 </Card.Title>
//                                 <Card.Text>
//                                     <h5>&#8377; {summary.available_balance}</h5>
//                                 </Card.Text>
//                                 <Button variant="primary">View All</Button>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </Container>
//     )
// }






import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { getFinancialSummary } from "../services/DashboardService";
import { useNavigate } from "react-router-dom";
import '../assets/Dashboard.css';

export function Dashboard() {
    const [summary, setSummary] = useState({
        total_expense: 0,
        total_income: 0,
        available_balance: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    const getSummary = async () => {
        try {
            const response = await getFinancialSummary();
            if (response.status === 200) {
                setSummary(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getSummary();
    }, []);

    const navigate = useNavigate();

    return (
        <Container className="mt-4 mb-4 dashboard-container">
            <Alert variant="success" className="welcome-alert">
                <h4>Welcome to Expense Tracker Pro</h4>
                <p className="mb-0">Your financial overview at a glance</p>
            </Alert>
            
            <Container className="mt-5">
                <Row className="g-4">
                    <Col lg={4}>
                        <Card className="text-center financial-card income-card">
                            <div className="card-blur-bg income-bg"></div>
                            <Card.Body className="position-relative">
                                <Card.Title>
                                    <Alert variant="success" className="card-header">Total Income</Alert>
                                </Card.Title>
                                <Card.Text className="my-4">
                                    {isLoading ? (
                                        <div className="loading-spinner"></div>
                                    ) : (
                                        <h3 className="amount-display">&#8377; {summary.total_income.toLocaleString()}</h3>
                                    )}
                                </Card.Text>
                                <Button 
                                    variant="outline-light" 
                                    className="view-all-btn"
                                    onClick={() => navigate('/income-list')}
                                >
                                    View All Transactions
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col lg={4}>
                        <Card className="text-center financial-card expense-card">
                            <div className="card-blur-bg expense-bg"></div>
                            <Card.Body className="position-relative">
                                <Card.Title>
                                    <Alert variant="danger" className="card-header">Total Expense</Alert>
                                </Card.Title>
                                <Card.Text className="my-4">
                                    {isLoading ? (
                                        <div className="loading-spinner"></div>
                                    ) : (
                                        <h3 className="amount-display">&#8377; {summary.total_expense.toLocaleString()}</h3>
                                    )}
                                </Card.Text>
                                <Button 
                                    variant="outline-light" 
                                    className="view-all-btn"
                                    onClick={() => navigate('/expense-list')}
                                >
                                    View All Transactions
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col lg={4}>
                        <Card className="text-center financial-card balance-card">
                            <div className="card-blur-bg balance-bg"></div>
                            <Card.Body className="position-relative">
                                <Card.Title>
                                    <Alert variant="primary" className="card-header">Available Balance</Alert>
                                </Card.Title>
                                <Card.Text className="my-4">
                                    {isLoading ? (
                                        <div className="loading-spinner"></div>
                                    ) : (
                                        <h3 className="amount-display">&#8377; {summary.available_balance.toLocaleString()}</h3>
                                    )}
                                </Card.Text>
                                <Button 
                                    variant="outline-light" 
                                    className="view-all-btn"
                                    onClick={() => navigate('/transactions')}
                                >
                                    View All Transactions
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}