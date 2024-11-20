import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
  blogs,
  updateBlogs,
  updateNotificationType,
  updateNotificationMessage
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleCreateBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }

    const returnedBlog = await blogService.create(blogObject)
    updateBlogs(blogs.concat(returnedBlog))
    updateNotificationType('success')
    updateNotificationMessage(
      `New blog created: "${title}" by ${author}`
    )

    toggleVisibility()

    setTimeout(() => {
      updateNotificationMessage(null)
    }, 5000)
    
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <button
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        New blog
      </button>
      <div style={showWhenVisible}>
        <h3>Create new blog</h3>
        <form onSubmit={handleCreateBlog}>
          <label htmlFor='title'>
            Title
          </label>
          <input
            data-testid='title'
            value={title}
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor='author'>
            Author
          </label>
          <input
            data-testid='author'
            value={author}
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <label htmlFor='url'>
            Url
          </label>
          <input
            data-testid='url'
            value={url}
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
          <button type='submit'>
            Create
          </button>
          <button type='button' onClick={toggleVisibility}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  updateNotificationType: PropTypes.func.isRequired,
  updateNotificationMessage: PropTypes.func.isRequired
}

export default BlogForm