import React, { useContext, useState } from 'react'
import login from '../assets/register.png'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthContext } from '../contexts/AuthContext'
const Auth = ({ insideRegister }) => {


  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)


  const [isLoading, setIsLoading] = useState()

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    username: '', email: '', password: ''
  })
  console.log(userData);
  const hanleRegister = async (e) => {
    e.preventDefault()
    if (userData.username && userData.email && userData.password) {
      // api call
      try {

        const result = await registerAPI(userData)
        console.log(result);
        if (result.status == 200) {
          alert(`Welcome ${result?.data?.username}...Please login to explore our page!!!`)
          setUserData({ username: "", email: "", password: "" })
          navigate('/login')
        } else {
          if (result.response.status == 406) {
            alert(result.response.data)
            setUserData({ username: "", email: "", password: "" })
          }
        }


      } catch (err) {
        console.log(err);


      }
    } else {
      alert('please fill the form completely')
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    if (userData.email && userData.password) {
      // api call
      try {
        const result = await loginAPI(userData)
        console.log(result);
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          setIsAuthorised(true)
          setIsLoading(true)
          setTimeout(() => {
            setUserData({ username: "", email: "", password: "" })
            navigate('/')
            setIsLoading(false)

          }, 2000)


        } else {
          if (result.response.status == 404) {
            alert(result.response.data)
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("please fill the form completely")
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={login} alt="" className="w-100" />
            </div>
            <div className="col-lg-6">
              <h1 className="fw-bolder mt-2"><i className="fa-brands fa-docker"></i> Project Fair</h1>
              <h5 className="fw-bolder mt-2">
                Sign {insideRegister ? "Up" : "In"} to your Account
              </h5>
              <Form>

                {insideRegister &&
                  <FloatingLabel controlId="floatingInputName" label="Username" className='mb-3'>
                    <Form.Control value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} type="text" placeholder="Username" />
                  </FloatingLabel>}

                <FloatingLabel controlId="floatingInput" label="Email Address">
                  <Form.Control value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="email" className='mb-3' />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="Password" className='mb-3' />
                </FloatingLabel>
                {
                  insideRegister ?
                    <div className="mt-3">
                      <button onClick={hanleRegister} className="btn btn-success mb-2">Register</button>
                      <p>Already have an Account? Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                      <div className="mt-3">
                        <button onClick={handleLogin} className="btn btn-success mb-2">Login
                          {isLoading &&
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>}         </button>
                        <p>Already have an Account? Click here to <Link to={'/register'}>Register</Link></p>
                      </div>

                    </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Auth
