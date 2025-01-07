import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const UserCard = ({ user, onUpdate, onDelete }) => {
  const [show, setShow] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [liked, setLiked] = useState(false);

  // Generate a unique avatar URL using the user's id or name as the seed
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id || user.name}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editedUser); // Save updated user info
    setShow(false); // Close modal
  };

  // Function to handle nested field changes (address and company)
  const handleNestedInputChange = (e, field, subField) => {
    const { value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: {
        ...prevUser[field],
        [subField]: value,
      },
    }));
  };

  return (
    <>
      {/* User Card */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card user-card">
          <img
            src={avatarUrl} // Use dynamic avatar URL
            className="card-img-top"
            alt={`${user.name}'s avatar`}
          />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">
              <strong>Email:</strong> {user.email} <br />
              <strong>Phone:</strong> {user.phone} <br />
              <strong>Address:</strong> {user.address.street}, {user.address.city} <br />
              <strong>Company:</strong> {user.company.name} <br />
            </p>
            <div className="d-flex justify-content-between">
              {/* Like Button with Icon */}
              <button
                className="btn btn-outline-danger"
                onClick={() => setLiked(!liked)}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  color={liked ? "red" : "gray"} // Filled red when liked
                  size="lg"
                />
              </button>

              {/* Edit Button */}
              <button
                className="btn btn-outline-primary"
                onClick={() => setShow(true)}
              >
                Edit📝
              </button>

              {/* Delete Button with Icon */}
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(user.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name Field */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Phone Field */}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Address - Street Field */}
            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={editedUser.address.street}
                onChange={(e) =>
                  handleNestedInputChange(e, "address", "street")
                }
              />
            </Form.Group>

            {/* Address - City Field */}
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={editedUser.address.city}
                onChange={(e) =>
                  handleNestedInputChange(e, "address", "city")
                }
              />
            </Form.Group>

            {/* Company Field */}
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={editedUser.company.name}
                onChange={(e) =>
                  handleNestedInputChange(e, "company", "name")
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCard;
