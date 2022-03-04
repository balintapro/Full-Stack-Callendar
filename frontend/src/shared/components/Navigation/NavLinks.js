import React, { useContext } from 'react';
//import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  //ITT MAJD AZ LESZ HOGY VISSZA A FŐOLDALRA ÉS BEJELENTKEZÉS
  //ÉS VISSZA A FŐOLDALRA ÉS KIJELENTKEZÉS
  return (
    <React.Fragment>
      <div className="nav-links back-main-page-link-grid">
        <a href="https://smbutordesign.hu/"> VISSZA FŐOLDALRA</a>
      </div>
  
     
      {auth.isLoggedIn && (
        <div className="nav-links logout-link-grid">
          <button onClick={auth.logout}>KIJELENTKEZÉS</button>
        </div>
      )}
    </React.Fragment>
  );
};

export default NavLinks;
/*
    <ul className="nav-links ">
        <div> 
      <li>       
     <a href="https://smbutordesign.hu/"> VISSZA A FŐOLDALRA</a>
      </li></div>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>KIJELENTKEZÉS</button>
        </li>
      )}  
    </ul>
*/
