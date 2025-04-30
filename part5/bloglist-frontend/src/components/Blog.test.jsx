import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Robert C. Martin',
  url: 'https://testing-library.com/docs/example-react',
  user: {
    username: 'root',
    name: 'Robert C. Martin',
  },
  likes: 42,
}
const user = {
  username: 'root',
  name: 'Robert C. Martin',
}
const onDelete = () => {
  console.log('delete blog')
}

test('renders title & author', () => {
  const { container } = render(<Blog blog={blog} user={user} onDelete={onDelete} />)

  // first method
  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()

  // second method
  // const div = container.querySelector('.blog')
  // expect(div).toHaveTextContent(
  //   `${blog.title} ${blog.author}`
  // )
})

test('does not render url & likes by default', () => {
  render(<Blog blog={blog} user={user} onDelete={onDelete} />)

  const element = screen.queryByText(blog.url)
  const element2 = screen.queryByText(`likes ${blog.likes}`)

  expect(element).toBeNull()
  expect(element2).toBeNull()
})

test('displays URL and likes when view button is clicked', async () => {
  render(<Blog blog={blog} user={user} onDelete={onDelete} />)

  const userEv = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userEv.click(viewButton)

  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.getByText(`likes ${blog.likes}`)).toBeDefined()
})

test('calls event handler twice when like button is clicked twice', async () => {

  const mockLikeHandler = vi.fn()

  render(<Blog blog={blog} user={user} onDelete={onDelete} handleLike={mockLikeHandler} />)

  const userEv = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userEv.click(viewButton)

  const likeButton = screen.getByText('like')
  await userEv.click(likeButton)
  await userEv.click(likeButton)

  expect(mockLikeHandler).toHaveBeenCalledTimes(2)
})