import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationType, setNotificationType] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      <Notification
        type={notificationType}
        message={notificationMessage}
      />
      {
        user ? (
          <Blogs
            blogs={blogs}
            user={user}
            updateUser={setUser}
            updateBlogs={setBlogs}
            updateNotificationType={setNotificationType}
            updateNotificationMessage={setNotificationMessage}
          />
        ) : (
          <LoginForm
            updateUser={setUser}
            updateNotificationType={setNotificationType}
            updateNotificationMessage={setNotificationMessage}
          />
        )
      }
    </div>
  )
}

export default App
