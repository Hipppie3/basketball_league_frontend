import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [showForm, setShowForm] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    setShowForm((prev) => !prev);  // Toggles dropdown visibility
  };

  const closeDropdown = () => {
    setShowForm(false);
    setShowMobile(false); // Close mobile menu as well when clicking a link
  };

  const toggleMobileMenu = () => {
    setShowMobile((prev) => !prev);
  };

  return (
    <nav className='navbar_container'>
      <ul className={showMobile ? 'nav_links show_mobile' : 'nav_links'}>
        <li><NavLink to='/' onClick={closeDropdown}
        className={({ isActive }) => (isActive ? "active_link" : "")}
        >HOME
        </NavLink></li>
        <li><NavLink to='/playerslists' onClick={closeDropdown}
        className={({ isActive }) => (isActive ? "active_link" : "")}>PLAYERS
        </NavLink></li>
        <li>
          <NavLink to='#' onClick={handleForm}
          className={({ isActive }) => (isActive ? "active_link" : "")}>FORMS</NavLink>
          {showForm && (
            <ul className={showForm ? 'dropdown-visible' : 'dropdown-hidden'}>
              <li><NavLink to='/playerForm' onClick={closeDropdown}
              className={({ isActive }) => (isActive ? "active_link" : "")}>PLAYER FORM
              </NavLink></li>
              <li><NavLink to='/statForm' onClick={closeDropdown}
              className={({ isActive }) => (isActive ? "active_link" : "")}>STAT FORM
              </NavLink></li>
              <li><NavLink to='/teamForm' onClick={closeDropdown}
              className={({ isActive }) => (isActive ? "active_link" : "")}>TEAM FORM
              </NavLink></li>
            </ul>
          )}
        </li>
      </ul>

      {/* Hamburger Icon */}
      <div className='hamburger' onClick={toggleMobileMenu}>
        {showMobile ? 'X' : '☰'}
      </div>
    </nav>
  );
}

export default Navbar;
