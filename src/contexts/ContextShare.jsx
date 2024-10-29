import React, { createContext, useState } from 'react'
export const addResponseContext = createContext()
export const editResponseContext = createContext()


const ContextShare = ({children}) => {
    const [addRespons,setAddResponse] = useState("")
    const [editResponse,setEditResponse] = useState("")
  return (
    <addResponseContext.Provider value={{addRespons,setAddResponse}}>
       <editResponseContext.Provider value={{editResponse,setEditResponse}}>
         {children}
         </editResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default ContextShare
