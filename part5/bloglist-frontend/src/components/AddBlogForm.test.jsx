import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> updates parent state and calls onSubmit', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()
  render(<AddBlogForm addBlog={mockHandler} />)
  screen.debug()
  const input = screen.getByRole('textbox')
  const submitButton = screen.getByText('add blog')
  await user.type(input, 'A good title')
  await user.click(submitButton)
  console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('A good title')
})
