import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'reactstrap';
import jsPDF from 'jspdf';
import { deleteData } from './apicalls';
import PopupModal from './popup';
import html2canvas from 'html2canvas';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import { FaChevronLeft, FaChevronRight, FaTrash, FaDownload, FaSearch } from 'react-icons/fa';
import EditPopup from './EditPopup';

const TicketInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
      navigate('login');
    }
  }, [navigate]);

  const updateUserStatus = (id, status) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, Status: status } : user
    );
    setUsers(updatedUsers);
  };

  const fetchUsers = () => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset the current page when performing a new search
  };

  const handleDeleteUser = (id) => {
    deleteData(id)
      .then(() => fetchUsers()) // Fetch users again after deletion
      .catch((error) => console.error('Error deleting user:', error));
  };

  const filteredUsers = users.filter((user) =>
    user.Status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDownload = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save('user_list.pdf');
    });
  };

  const currentDate = new Date().toLocaleDateString('en-US');

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <div style={{ flex: 1, padding: '15px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PopupModal fetchUsers={fetchUsers} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaSearch style={{ marginRight: '0.5rem' }} />
              </div>
              <input
                type="text"
                placeholder="Search by status"
                value={searchTerm}
                onChange={handleSearch}
                style={{ textDecoration: 'underline' }}
              />
              <span>
                <Button onClick={handleDownload} color="none">
                  <FaDownload style={{ marginRight: '0.5rem', color: 'blue' }} />
                </Button>
              </span>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: '100%', overflowX: 'auto' }}>
              <table ref={tableRef} className="table table-bordered table-striped table-hover">
                <thead>
                  <tr style={{ textAlign: 'center' }}>
                    <th>Actions</th>
                    <th>User ID</th>
                    <th>Status</th>
                    <th>Service Type</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        {`${user.id} ${''}`}
                        <Button color="none">
                          <EditPopup userData={user} updateUserStatus={updateUserStatus} />
                        </Button>
                        <Button color="none" style={{ color: 'red' }} onClick={() => handleDeleteUser(user.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                      <td>{user.id}</td>
                      <td>{user.Status}</td>
                      <td>{user.ServiceType}</td>
                      <td>{user.Location}</td>
                      <td>{user.Description}</td>
                      <td>{user.CreatedOn || currentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="pagination"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
          >
            {currentPage > 1 && (
              <span className="pagination-arrow" onClick={prevPage}>
                <FaChevronLeft />
              </span>
            )}
            <ul style={{ listStyleType: 'none', display: 'flex', alignItems: 'center', padding: 0 }}>
              <li style={{ marginRight: '1rem' }}>{`Page No: ${indexOfFirstItem + 1}-${Math.min(
                indexOfLastItem,
                filteredUsers.length
              )}`}</li>
            </ul>
            {currentPage < Math.ceil(filteredUsers.length / itemsPerPage) && (
              <span className="pagination-arrow" onClick={nextPage}>
                <FaChevronRight />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketInfo;
















