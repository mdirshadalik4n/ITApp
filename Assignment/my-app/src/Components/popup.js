import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { addUser } from './apicalls';

const PopupModal = ({ fetchUsers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    Status: 'pending',
    ServiceType: '',
    Location: '',
    Description: '',
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addUser(user)
      .then((response) => {
        // Handle successful response from the server
        console.log('User added successfully:', response);
        // Perform any necessary actions after successful submission
        window.location.reload();
      })
      .catch((error) => {
        // Handle error response from the server
        console.error('Error adding user:', error);
        // Handle the error, display an error message, or perform any necessary actions
      });
  };

  const handleServiceTypeChange = (event) => {
    setUser({ ...user, ServiceType: event.target.value });
  };

  const handleLocationChange = (event) => {
    setUser({ ...user, Location: event.target.value });
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={toggleModal}>
        Raise The Ticket
      </button>
      <Modal isOpen={isOpen} toggle={toggleModal} size="lg" centered>
        <ModalBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div className="addUser">
            <label style={{ width: '10em' }}>
              Service Type<span className="required-indicator">*</span>
            </label>
            <select
              name="ServiceType"
              id="ServiceType"
              className="select-box form-control"
              required
              value={user.ServiceType}
              onChange={handleServiceTypeChange}
            >
              <option value="" disabled>
                Select Service Type
              </option>
              <option value="Request for Server Access">Request for Server Access</option>
              <option value="Payroll issues">Payroll issues</option>
              <option value="4 pair cable">4 pair cable</option>
              <option value="Hardware issue">Hardware issue</option>
              <option value="Request for new table">Request for new table</option>
            </select>
          </div>
          <div className="location">
            <label>
              Location<span className="required-indicator">*</span>
            </label>
            <select
              name="Location"
              id="Location"
              className="select-box form-control"
              required
              value={user.Location}
              onChange={handleLocationChange}
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="Description"
              id="Description"
              className="form-control"
              rows="4"
              value={user.Description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Add User
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PopupModal;

