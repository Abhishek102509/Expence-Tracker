

import { Container, Table, Button, Alert, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { IncomeForm } from "./IncomeForm";
import { deleteIncome, getIncomes } from "../services/IncomeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faRupeeSign, 
  faCalendarAlt,
  faMoneyBillWave 
} from "@fortawesome/free-solid-svg-icons";
import "../assets/IncomList.css"

export function IncomeList() {
    const [incomes, setIncomes] = useState([]);
    const [error, setError] = useState('');
    const [editData, setEditData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [incomeToDelete, setIncomeToDelete] = useState(null);

    const loadIncomes = async () => {
        try {
            const response = await getIncomes();
            setIncomes(response.data);
        } catch (error) {
            setError('Failed to load incomes');
            console.error(error);
        }
    };

    useEffect(() => {
        loadIncomes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteIncome(id);
            loadIncomes();
        } catch (error) {
            setError('Failed to delete income');
            console.error(error);
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleEdit = (income) => {
        setEditData(income);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditData(null);
        loadIncomes();
    };

    const confirmDelete = (id) => {
        setIncomeToDelete(id);
        setShowDeleteModal(true);
    };

    return (
        <div className="income-list-container">
            {/* Blurred background effect */}
            <div className="blurred-bg"></div>
            
            <Container className="mt-4 content-overlay">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="page-title">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                        Income Transactions
                    </h2>
                    <Button 
                        variant="primary" 
                        onClick={() => setShowForm(true)} 
                        className="add-income-btn"
                    >
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add New Income
                    </Button>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                {showForm && (
                    <IncomeForm 
                        editData={editData} 
                        onSuccess={handleFormSuccess} 
                        onCancel={() => {
                            setShowForm(false);
                            setEditData(null);
                        }}
                    />
                )}

                <div className="table-responsive">
                    <Table striped bordered hover className="income-table">
                        <thead className="table-header">
                            <tr>
                                <th><FontAwesomeIcon icon={faRupeeSign} className="me-2" />Amount</th>
                                <th><FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Date</th>
                                <th>Source</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomes.map((income) => (
                                <tr key={income.id} className="table-row">
                                    <td className="amount-cell">₹{income.amount.toLocaleString()}</td>
                                    <td>{new Date(income.txn_date).toLocaleDateString()}</td>
                                    <td>{income.source}</td>
                                    <td className="actions-cell">
                                        <Button 
                                            variant="outline-warning" 
                                            size="sm" 
                                            onClick={() => handleEdit(income)}
                                            className="me-2 action-btn"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm" 
                                            onClick={() => confirmDelete(income.id)}
                                            className="action-btn"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton className="modal-header">
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this income record?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(incomeToDelete)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}