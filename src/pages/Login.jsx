import { useEffect, useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../features/auth/authSlice'

function Login() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isSuccess , isError , isLoading , user , message} = useSelector(state => state.auth)


  const [formData , setFormData] = useState({
    email : "",
    password : "",
  })

  const {email , password } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))

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
              <FaSignInAlt /> Login
            </h1>
            <p>Please log in to get support</p>
          </section>
    
          <section className='form'>
            <form onSubmit={handleSubmit}>
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
                <button className='btn btn-block'>Submit</button>
              </div>
            </form>
          </section>
    </>
  )
}

export default Login
