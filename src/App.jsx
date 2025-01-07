import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import { Spinner } from "react-bootstrap";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
        // Mocking an image URL for each user for demonstration purposes
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

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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
    </div>
  );
};

export default App;
