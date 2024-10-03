import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api';


const CreateUser = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically



  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const newUser = { name, email, phone };
    //   console.log(newUser)
    //   await createUser(newUser); // Call the passed `handleCreateUser` function
    //   setSuccess(true);
    //   setTimeout(() => navigate('/'), 1500); // Redirect to homepage after 1.5 seconds
    // } catch (err) {
    //   setError('Failed to create user: ' + err.message);
    // }

    try{
      const newUser = {name , email, phone};
      const createdUser = await createUser(newUser); //Create the user via API
      setSuccess(true);
      navigate('/',{state:{user: createdUser}}); //Pass the user data to UserDetail components
}catch(err){
  setError('Failed to create user: ' + err.message);
}
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create User</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">User created successfully! Redirecting...</p>}
      <form onSubmit={handleSubmit} className="space-y-4 space-x-3 ">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state on input change
          className="input-field border px-4 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update state on input change
          className="input-field border px-4 py-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} // Update state on input change
          className="input-field border px-4 py-2"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create</button>
      </form>
    </div>
  );
};

export default CreateUser;

