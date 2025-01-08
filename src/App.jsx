import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import { Button, Modal, Form, Spinner } from "react-bootstrap";


const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false); // State to control Add User modal
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: { street: "", city: "" },
    company: { name: "" },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
        const usersWithImages = data.map((user) => ({
          ...user,
          imageUrl: `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg`,
        }));
        setUsers(usersWithImages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  const handleAddUser = () => {
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1; // Generate a new ID
    const userToAdd = { ...newUser, id };
    setUsers([...users, userToAdd]);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      address: { street: "", city: "" },
      company: { name: "" },
    }); // Reset the form
    setShowAddModal(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleNestedInputChange = (e, field, subField) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: {
        ...prevUser[field],
        [subField]: value,
      },
    }));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h1 className="fw-bold bg-success border border-dark rounded text-white p-2 ">Connectify</h1>
        <Button variant="success" onClick={() => setShowAddModal(true)} className="text-white border border-danger" >
          Add New User ➕
        </Button>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div className="col-md-3 mb-4" key={user.id}>
              <UserCard user={user} onUpdate={handleUpdate} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={newUser.address.street}
                onChange={(e) => handleNestedInputChange(e, "address", "street")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={newUser.address.city}
                onChange={(e) => handleNestedInputChange(e, "address", "city")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={newUser.company.name}
                onChange={(e) => handleNestedInputChange(e, "company", "name")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
