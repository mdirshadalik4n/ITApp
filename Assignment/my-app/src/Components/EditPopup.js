import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaBars } from 'react-icons/fa';

const EditPopup = ({ userData, updateUserStatus }) => {
  const { id, Status } = userData;
  const [modal, setModal] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(Status);

  const toggle = () => setModal(!modal);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleUpdate = () => {
    // Call the function to update the status for the selected ID
    updateUserStatus(id, selectedOption);

    // Close the modal
    toggle();
  };

  return (
    <div>
      <Button onClick={toggle} color="link">
        <FaBars />
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <div>
            <h5>Select Status:</h5>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="implemented"
                value="Implemented"
                checked={selectedOption === 'Implemented'}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor="implemented">
                Implemented
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="closed"
                value="Closed"
                checked={selectedOption === 'Closed'}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor="closed">
                Closed
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="pending"
                value="Pending"
                checked={selectedOption === 'Pending'}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor="pending">
                Pending
              </label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditPopup;





