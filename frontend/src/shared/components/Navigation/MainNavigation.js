import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import './MainNavigation.css';

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  // spanok helyett mehet egy eltartás a headerbe

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
        </button>

        <div className="title-grid">
          <h1 className="main-navigation__title fontsize-18">
            <Link to="/">
              <span className="black">S</span>&<span className="black ">M </span>
              BÚTORDESIGN KFT. NAPTÁR
            </Link>
          </h1>
        </div>

        <div className="links-grid">
          <nav className="middle-grid-for-nav">
            <NavLinks />
          </nav>
        </div>

      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
//main-navigation__header-nav