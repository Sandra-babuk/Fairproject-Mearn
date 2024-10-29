import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import gallery from '../assets/camera.png'
import { addProjectAPI } from '../services/allAPI'
import { addResponseContext } from '../contexts/ContextShare'
const Add = () => {

  const {addRespons,setAddResponse} = useContext(addResponseContext)

  

  const [imageFileStatus,setImageFileStatus]= useState(false)
  const [preview,setPreview]= useState(gallery)

  const [projectData,setProjectData] = useState({
    title:"",language:"",overview:"",github:"",website:"",projectImg:""
  })
  console.log(projectData);

  

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (projectData.projectImg) {
      const fileType = projectData.projectImg.type;
      if (fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg") {
        setImageFileStatus(true);
        setPreview(URL.createObjectURL(projectData.projectImg));
      } else {
        setImageFileStatus(false);
        setPreview(gallery);
        setProjectData({ ...projectData, projectImg: "" });
      }
    }
  }, [projectData.projectImg]);

  const handleClose = () =>{
     setShow(false);
     setProjectData({title:"",language:"",github:"",website:"",projectImg:""})
    }

  const handleShow = () => setShow(true);

  const handleSaveProject = async ()=>{
    const {title,language,overview,github,website,projectImg} = projectData
    if(title && language && overview && github && website && projectImg){
      // reqbody must be in formdata since data contains files
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
              // api call-post request
              try{
                const result = await addProjectAPI(reqBody,reqHeader)
                console.log(result);
                if(result.status==200){
                  handleClose()
                  // alert("Project added successfully!!")
                  // share result via context
                  setAddResponse(result)
                }else{
                  alert(result.response.data)
                }
              }catch(err){
                console.log(err);
              }

      }

    }else{
      alert("please fill the form completly...!!!")
    }
  }

  return (
    <div>
      <button onClick={handleShow} className="btn btn-primary"><i className="fa-soli fa-plus"></i>New Projext</button>
      <Modal size='lg' 
       centered show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details..!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row align-items-center">
          <div className="col-lg-4">
            <label >
              <input onChange={e=>setProjectData({...projectData,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
              <img height={'200px'} className='img-fluid' src={preview} alt="" />
           {  !imageFileStatus &&  <div className="text-warning fw-bolder my-2">*Upload only the following file types (jpeg,jpg,png) here!!!</div>}
            </label>
          </div>
          <div className="col-lg-8">
           <div className='mb-2'>
              <input value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} type="text" placeholder='Project Title' className="form-control" />
          </div>
          <div className='mb-2'>
              <input value={projectData.language} onChange={e=>setProjectData({...projectData,language:e.target.value})}  type="text" placeholder='Language Used in Project' className="form-control" />
          </div>
          <div className='mb-2'>
              <input value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}  type="text" placeholder='Project Overview' className="form-control" />
          </div>
          <div className='mb-2'>
              <input value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}  type="text" placeholder='Project Github Link' className="form-control" />
          </div>
          <div className='mb-2'>
              <input value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})}  type="text" placeholder='Project Website Link' className="form-control" />
          </div>
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSaveProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Add
