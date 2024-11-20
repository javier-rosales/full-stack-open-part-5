import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const blogs = [
    {
      "title": "How to build a PC Gamer",
      "author": "Javier Rosales",
      "url": "build-pc-gamer.com",
      "likes": 16,
      "user": {
        "username": "javier-rosales",
        "name": "Javier Rosales",
        "id": "6733cb686859c24c555c58a0"
      },
      "id": "6733cc0b6859c24c555c58a4"
    },
    {
      "title": "How to replace a laptop SSD",
      "author": "Javier Rosales",
      "url": "how-to-laptop.com",
      "likes": 14,
      "user": {
        "username": "javier-rosales",
        "name": "Javier Rosales",
        "id": "6733cb686859c24c555c58a0"
      },
      "id": "67340a7cc0b4a2ec0a20138c"
    },
    {
      "title": "React vs Vue",
      "author": "Javier Benitez",
      "url": "reactvsvue.com",
      "likes": 2,
      "user": {
        "username": "javier-benitez",
        "name": "Javier Benitez",
        "id": "67369a33d92c3eae74071bd1"
      },
      "id": "6736c3994aedc6673ea50480"
    }
  ]

  test('The form calls updateBlogs when a new blog is created', async () => {
    const mockHandler = vi.fn()
    
    render(<BlogForm blogs={blogs} updateBlogs={mockHandler} />)
    
    const user = userEvent.setup()
    const buttonView = screen.getByText('Create')
    await user.click(buttonView)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})