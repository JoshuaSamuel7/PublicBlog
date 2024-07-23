import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom'

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    window.location.href = "/logout";
  };
  return (
    <header className="header">
      <h1 className="header-title">My Blog Site</h1>
      <nav className="header-nav">
        <Link to="/" className="header-button">Home</Link>
        <Link to="/add-blogs" className="header-button">Add Blogs</Link>
        <Link to="/edit-blogs" className="header-button">Edit Blogs</Link>
        <Link to="/delete-blogs" className="header-button">Delete Blogs</Link>
        <Link to="/about" className="header-button">About Us / Contact Us</Link>
        {user ? (
            <>
            <img src="/images/img.png" alt="" className='imgph'/>
             {user.name} 
             <button className='logoutbtn' onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-button">Login</Link>
              <Link to="/signup" className="header-button">Register</Link>
            </>
          )}
      </nav>
    </header>
  );
};

export default Header;
