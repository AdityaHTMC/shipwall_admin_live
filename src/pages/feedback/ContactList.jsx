import React, { useEffect, useState } from 'react';
import { Pagination, Table, Modal, Button, Form } from 'react-bootstrap';
import { useAppContext } from '../../contextApi/AppContext';
import { FaEye } from "react-icons/fa";
import { Tooltip } from 'react-bootstrap';

const ContactList = () => {
  const { contactList, getContactList } = useAppContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [suggestionsPerPage] = useState(25);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContactList, setFilteredContactList] = useState([]);

  const fetchData = async () => {
    await getContactList();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredContactList(
     contactList && contactList.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.mobile.includes(searchQuery)
      )
    );
  }, [contactList, searchQuery]);

  const indexOfLastSuggestion = currentPage * suggestionsPerPage;
  const indexOfFirstSuggestion = indexOfLastSuggestion - suggestionsPerPage;
  const currentSuggestions = filteredContactList && filteredContactList.slice(indexOfFirstSuggestion, indexOfLastSuggestion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewMessage = (item) => {
    setSelectedMessage(item);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='container'>
      <Form.Group controlId="formSearch" className='my-2'>
        <Form.Control
          type="text"
          placeholder="Search by name, email, or mobile"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form.Group>
      <Table striped bordered hover responsive>
        <thead className='bg-info'>
          <tr >
            <th onClick={() => console.log('Sort by Name')}>Name</th>
            <th onClick={() => console.log('Sort by Email')}>Email</th>
            <th onClick={() => console.log('Sort by Mobile')}>Mobile</th>
            <th onClick={() => console.log('Sort by Message')}>Message</th>
            <th onClick={() => console.log('Sort by Date')}>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentSuggestions)|| currentSuggestions.length > 0 ? currentSuggestions.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.message.slice(0, 10)}...</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>
                <Button variant='success' onClick={() => handleViewMessage(item)}><FaEye/></Button>
              </td>
            </tr>
          )):<p>no data found</p>
        }
        </tbody>
      </Table>

      <div className='d-flex justify-content-center'>
        <Pagination>
          {[...Array(Math.ceil(filteredContactList && filteredContactList.length / suggestionsPerPage))].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
        <Modal.Header className='text text-white bg-primary'>
          <Modal.Title><b>Name : {selectedMessage?.name}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-light' style={{overflowY:'auto'}}>
          <div>
            <b className='text text-primary'>Mobile: </b><span>{selectedMessage?.mobile}</span><br />
            <b className='text text-primary'>Email: </b><span>{selectedMessage?.email}</span><br />
            <hr />
          </div>
          <h4 className='text text-success'>Message</h4>
          <div className='alert alert-success'>
            <p>{selectedMessage.message}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactList;
