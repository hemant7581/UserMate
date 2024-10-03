import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, updateUser } from '../api'; // Importing API functions
import { Link, useLocation } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]); // State to hold user list
  const [editingUser, setEditingUser] = useState(null); // State for currently editing user
  const [error, setError] = useState(null); // State for errors
  const [editedUser, setEditedUser] = useState({ name: '', email: '', phone: '' }); // Editable user details

  const location = useLocation();
  const { user } = location.state || {}; // Retrieve the user data passed from the CreateUser component

  // Fetch all users on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(); // Fetch users from API
        setUsers(data);

        // Check if a new user was passed from the CreateUser component and add it to the list
        if (user) {
          // Assign a temporary ID to the newly added user since it is not persisted in the backend
          const userWithTemporaryId = { ...user, id: Date.now() }; 
          setUsers((prevUsers) => [...prevUsers, userWithTemporaryId]); // Add the new user to the existing users
        }
      } catch (err) {
        setError(`Failed to fetch users: ${err.message}`);
      }
    };
    getUsers();
  }, [user]); // Dependency array includes 'user' so it re-runs if a new user is added

  // Handle edit button click - Set the editing user state
  const onEditClick = (user) => {
    setEditingUser(user); // Set the currently editing user
    setEditedUser({ name: user.name, email: user.email, phone: user.phone }); // Pre-fill form with current user data
  };

  // Handle input changes during editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value }); // Update form state dynamically
  };

  // Handle form submission to save changes
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser.id < 11) {
        // Update existing user via API
        const updatedUser = await updateUser(editingUser.id, editedUser); 
        setUsers(users.map((user) => (user.id === editingUser.id ? updatedUser : user))); // Update user list with new data
      } else {
        // Temporarily update the user locally for the newly created user (ID > 10)
        setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...editedUser } : user)));
      }
      setEditingUser(null); // Reset editing state
    } catch (err) {
      setError(`Failed to update user: ${err.message}`);
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      if (id < 11) {
        await deleteUser(id); // Delete user via API if it has a backend ID
      }
      setUsers(users.filter((user) => user.id !== id)); // Update UI after deletion
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Link to="/create-user" className="text-blue-500">Create New User</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <div key={user.id} className="user-card bg-white p-4 shadow-md rounded-lg">
            {/* Check if the user is currently being edited */}
            {editingUser?.id === user.id ? (
              <form onSubmit={handleSave} className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)} // Cancel editing
                  className="bg-gray-500 text-white py-1 px-3 ml-2 rounded"
                >
                  Cancel
                </button>
              </form>
            ) : (
              // Show user info when not editing
              <>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <div className="flex justify-between mt-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded"
                    onClick={() => onEditClick(user)} // Start editing this user
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 p-1 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
