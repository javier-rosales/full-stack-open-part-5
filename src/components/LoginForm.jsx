import PropTypes from 'prop-types'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({
  updateUser,
  updateNotificationType,
  updateNotificationMessage
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    try {
    const user = await loginService.login({
      username,
      password
    })

    window.localStorage.setItem(
      'loggedUser',
      JSON.stringify(user)
    )

    updateUser(user)
    blogService.setToken(user.token)

    setUsername('')
    setPassword('')
  } catch {
    updateNotificationType('error')
    updateNotificationMessage('Wrong username or password')
    
    setTimeout(() => {
      updateNotificationMessage(null)
    }, 5000)
  }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <label htmlFor='username'>
          Username
        </label>
        <input
          data-testid='username'
          value={username}
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor='password'>
          Password
        </label>
        <input
          data-testid='password'
          type='password'
          value={password}
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>
          Log in
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
  updateNotificationType: PropTypes.func.isRequired,
  updateNotificationMessage: PropTypes.func.isRequired
}

export default LoginForm