import React from 'react';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const jwtToken = localStorage.getItem('jwtToken');
  useEffect(() => {
    setIsLoggedIn(!!jwtToken);
  });

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="logo" href="/">Medium</a>
        <div className="menu">
          <a href="/">Home</a>
          <a href="/add">Write</a>
          <a href="/signup">Register</a>
          {isLoggedIn ? (
            <a onClick={handleLogout}>Logout</a>
          ) : (
            <a href="/login">Login</a>
          )}
          <i onClick={toggleModal} class="fa fa-user fa-lg"></i>
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <div className="link-container">
                  <a href="/myprofile"><i class="fa fa-user fa-lg"></i> Profile</a>
                  <a href="/mypost"><i class="bi bi-file-post"></i>  Posts</a>
                  <a href="/savedpost"><i class="bi bi-bookmarks"></i>Saved Posts</a>
                  <a href="/draft"> <i class="bi bi-arrow-counterclockwise"></i>Draft</a>
                  <a href="/followers"><i class="bi bi-person"></i>Followers</a>
                  <a href="/payment"><i class="bi bi-wallet"></i>Buy Premium</a>
                  <a onClick={handleLogout}><i class="bi bi-box-arrow-right"></i>Logout</a>
                </div>
                <button className="close-modal" onClick={toggleModal}>
                  X
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
