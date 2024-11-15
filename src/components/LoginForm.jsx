import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ updateUser, updateNotificationType, updateNotificationMessage }) => {
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
  } catch(exception) {
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
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>
          Username
        </label>
        <input
          value={username}
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor='password'>
          Password
        </label>
        <input
          type='password'
          value={password}
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm