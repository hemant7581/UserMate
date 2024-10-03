import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, updateUser } from '../api'; // Importing API functions
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedUser, setEditedUser] = useState({ name: '', email: '', phone: '' });

  const location = useLocation();
  const { user } = location.state || {}; // Retrieve the user data from CreateUser component
  const navigate = useNavigate(); // React Router's navigation hook

  // Fetch all users on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(); // Fetch users from API
        setUsers(data);

        // Add new user if passed from CreateUser component
        if (user) {
          const userWithTemporaryId = { ...user, id: Date.now() }; 
          setUsers((prevUsers) => [...prevUsers, userWithTemporaryId]);
        }
      } catch (err) {
        setError(`Failed to fetch users: ${err.message}`);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    getUsers();
  }, [user]); // Dependency includes 'user'

  // Handle edit button click
  const onEditClick = (user) => {
    setEditingUser(user); // Set the currently editing user
    setEditedUser({ name: user.name, email: user.email, phone: user.phone }); // Pre-fill form
  };

  // Handle input changes during editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value }); // Update form state
  };

  // Handle form submission to save changes
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser.id < 11) {
        const updatedUser = await updateUser(editingUser.id, editedUser); 
        setUsers(users.map((user) => (user.id === editingUser.id ? updatedUser : user))); // Update user list
      } else {
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
        await deleteUser(id); // Delete user via API
      }
      setUsers(users.filter((user) => user.id !== id)); // Update UI after deletion
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);
    }
  };

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );

  // Generate user image based on ID
  const generateUserImage = (user) => {
    return `https://i.pravatar.cc/150?u=${user.id}`;
  };

  // Handle user card click to navigate to user details
  const handleCardClick = (userId) => {
    navigate(`/user/${userId}`); // Navigate to UserDetails page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 relative overflow-hidden p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">User Management</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Link to="/create-user" className="block text-blue-600 font-semibold text-center mb-4 hover:underline">Create New User</Link>
      
      {loading ? (
        <Loader /> // Show loader when fetching users
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="user-card bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              {/* User image */}
              <img
                src={generateUserImage(user)}
                alt={user.name}
                className="rounded-full mb-4 w-24 h-24 object-cover shadow-md"
                onClick={() => handleCardClick(user.id)} // Navigate when card is clicked
              />

              {editingUser?.id === user.id ? ( // Check if editing user
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
                      onClick={(e) => { 
                        e.stopPropagation(); // Prevent navigation
                        onEditClick(user); // Start editing user
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation
                        handleDelete(user.id);
                      }}
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
      )}
    </div>
  );
};

export default UserList;
