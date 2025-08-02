// import { Container, Form, Button, Alert, Modal } from "react-bootstrap";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { saveIncome, updateIncome } from "../services/IncomeService";
// import "../assets/IncomForm.css";

// export function IncomeForm({ editData, onSuccess }) {
//     const [formData, setFormData] = useState(editData || {
//         amount: '',
//         date: '',
//         source: ''
//     });
//     const [error, setError] = useState('');
//      const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editData) {
//                 await updateIncome(editData.id, formData);
//             } else {
//                 await saveIncome(formData);
//             }
//             setShowSuccessModal(true); // Show success popup
//             if (onSuccess) onSuccess();
//         } catch (error) {
//             setError('Failed to save income');
//             console.error(error);
//         }
//     };


//      const handleCloseModal = () => {
//         setShowSuccessModal(false);
//         // navigate somewhere after closing
//         navigate('/Income-list');
//     };

//     return (
//         <>
//         <Container className="mt-4 income-form-container">
//             <h2>{editData ? 'Edit Income' : 'Add New Income'}</h2>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Amount</Form.Label>
//                     <Form.Control
//                         type="number"
//                         name="amount"
//                         value={formData.amount}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Date</Form.Label>
//                     <Form.Control
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Source</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="source"
//                         value={formData.source}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                     {editData ? 'Update' : 'Save'}
//                 </Button>
//             </Form>
//         </Container>

// <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
//                 <Modal.Header closeButton className="bg-success text-white">
//                     <Modal.Title>Success!</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>Income {editData ? 'updated' : 'added'} successfully!</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="success" onClick={handleCloseModal}>
//                         OK
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
// </>
//     );
// }




import { Container, Form, Button, Alert, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveIncome, updateIncome } from "../services/IncomeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMoneyBillWave, faCalendarDay, faWallet } from "@fortawesome/free-solid-svg-icons";
import "../assets/IncomForm.css";

export function IncomeForm({ editData, onSuccess, onCancel }) {
    const [formData, setFormData] = useState(editData || {
        amount: '',
        date: '',
        source: ''
    });
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editData) {
                await updateIncome(editData.id, formData);
            } else {
                await saveIncome(formData);
            }
            setShowSuccessModal(true);
            if (onSuccess) onSuccess();
        } catch (error) {
            setError('Failed to save income');
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/income-list');
    };

    return (
        <div className="income-form-wrapper">
            {/* Blurred background */}
            <div className="income-form-bg"></div>
            
            <Container className="income-form-container">
                <h2 className="income-form-title">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                    {editData ? 'Edit Income' : 'Add New Income'}
                </h2>
                
                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label className="income-form-label">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                            Amount
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="income-form-control"
                            placeholder="Enter amount"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="income-form-label">
                            <FontAwesomeIcon icon={faCalendarDay} className="me-2" />
                            Date
                        </Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="income-form-control"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="income-form-label">
                            <FontAwesomeIcon icon={faWallet} className="me-2" />
                            Source
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="income-form-control"
                            placeholder="Salary, Freelance, etc."
                            required
                        />
                    </Form.Group>

                    <div className="d-flex gap-3">
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="income-form-btn"
                        >
                            {editData ? 'Update Income' : 'Add Income'}
                        </Button>
                        
                        {onCancel && (
                            <Button 
                                variant="outline-secondary" 
                                onClick={onCancel}
                                className="income-form-btn"
                                style={{
                                    background: "white",
                                    border: "1px solid #4facfe",
                                    color: "#4facfe"
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </Form>
            </Container>

            {/* Success Modal */}
            <Modal 
                show={showSuccessModal} 
                onHide={handleCloseModal} 
                centered
                contentClassName="success-modal-content"
            >
                <Modal.Header closeButton className="success-modal-header text-white">
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="success-modal-body">
                    <FontAwesomeIcon icon={faCheckCircle} className="success-modal-icon" />
                    <h4>Income {editData ? 'Updated' : 'Added'} Successfully!</h4>
                    <p>Your income record has been {editData ? 'updated' : 'added'} to your financial overview.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={handleCloseModal}
                        className="success-modal-btn"
                    >
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}