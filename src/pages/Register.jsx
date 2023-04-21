import { useEffect, useState } from 'react'
import {FaUser} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../features/auth/authSlice'

function Register() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isSuccess , isError , isLoading , user , message} = useSelector(state => state.auth)

  const [formData , setFormData] = useState({
    name : "",
    email : "",
    password : "",
    password2 : ""
  })

  const {name , email , password , password2} = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== password2){
      toast.error("Password Not Match!")
    }

    dispatch(register(formData))
    

  }
  

  useEffect(()=>{

    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }

  },[user , isError , isLoading , isSuccess , message])


  if(isLoading){
    return (
      <h1>Loading...</h1>
    )
  }

  
  return (
    <>
     <section className='heading'>
            <h1>
              <FaUser /> Register
            </h1>
            <p>Please create an account</p>
          </section>
    
          <section className='form'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  onChange={handleChange}
                  value={name}
                  placeholder='Enter your name'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  onChange={handleChange}
                  value={email}
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  onChange={handleChange}
                  value={password}
                  placeholder='Enter password'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password2'
                  name='password2'
                  onChange={handleChange}
                  value={password2}
                  placeholder='Confirm password'
                  required
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-block'>Submit</button>
              </div>
            </form>
          </section>
    </>
  )
}

export default Register
