import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/AuthContext'

function App() {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/login' element={<Auth/>} ></Route>
      <Route path='/register' element={<Auth insideRegister={true}/>} ></Route>
      <Route path='/projects' element={isAuthorised?<Project/>:<Navigate to={'/login'}/>} ></Route>
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>} ></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
