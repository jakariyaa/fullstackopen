import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import BlogForm from './BlogForm'

test('calls onSubmit with correct details when new blog is created', async () => {
  const mockCreateBlog = vi.fn()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('Enter blog title')
  const authorInput = screen.getByPlaceholderText('Enter blog author')
  const urlInput = screen.getByPlaceholderText('Enter blog URL')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Understanding React Testing')
  await user.type(authorInput, 'Tester Jane')
  await user.type(urlInput, 'https://example.com/react-testing')
  await user.click(createButton)

  expect(mockCreateBlog).toHaveBeenCalledTimes(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual({
    title: 'Understanding React Testing',
    author: 'Tester Jane',
    url: 'https://example.com/react-testing'
  })
})
