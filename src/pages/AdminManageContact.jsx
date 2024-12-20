import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { deleteContactAPI, getAllContactAPI, updateContactStatusAPI } from '../services/allApi';

const AdminManageContact = () => {

    const [contacts, setContacts] = useState([]);
    const [show, setShow] = useState(false);
    // console.log(contacts);
    const [currentContact, setCurrentContact] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        fetchAllContact()
    }, [])

    const handleClose = () => {
        setShow(false);
        setCurrentContact(null);
    }
    const handleShow = (contact) => {
        setCurrentContact(contact); 
        setNewStatus(contact.status); 
        setShow(true);
    }

    const fetchAllContact = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllContactAPI(reqHeader)
                if (result.status == 200) {
                    setContacts(result.data)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }

     const handleUpdateStatus = async () => {
            const token = sessionStorage.getItem('token');
            if (token) 
            {
                const reqHeader = { Authorization: `Bearer ${token}` };
                const reqBody = { status: newStatus };
                try
                {
                    const result=await updateContactStatusAPI(currentContact._id,reqBody,reqHeader)
                    if(result.status==200)
                    {
                        alert("Status Updated succesfully")
                        fetchAllContact()
                        handleClose();
                    }
                }
                catch(err)
                {
                    console.log(err);
                    
                }
            }
    }
     const deleteContacts=async(id)=>{
            const token=sessionStorage.getItem("token")
            if(token)
            {
                const reqHeader={Authorization:`Bearer ${token}`}
                try
                {
                    await deleteContactAPI(id,reqHeader)
                    fetchAllContact()
                }
                catch(err)
                {
                    console.log(err)
                }
            }
        }
        const toggleSidebar = () => {
            setCollapsed(!collapsed); // Toggle the collapsed state
        };
    return (
        <>
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                <AdminHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <div className="flex-grow-1 p-4 bg-light"  style={{
                        marginLeft: collapsed ? '70px' : '250px', // Change margin based on collapsed state
                        transition: 'margin-left 0.3s ease', // Smooth transition for margin
                    }} >
                    <h1 className="text-center text-primary">Manage Contact</h1>
                    <div className="table-responsive">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">No contact messages available</td>
                                    </tr>
                                ) : (
                                    contacts.map((contact, index) => (
                                        <tr key={contact._id}>
                                            <td>{index + 1}</td>
                                            <td>{contact.username}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.message}</td>
                                            <td>{contact.status}</td>
                                            <td>
                                                <Button variant="primary" onClick={()=>handleShow(contact)} className="btn-md mx-1">
                                                    Edit Status
                                                </Button>
                                                <Button onClick={()=>deleteContacts(contact._id)} variant="danger" className="btn-md mx-1">
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Contact Status</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Contact Status</Form.Label>
                                        <Form.Select  value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary"  onClick={handleClose}>
                                    Close
                                </Button>
                                <Button onClick={handleUpdateStatus}  variant="primary" >
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
        </>
    )
}

export default AdminManageContact