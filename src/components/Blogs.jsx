import PropTypes from 'prop-types'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({
  blogs,
  updateBlogs,
  user,
  updateUser,
  updateNotificationType,
  updateNotificationMessage
}) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    updateUser(null)
  }

  return (
    <div>
      <h2>
        {user.name} logged-in
      </h2>
      <button onClick={handleLogout}>
        Logout
      </button>
      <BlogForm
        blogs={blogs}
        updateBlogs={updateBlogs}
        updateNotificationType={updateNotificationType}
        updateNotificationMessage={updateNotificationMessage}
        />
      <div className='blogs'>
        {[...blogs].sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              updateBlogs={updateBlogs}
              username={user.username}
              updateNotificationType={updateNotificationType}
              updateNotificationMessage={updateNotificationMessage}
            />
        )}
      </div>
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateNotificationType: PropTypes.func.isRequired,
  updateNotificationMessage: PropTypes.func.isRequired
}

export default Blogs