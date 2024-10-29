import commonAPI from "./commonAPI"
import SERVERURL from "./serverUrl"

// register called by Auth
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/register`,reqBody)
}

// login called by Auth
export const loginAPI = async(reqBody)=>{
    return await commonAPI ("POST",`${SERVERURL}/login`,reqBody)
}

// addproject api called by add
export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/addproject`,reqBody,reqHeader)
}

// homeProjectsAPI called by Home
export const homeProjectsAPI = async()=>{
    return await commonAPI ("GET",`${SERVERURL}/home-projects`,"")
}

// allprojectsAPI called by projects
export const allprojectsAPI = async (searchKey,reqHeader)=>{
    return await commonAPI ("GET",`${SERVERURL}/all-projects?search=${searchKey}`,"",reqHeader)
}

// userProjectsAPI called by view
export const  userProjectsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/user-projects`,"",reqHeader)
}

// deleteProjectAPI called by view
export const deleteProjectAPI = async (pid,reqHeader)=>{
    return await commonAPI ("DELETE",`${SERVERURL}/${pid}/remove-projects`,{},reqHeader)
}

// editProjectAPI called by edit
export const editProjectAPI = async (pid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/${pid}/edit-projects`,reqBody,reqHeader)
}
// editUserAPI called by profile
export const editUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI ("put",`${SERVERURL}/user/edit`,reqBody,reqHeader)
}
// editProfileAPI
export const editProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/user/edit`,reqBody,reqHeader)
}