import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

function Header() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector(state => state.auth)
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  
  return (
    <header className='header'>
    <div className='logo'>
      <Link to='/'>Support Desk</Link>
    </div>
    <ul>
       {
        user ? (
          <li>
          <button className='btn' onClick={handleLogout}>
          Logout
          </button>
        </li>
        ) : (
          <>
          <li>
            <Link to='/login'>
             Login
            </Link>
          </li>
          <li>
            <Link to='/register'>
            Register
            </Link>
          </li>
          </>
        )
       }
    </ul>
  </header>
  )
}

export default Header
