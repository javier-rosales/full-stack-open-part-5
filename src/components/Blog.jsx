import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({
  blog,
  blogs,
  updateBlogs,
  username,
  updateNotificationType,
  updateNotificationMessage
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const isOwnBlog = username === blog.user.username

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    const newBlog = {
      userId: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    const updatedBlog = await blogService.update(blog.id, newBlog)

    const updatedBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    updateBlogs(updatedBlogs)
  }

  const handleDeleteBlog = async () => {
    const confirmation = window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)

    if (confirmation) {
      const statusResponse = await blogService.deleteBlog(blog.id)

      if (statusResponse === 204) {
        updateNotificationType('success')
        updateNotificationMessage(`"${blog.title}" by ${blog.author} has been deleted`)

        const updatedBlogs = blogs.filter(b => b.id !== blog.id)
        updateBlogs(updatedBlogs)

        setTimeout(() => {
          updateNotificationMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div className='blog'>
      {!showDetails
      ?
        <div>
          {blog.title} by {blog.author}
          <button onClick={toggleDetails}>
            View
          </button>
        </div>
      :
        <div>
          {blog.title}
          <br />
          {blog.author}
          <br />
          {blog.url}
          <br />
          {blog.likes}
          <button onClick={handleLike}>
            Like
          </button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={toggleDetails}>
            Hide
          </button>
          {isOwnBlog &&
            <button
              className='delete-blog'
              onClick={handleDeleteBlog}
            >
              Delete
            </button>
          }
        </div>
      }
    </div>
  )
}

export default Blog