import React, { useEffect, useState } from 'react';
import { Button, Modal, Pagination } from 'react-bootstrap';
import SuggestionAcc from '../../Components/Accordance/SuggestionAcc';
import { useAppContext } from '../../contextApi/AppContext';

const SuggestionList = () => {
  const { SuggestionListData, addSuggestion, getSuggestion } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [text, settext] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [suggestionsPerPage] = useState(5);

  const fetchData = async () => {
    await getSuggestion();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSuggestion = async () => {
    await addSuggestion(text);
    setShowModal(false);
    await fetchData();
  };

  const indexOfLastSuggestion = currentPage * suggestionsPerPage;
  const indexOfFirstSuggestion = indexOfLastSuggestion - suggestionsPerPage;
  const currentSuggestions = SuggestionListData.slice(indexOfFirstSuggestion, indexOfLastSuggestion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='mt-5 col-10'>
            {currentSuggestions.map((item, index) => (
              <SuggestionAcc key={index} item={item} />
            ))}
          </div>
          {/* <div className='col-2'>
            <button className='btn btn-outline-dark float-end mb-3' onClick={() => setShowModal(true)}>
              Add Suggestion
            </button>
          </div> */}
        </div>

        {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Suggestion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Suggestion
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
            <Button variant='primary' onClick={handleAddSuggestion}>
              Save Suggestion
            </Button>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}

        <div className='d-flex justify-content-center'>
          <Pagination>
            {[...Array(Math.ceil(SuggestionListData.length / suggestionsPerPage))].map((_, index) => (
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

export default SuggestionList;
