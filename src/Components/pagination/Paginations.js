import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({ handlePreview, handleNext, page, pageCount, setPage }) => {
  return (
    <>
      {
        pageCount > 0 ?
          <div className='pagination_div d-flex justify-content-end mx-5'>
            <Pagination className='pagination'>
              <Pagination.Prev className='paginate_button' onClick={() => handlePreview()} />
              {
                Array(pageCount).fill(null).map((element, index) => {
                  return (
                    <>
                      <Pagination.Item className='paginate_button page-item' onClick={() => setPage(index + 1)} active={page === index + 1 ? true : false}>{index + 1}</Pagination.Item>
                    </>
                  )
                })
              }

              <Pagination.Next onClick={() => handleNext()} />
            </Pagination>
          </div> : ""
      }


    </>
  )
}

export default Paginations