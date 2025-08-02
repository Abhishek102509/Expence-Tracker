// import { Container, Table, Button, Alert } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { ExpenseForm } from "./ExpenseForm";
// import { deleteExpense, getExpenses } from "../services/ExpenseService";

// export function ExpenseList() {
//     const [expenses, setExpenses] = useState([]);
//     const [error, setError] = useState('');
//     const [editData, setEditData] = useState(null);
//     const [showForm, setShowForm] = useState(false);

//     const loadExpenses = async () => {
//         try {
//             const response = await getExpenses();
//             setExpenses(response.data);
//         } catch (error) {
//             setError('Failed to load expenses');
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         loadExpenses();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await deleteExpense(id);
//             loadExpenses();
//         } catch (error) {
//             setError('Failed to delete expense');
//             console.error(error);
//         }
//     };

//     const handleEdit = (expense) => {
//         setEditData(expense);
//         setShowForm(true);
//     };

//     const handleFormSuccess = () => {
//         setShowForm(false);
//         setEditData(null);
//         loadExpenses();
//     };

//     return (
//         <Container className="mt-4">
//             <h2>Expense List</h2>

            
//             <Button variant="primary" onClick={() => setShowForm(true)} className="mb-3">
//                 Add New Expense
//             </Button>

//             {showForm && (
//                 <ExpenseForm 
//                     editData={editData} 
//                     onSuccess={handleFormSuccess} 
//                     onCancel={() => {
//                         setShowForm(false);
//                         setEditData(null);
//                     }}
//                 />
//             )}

//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Amount</th>
//                         <th>Date</th>
//                         <th>Source</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {expenses.map((expense) => (
//                         <tr key={expense.id}>
//                             <td>{expense.amount}</td>
//                             <td>{expense.txn_date}</td>
//                             <td>{expense.source}</td>
//                             <td>
//                                 <Button 
//                                     variant="warning" 
//                                     size="sm" 
//                                     onClick={() => handleEdit(expense)}
//                                     className="me-2"
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button 
//                                     variant="danger" 
//                                     size="sm" 
//                                     onClick={() => handleDelete(expense.id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// }




import { Container, Table, Button, Alert, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { deleteExpense, getExpenses } from "../services/ExpenseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faMoneyBillWave, 
  faCalendarAlt,
  faReceipt
} from "@fortawesome/free-solid-svg-icons";
import "../assets/ExpenceList.css";

export function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState('');
    const [editData, setEditData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    const loadExpenses = async () => {
        try {
            const response = await getExpenses();
            setExpenses(response.data);
        } catch (error) {
            setError('Failed to load expenses');
            console.error(error);
        }
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            loadExpenses();
        } catch (error) {
            setError('Failed to delete expense');
            console.error(error);
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleEdit = (expense) => {
        setEditData(expense);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditData(null);
        loadExpenses();
    };

    const confirmDelete = (id) => {
        setExpenseToDelete(id);
        setShowDeleteModal(true);
    };

    return (
        <div className="expense-list-container">
            {/* Blurred background effect */}
            <div className="expense-blurred-bg"></div>
            
            <Container className="expense-content-overlay">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="expense-page-title">
                        <FontAwesomeIcon icon={faReceipt} className="me-2" />
                        Expense Tracker
                    </h2>
                    <Button 
                        variant="primary" 
                        onClick={() => setShowForm(true)} 
                        className="add-expense-btn"
                    >
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add New Expense
                    </Button>
                </div>

                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                        {error}
                    </Alert>
                )}

                {showForm && (
                    <ExpenseForm 
                        editData={editData} 
                        onSuccess={handleFormSuccess} 
                        onCancel={() => {
                            setShowForm(false);
                            setEditData(null);
                        }}
                    />
                )}

                {expenses.length === 0 ? (
                    <div className="empty-expense-state">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="empty-expense-icon" />
                        <h4>No expenses recorded yet</h4>
                        <p className="text-muted">Start tracking your expenses to see them here</p>
                        <Button 
                            variant="primary" 
                            onClick={() => setShowForm(true)}
                            className="add-expense-btn"
                        >
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add Your First Expense
                        </Button>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <Table striped bordered hover className="expense-table">
                            <thead className="expense-table-header">
                                <tr>
                                    <th><FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />Amount</th>
                                    <th><FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Date</th>
                                    <th>Source</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense) => (
                                    <tr key={expense.id} className="expense-table-row">
                                        <td className="expense-amount-cell">₹{expense.amount.toLocaleString()}</td>
                                        <td>{new Date(expense.txn_date).toLocaleDateString()}</td>
                                        <td>{expense.source}</td>
                                        <td className="expense-actions-cell">
                                            <Button 
                                                variant="outline-warning" 
                                                size="sm" 
                                                onClick={() => handleEdit(expense)}
                                                className="me-2 expense-action-btn"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm" 
                                                onClick={() => confirmDelete(expense.id)}
                                                className="expense-action-btn"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton className="delete-modal-header">
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this expense record? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(expenseToDelete)}>
                            <FontAwesomeIcon icon={faTrash} className="me-2" />
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}