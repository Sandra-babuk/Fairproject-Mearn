import React, { useState,useEffect,useContext } from 'react'
import { Button, Modal } from 'react-bootstrap';
import gallery from '../assets/camera.png'
import SERVERURL from '../services/serverUrl';
import { editResponseContext } from '../contexts/ContextShare';
import { editProjectAPI } from '../services/allAPI';

const Edit = ({project}) => {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const [imageFileStatus,setImageFileStatus]= useState(false)
  const [preview,setPreview]= useState("")

  const [projectData,setProjectData] = useState({
    id:project?._id, title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImg:""
  })
  console.log(projectData);
  
    const [show, setShow] = useState(false);

  const handleClose = () => 
 {
  setShow(false)
  setProjectData({
    id:project?._id, title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImg:""
  })}
 

  const handleShow = () => 
    {
      setShow(true)
      setProjectData({
        id:project?._id, title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImg:""
      })}
  useEffect(() => {
    if (projectData.projectImg) {
      const fileType = projectData.projectImg.type;
      if (fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg") {
        setImageFileStatus(true);
        setPreview(URL.createObjectURL(projectData.projectImg));
      } else {
        setImageFileStatus(false);
        setPreview("");
        setProjectData({ ...projectData, projectImg: "" });
      }
    }
  }, [projectData.projectImg]);

  const handleUpdateProject = async ()=>{
    const {id,title,language,overview,github,website,projectImg} = projectData
    if(title && language && overview && github && website){
      // api call
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project?.projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization": `Bearer ${token}`
        }
        // api call-put request
        try {
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            alert("Project updated successfully!!!")
            handleClose()
            setEditResponse(result)

          }else{
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }else{
      alert("Please fill the form completely")
    }
  }

  return (
    <div>
      <button onClick={handleShow} className="btn"><i class="fa-solid fa-pen-to-square"></i></button>
      <Modal size='lg' 
       centered show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details..!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row align-items-center">
          <div className="col-lg-4">
            <label >
              <input onChange={e=>setProjectData({...projectData,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
              <img height={'200px'} className='img-fluid' src={preview?preview:`${SERVERURL}/uploades/${project?.projectImg}`} alt="" />
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
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Edit
