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

