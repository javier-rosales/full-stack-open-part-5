import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    id: '6733cc0b6859c24c555c58a4',
    title: 'How to build a PC Gamer',
    author: 'Javier Rosales',
    url: 'build-pc-gamer.com',
    likes: 15,
    user: {
      username: 'javier-rosales',
      name: 'Javier Rosales',
      id: '6733cb686859c24c555c58a0'
    }
  }

  test('renders title and author, but does not render url and likes by default', () => {  
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('How to build a PC Gamer')
    expect(div).toHaveTextContent('Javier Rosales')
    expect(div).not.toHaveTextContent('build-pc-gamer.com')
    expect(div).not.toHaveTextContent('15')
  })

  test('url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    
    expect(div).toHaveTextContent('build-pc-gamer.com')
    expect(div).toHaveTextContent('15')
  })
  
  test('if like button is pressed twice, updateBlogs is called twice', async () => {
    const mockHandler = vi.fn()
    
    render(<Blog blog={blog} updateBlogs={mockHandler} />)
    
    const user = userEvent.setup()
    const buttonView = screen.getByText('View')
    await user.click(buttonView)

    const buttonLike = screen.getByText('Like')
    await user.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})