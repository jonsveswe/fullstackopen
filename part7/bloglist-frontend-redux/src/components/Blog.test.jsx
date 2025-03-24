import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'mesa',
  title: 'kalix',
  url: 'www.me.com',
  likes: 3
}

describe('Blog component should render by default (without clicking view button):', () => {
  test('the title', () => {
    render(<Blog blog={blog} />)
    const element = screen.getByText(blog.title, { exact: false })
    expect(element).toBeDefined()
  })
  test('the title and author but not the url', () => {
    render(<Blog blog={blog} />)
    const element = screen.getByText(`${blog.title} ${blog.author}`, { exact: true })
    screen.debug(element)
    expect(element).toBeDefined()
  })
  test('not the url', () => {
    render(<Blog blog={blog} />)
    screen.debug()
    const element = screen.queryByText(blog.url)
    expect(element).toBeNull()
  })
})

describe('After clicking the view button, the Blog component should:', () => {
  test('render the url and number of likes', async () => {
    const { container } = render(<Blog blog={blog} />)
    const user = userEvent.setup()
    screen.debug()
    // const button = screen.getByText('view')
    const button = container.querySelector('#button-view')
    await user.click(button)
    screen.debug()
    const element = screen.getByText(blog.url, { exact: true })
    screen.debug(element)
    expect(element).toBeDefined()
    const element2 = screen.getByText(`likes: ${blog.likes}`, { exact: true })
    expect(element2).toBeDefined()
  })
})

describe('After clicking the like button', () => {
  test('twice, the event handler Blog component receives as prop is called twice', async () => {
    const mockHandler = vi.fn()
    const { container } = render(<Blog blog={blog} updateLikes={mockHandler} />)
    const user = userEvent.setup()
    const buttonView = container.querySelector('#button-view')
    await user.click(buttonView)
    const buttonLikes = container.querySelector('#button-likes')
    await user.click(buttonLikes)
    await user.click(buttonLikes)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
