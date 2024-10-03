import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../api'; // Importing API function


const UserDetails = () => {
  const { id } = useParams(); // Get user ID from the route params
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await fetchUsers(); // Fetch all users
        const user = data.find(user => user.id.toString() === id); // Find the specific user by ID
        setUser(user);
      } catch (err) {
        setError('Failed to fetch user details.',err);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>}
      {user ? (
        <div className="user-details bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
