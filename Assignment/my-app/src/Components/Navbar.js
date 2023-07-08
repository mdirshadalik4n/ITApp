import React from 'react';
import SideNav from './SideNav';


const NavBar = () => {
  return (
    <nav style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', padding: '15px', backgroundColor: '#ffffff' }}>
      <div style={{display: "flex", flexDirection: "row"}}>
        <SideNav></SideNav>
        <span><h4>IT Help Desk</h4></span>
      </div>
    </nav>
  );
};

export default NavBar;