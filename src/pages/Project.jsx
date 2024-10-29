import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allprojectsAPI } from '../services/allAPI'

const Project = () => {
  const [searchKey,setSearchKey]= useState("")
  const [allProjects,setAllProjects]= useState([])

  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  console.log(allProjects);
  

const getAllProjects = async()=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }
    try{
      const result = await allprojectsAPI(searchKey,reqHeader)
      console.log(result);
      if(result.status==200){
        setAllProjects(result.data)

      }else{
        console.log(result.response.data);
      }
    }catch(err){
      console.log(err);
    }
  }
}

  return (
    <>
      <Header/>
      <div style={{marginTop:'150px'}} className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)} placeholder='Search Projects by Languages used!' type="text" className="form-control w-25" />
        </div>
        <Row className="mt-3">
          {
            allProjects?.length>0 ?
            allProjects?.map(project=>(
              <Col key={project?._id} className="mb-3" sm={12} md={6} lg={4} >
              <ProjectCard displayData={project}/>
              </Col>
            ))
          
          :
          <div className="fw-bolder text-danger m-5 text-center">Project no found!!!</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Project
