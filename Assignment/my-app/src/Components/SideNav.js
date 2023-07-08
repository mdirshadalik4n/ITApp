import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaChartBar, FaTicketAlt } from 'react-icons/fa';

const SideNav = () => {
  return (
    <div>
      <button className="btn btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaBars size={24} style={{ marginRight: '10px' }} />
        </div>
      </button>

      <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="nav-links">
            <Link to="/Home" className="nav-link">
              <FaChartBar className="nav-icon" />
              <span className="nav-text">IT Dashboard</span>
            </Link>
            <Link to="/" className="nav-link">
              <FaTicketAlt className="nav-icon" />
              <span className="nav-text">IT Ticket Raise</span>
            </Link>
            <Link to={'/login'} className="nav-link">
              <FaTicketAlt className="nav-icon" />
              <span className="nav-text">Logout</span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;


