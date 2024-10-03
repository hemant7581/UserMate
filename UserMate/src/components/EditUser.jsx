// src/components/EditUser.js
import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers, updateUser } from '../api'; // Importing API functions

const EditUser = () => {
  const { id } = useParams(); // Extract user ID from URL
  const [user, setUser] = useState({ name: '', email: '', phone: '' }); // User state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to handle async data
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Fetch specific user to edit
    const fetchUser = async () => {
      try {
        const data = await fetchUsers(); // Fetch all users
        const userToEdit = data.find((user) => user.id.toString() === id); // Find the user by ID
        if (userToEdit) {
          setUser(userToEdit); // Set the user data to pre-fill form
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to fetch user data.',err);
      }
      setLoading(false); // Stop loading after fetch is done
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    // Update the user state dynamically as inputs change
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, user); // Send updated user data to API
      navigate('/'); // Redirect to homepage (UserList) after update
    } catch (err) {
      setError('Failed to update user.',err);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading while fetching user data
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error if user not found
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange} // Update state when input changes
          className="input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange} // Update state when input changes
          className="input-field"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange} // Update state when input changes
          className="input-field"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
