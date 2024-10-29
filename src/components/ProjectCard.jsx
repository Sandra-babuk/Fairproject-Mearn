import React, { useState } from 'react'
import { Card,Modal } from 'react-bootstrap'
import SERVERURL from '../services/serverUrl';

const ProjectCard = ({displayData}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
       <Card   onClick={handleShow} className='shadow btn'>
      <Card.Img height={'250px'} width={'25px'}  variant="top" src={`${SERVERURL}/uploades/${displayData?.projectImg}`} />
      <Card.Body>
        <Card.Title>{displayData?.title}</Card.Title>
       
      </Card.Body>
    </Card>
    <Modal size='lg'centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='row'>
            <div className="col-lg-6">
              <img className='img-fluid' src={`${SERVERURL}/uploades/${displayData?.projectImg}`}  alt="" />
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h6 className="fw-bolder">Language Used: <span className='text-danger'>{displayData?.language}</span></h6>
              <p style={{textAlign:'justify'}}><span>Project Overview :{displayData?.overview}</span></p>
            </div>
        </div>
        <div className="float-start mt-1">
          <a className='btn btn-success' href={displayData?.github} target='_blank'> <i className="fa-brands fa-github"></i></a>
          <a className='btn btn-primary ms-2' href={displayData?.website} target='_blank'> <i className="fa-solid fa-link"></i></a>


        </div>
        </Modal.Body>
         
      </Modal>
    
    </>
  )
}

export default ProjectCard
