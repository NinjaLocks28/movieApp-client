import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserProvider } from './UserContext';

import './App.css';

import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
import Movies from './pages/Movies'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (typeof data.user !== "undefined") {

          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });

        } else {

          setUser({
            id: null,
            isAdmin: null
          });

        }

      })

  }, []);

  const unsetUser = () => {

    localStorage.clear();

  };


  return (
    <>
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
