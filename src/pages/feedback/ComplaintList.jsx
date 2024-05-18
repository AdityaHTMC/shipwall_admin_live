import React, { useEffect, useState } from 'react';
import { Button, Modal, Pagination } from 'react-bootstrap';
import ComplainAcordance from '../../Components/Accordance/complainAcordance';
import { useAppContext } from '../../contextApi/AppContext';

const ComplaintList = () => {
  const { getComplainList, addComplain, complaintListData } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [text, settext] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(5);

  const fetchData = async () => {
    await getComplainList();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddComplaint = async () => {
    await addComplain(text);
    setShowModal(false);
    await fetchData();
  };

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = complaintListData.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='mt-5 col-10'>
            {currentComplaints.map((item, index) => (
              <ComplainAcordance key={index} item={item} />
            ))}
          </div>
          {/* <div className='col-2'>
            <button className='btn btn-outline-dark float-end mb-3' onClick={() => setShowModal(true)}>
              Add Complaint
            </button>
          </div> */}
        </div>

        {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Complaint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Complaint
            </label>
            <textarea
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              name='text'
              onChange={(e) => settext(e.target.value)}
              value={text}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant='primary' onClick={handleAddComplaint}>
              Save Complaint
            </Button>
          </Modal.Footer>
        </Modal> */}

        <div className='d-flex justify-content-center'>
          <Pagination>
            {[...Array(Math.ceil(complaintListData.length / complaintsPerPage))].map((_, index) => (
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
      </div>
    </>
  );
};

export default ComplaintList;
