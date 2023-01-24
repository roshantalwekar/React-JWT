import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import LoginPage from "./Components/LoginPage";
import MainPage from './Components/MainPage';
import RegisterPage from "./Components/RegisterPage";
import AuthService from "./services/auth.service";
import ProfilePage from "./Components/ProfilePage";
import UserPage from "./Components/UserPage";
import ModeratorPage from "./Components/ModeratorPage";
import AdminPage from "./Components/AdminPage";

function App() {
  const [showModerator, setShowModerator] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModerator(user.roles.includes("ROLE_MODERATOR"));
      setShowAdmin(user.roles.includes("ROLE_ADMIN"))
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder - JWT
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="navbar-brand">
              Home
            </Link>
          </li>

          {showModerator && (
            <li className="nav-item">
              <Link to={"/mod"} className="navbar-brand">
                Moderator
              </Link>
            </li>
          )}

          {showAdmin && (
            <li className="nav-item">
              <Link to={"/admin"} className="navbar-brand">
                Admin
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="navbar-brand">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/mod" element={<ModeratorPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
