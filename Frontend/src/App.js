import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Info from './pages/Info';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Logout from './components/Logout';
import Profil from './pages/Profil';
import Candidates from './pages/Candidates';
import Instructors from './pages/Instructors';
import Progress from './pages/Progress';
import StudentProgress from './pages/StudentProgress';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/register"
            element={<PrivateRoute component={Register} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profil" element={<PrivateRoute component={Profil} />} />
          <Route
            path="/candidates"
            element={<PrivateRoute component={Candidates} />}
          ></Route>
          <Route
            path="/progress"
            element={<PrivateRoute component={Progress} />}
          ></Route>
          <Route
            path="/studentProgress"
            element={<PrivateRoute component={StudentProgress} />}
          ></Route>

          <Route
            path="/instructors"
            element={<PrivateRoute component={Instructors} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
