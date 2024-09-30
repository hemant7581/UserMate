import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id?" element={<UserPage />} /> {/* Optional :id for create or update */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
