import { Container, Form, Button, Alert, Modal, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveExpense, updateExpense } from "../services/ExpenseService";
import "../assets/ExpenceForm.css"; // Import the CSS file

export function ExpenseForm({ editData, onSuccess }) {
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
                await updateExpense(editData.id, formData);
            } else {
                await saveExpense(formData);
            }
            
            setShowSuccessModal(true);
            if (onSuccess) onSuccess();
            
        } catch (error) {
            setError('Failed to save expense');
            console.error(error); 
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/expense-list');
    };

    return (
        <div className="expense-form-container">
            <Container className="mt-4">
                <Card className="expense-form-card">
                    <h2 className="expense-form-title">
                        {editData ? 'Edit Expense' : 'Add New Expense'}
                    </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="expense-form-label">Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                className="expense-form-input"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="expense-form-label">Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="expense-form-input"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="expense-form-label">Source</Form.Label>
                            <Form.Control
                                type="text"
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                                required
                                className="expense-form-input"
                            />
                        </Form.Group>
                        <div className="expense-form-button-group">
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate('/expense-list')}
                                className="expense-form-button"
                            >
                                Back
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit"
                                className="expense-form-button expense-primary-button"
                            >
                                {editData ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className="bg-success text-white">
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Expense {editData ? 'updated' : 'added'} successfully!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}