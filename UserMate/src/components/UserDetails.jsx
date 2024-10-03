import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../api'; // Importing API function

const UserDetails = () => {
  const { id } = useParams(); // Get user ID from the route params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await fetchUsers(); // Fetch all users
        const foundUser = data.find(user => user.id.toString() === id); // Find user by ID
        setUser(foundUser); // Set user state
        setLoading(false); // Stop loading
      } catch (err) {
        setError('Failed to fetch user details.',err); // Set error message
        setLoading(false); // Stop loading on error
      }
    };

    fetchUserDetails(); // Fetch user details
  }, [id]);

  {/* Loading spinner */}
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div> 
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p> 
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-20 bg-pattern bg-repeat"></div>
      <div className="relative z-10 flex justify-center items-center h-screen">
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg text-center">
          {user ? ( // Check if user data exists
            <>
              <img
                src={`https://i.pravatar.cc/150?u=${user.id}`} // Random user image from Pravatar
                alt={user.name}
                className="mx-auto rounded-full mb-6 w-32 h-32 object-cover shadow-md"
              />
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Details</h2>
              <div className="space-y-4 text-left">
                <div>
                  <strong className="text-gray-600">Name:</strong>
                  <p className="text-lg text-gray-800">{user.name || 'N/A'}</p>
                </div>
                <div>
                  <strong className="text-gray-600">Email:</strong>
                  <p className="text-lg text-gray-800">{user.email || 'N/A'}</p>
                </div>
                <div>
                  <strong className="text-gray-600">Phone:</strong>
                  <p className="text-lg text-gray-800">{user.phone || 'N/A'}</p>
                </div>
                <div>
                  <strong className="text-gray-600">Website:</strong>
                  <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {user.website || 'N/A'}
                  </a>
                </div>
                <div>
                  <strong className="text-gray-600">Company:</strong>
                  <p className="text-lg font-semibold text-gray-800">{user.company?.name || 'N/A'}</p>
                  <p className="text-gray-600">{user.company?.catchPhrase || 'N/A'}</p>
                  <p className="text-gray-600">{user.company?.bs || 'N/A'}</p>
                </div>
                <div>
                  <strong className="text-gray-600">Address:</strong>
                  <p className="text-lg text-gray-800">
                    {user.address?.street}, {user.address?.city}, {user.address?.zipcode}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">User not found.</p> // Message when user not found
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
