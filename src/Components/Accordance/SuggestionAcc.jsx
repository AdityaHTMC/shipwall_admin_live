import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

const SuggestionAcc = ({item}) => {
  return (
    <>
    <Card>
      <Card.Body className='alert alert-warning'>
        <div className='row'>
          <div className='col-8'>

        <p className='text text-dark'><strong className='text text-dark'> Suggestion :</strong> {item.suggestion} </p>
          </div>
          <div>
          <strong className='text text-success'> Date :</strong>  {item.createdAt.slice(0,10)}
          </div>
        </div>
      </Card.Body>
    </Card>

    </>
  )
}

export default SuggestionAcc