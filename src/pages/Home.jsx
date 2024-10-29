import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/start.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectsAPI } from '../services/allAPI'
const Home = () => {
  const [allHomeProjects,setAllHomeProjects] = useState([])
  const navigate = useNavigate()

  console.log(allHomeProjects);

  useEffect(()=>{
    getAllHomeProjects()
  },[])

  const getAllHomeProjects = async ()=>{
    try {
      const result = await homeProjectsAPI()
      if (result.status==200) {
        setAllHomeProjects(result.data)
      }
    } catch (err) {
      console.log(err);
      
    }
  }

  const handleProjects = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert("Please login to get full access to our projects!!!")
    }
  }
  return (
    <>
      <div style={{ minHeight: '100vh' }} className="d-flex justify-content-center align-items-center rounded shadow w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: '80px' }}><i class="fa-brands fa-docker"></i>Project Fair</h1>
              <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores corporis voluptate placeat enim. Molestias deserunt dolorum omnis ipsam aliquid, explicabo mollitia laborum ut delectus rerum, deleniti fugit ex doloribus molestiae?</p>
              {sessionStorage.getItem("token") ?
                <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
                :
                <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
              }
            </div>
            <div className="col-lg-6">
              <img width={'650px'} src={login} alt="" className="img-fuild" />
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 text-center">
        <h1 className="mb-5">Explore Our Projects</h1>
        <marquee>
          <div className="d-flex">
            {
              allHomeProjects?.length>0 &&
                 allHomeProjects?.map(project=>(
                  <div key={project?._id} className="me-5">
                    <ProjectCard displayData={project}/>
                  </div>
                 ))
            }
          </div>
        </marquee>
        <button onClick={handleProjects} className="btn btn-link mt-5">CLICK HERE TO VIEW MORE PROJECTS...</button>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1>Our Testimonials</h1>
      </div>
      <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className="d-flex justify-content-center align-items-center flex-column">Max
              <img width={'80px'} height={'80px'} src="https://cdn-icons-png.flaticon.com/512/5951/5951752.png" alt="" className="rounded-circle img-fluid" />
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
              </div>
              <p style={{ textAlign: 'justify' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis culpa vel quam iusto ea? Ipsum, officiis
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className="d-flex justify-content-center align-items-center flex-column">Zara
              <img width={'80px'} height={'80px'} src="https://cdn-icons-png.flaticon.com/512/5951/5951752.png" alt="" className="rounded-circle img-fluid" />
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
              </div>
              <p style={{ textAlign: 'justify' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis culpa vel quam iusto ea? Ipsum, officiis
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className="d-flex justify-content-center align-items-center flex-column">Laya
              <img width={'80px'} height={'80px'} src="https://cdn-icons-png.flaticon.com/512/5951/5951752.png" alt="" className="rounded-circle img-fluid" />
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
              </div>
              <p style={{ textAlign: 'justify' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis culpa vel quam iusto ea? Ipsum, officiis
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>


    </>
  )
}

export default Home
