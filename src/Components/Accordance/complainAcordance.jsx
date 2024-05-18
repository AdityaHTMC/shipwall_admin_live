import React, { useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import { useAppContext } from '../../contextApi/AppContext';

const ComplainAcordance = ({item}) => {
  const {CloseComplaint, getComplainList} = useAppContext()

  useEffect(()=>{
    getComplainList()
  },[item.status])
  return (
    <>
    <Card>
      {
        item.status === "Pending" ?(
          <Card.Body className='alert alert-info'>
      <span onClick={()=>CloseComplaint(item._id)} className='btn btn-danger float-end'>Close</span>
        <div className='row'>
          <div className='col-8'>
        <p className='text text-dark'><strong className='text text-dark'> Complaint :</strong> {item.complaint} </p>
          </div>
          <div>
          <strong className='text text-success'> Date :</strong>  {item.createdAt.slice(0,10)}
          </div>
        </div>
      </Card.Body>
        ):(
          <Card.Body className='alert alert-danger'>
      <span className='alert alert-info float-end'>Closed</span>
        <div className='row'>
          <div className='col-8'>
        <p className='text text-dark'><strong className='text text-dark'> Complaint :</strong> {item.complaint} </p>
          </div>
          <div>
          <strong className='text text-success'> Date :</strong>  {item.createdAt.slice(0,10)}
          </div>
        </div>
      </Card.Body>
        )
      }
    
    </Card>

    </>
  )
}

export default ComplainAcordance