import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div style={{height:'300px'}} className='container mt-5 w-100'>
      <div className='d-flex justify-content-between'>
        <div className="intro">
          <h5><i className="fa-brands fa-docker"></i>
          Project Fair</h5>
          <p>Design and build with all the love in the world by the luminar team with the help of our contributors.</p>
          <p>Code licensed Luminar, docs CC BY 3.0.</p>
          <p>Currently v5.3.2.</p>
        </div>
        
        <div className="links" >
          <h5>Links</h5>
          <Link to={'/'} className='footerlink' style={{textDecoration:'none'}}>Home</Link> <br />
          <Link to={'/login'} className='footerlink' style={{textDecoration:'none'}}>Login</Link> <br />
          <Link to={'/register'} className='footerlink' style={{textDecoration:'none'}}>Register</Link>
        </div>
        <div className="guides">
          <h5>Guides</h5>
          <p>React</p>
          <p>React Bootstrap</p>
          <p>React Router</p>
        </div>
        <div className="contact">
          <h5>Contact Us</h5>
  <div className='d-flex'>
            <input type="text" className='form-control' placeholder='Enter your email here'/>
           <button className='bg-success rounded p-1 ms-1'><i class="fa-solid fa-arrow-right"></i></button>
  </div>
     <div className='d-flex flex-row justify-content-evenly mt-4'>
            <i className="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-github"></i>
            <i class="fa-solid fa-phone"></i>
     </div>
        </div>
      </div>
      <p className='text-center mt-3'>Copyright &copy; may 2024 Batch,Project Fair.Built with React</p>   
      </div>
  )
}

export default Footer