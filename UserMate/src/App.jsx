import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import UserDetails from './components/UserDetails';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import UserList from './components/UserList';
// import CreateUser from './components/CreateUser';
// import EditUser from './components/EditUser';
// import UserDetails from './components/UserDetails';
// import { useEffect, useState } from 'react';
// import { fetchUsers, createUser } from './api'; // Import API functions

// const App = () => {
//   const [users, setUsers] = useState([]); // State to hold users
//   const [error, setError] = useState(null); // State for errors

//   // Fetch users on component mount
//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const data = await fetchUsers(); // Fetch users from API
//         setUsers(data);
//       } catch (err) {
//         setError('Failed to fetch users: ' + err.message); // Handle errors
//       }
//     };
//     getUsers();
//   }, []);

//   // Handle user creation
//   const handleCreateUser = async (user) => {
//     try {
//       const newUser = await createUser(user); // Create user via API
//       setUsers((prevUsers) => [...prevUsers, newUser]); // Add new user to state
//     } catch (err) {
//       setError('Failed to create user: ' + err.message); // Handle creation error
//     }
//   };

//   return (
//     <Router>
//       <div className="container mx-auto">
//         {error && <p className="text-red-500">{error}</p>}
//         <Routes>
//           <Route path="/" element={<UserList users={users} />} />
//           <Route path="/create-user" element={<CreateUser onCreateUser={handleCreateUser} />} />
//           <Route path="/edit-user/:id" element={<EditUser />} />
//           <Route path="/user/:id" element={<UserDetails />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
