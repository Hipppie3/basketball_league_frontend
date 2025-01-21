import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
const [showForm, setShowForm] = useState(false)

  const handleForm = (e) => {
    e.preventDefault();
    setShowForm((prev) => !prev);  // Toggles between true/false
  }
  const closeDropdown = () => {
   setShowForm(false)
  }

 return (
  <nav className='navbar_container'>
   <ul>
    <li><NavLink to='/'>HOME</NavLink></li>
    <li><NavLink to='#' onClick={handleForm}>FORMS</NavLink>
    {showForm && (
     <ul>
    <li><NavLink to='/playerForm' onClick={closeDropdown}>PLAYER FORM</NavLink></li>
    <li><NavLink to='/statForm' onClick={closeDropdown}>STAT FORM</NavLink></li>
    <li><NavLink to='/teamForm' onClick={closeDropdown}>TEAM FORM</NavLink></li>
    </ul> 
    )}
    </li>
   </ul>
  </nav>
 )
}

export default Navbar


