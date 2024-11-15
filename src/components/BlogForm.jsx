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
        New note
      </button>
      <div style={showWhenVisible}>
        <h3>Create new blog</h3>
        <form onSubmit={handleCreateBlog}>
          <label htmlFor='title'>
            Title
          </label>
          <input
            value={title}
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor='author'>
            Author
          </label>
          <input
            value={author}
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <label htmlFor='url'>
            Url
          </label>
          <input
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

export default BlogForm