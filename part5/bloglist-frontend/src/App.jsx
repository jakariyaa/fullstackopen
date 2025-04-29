import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const Notification = ({ message, type }) => {
  return (
    <h3 className={type === 'success'
      ? 'notification success' : 'notification error'} >
      {message}
    </h3>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotif({
        message: `wrong username or password`,
        type: `error`
      })
      setTimeout(() => {
        setNotif(null)
      }, 5000)
      console.log(error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleAddBlog = async (newBlog) => {
    const response = await blogService.create(newBlog)
    setNotif({
      message: `a new blog ${response.title} by ${response.author} added`,
      type: `success`
    })
    setTimeout(() => {
      setNotif(null)
    }, 7000)
    setBlogs(blogs.concat(response))
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        {notif && <Notification message={notif.message} type={notif.type} />}
        <form onSubmit={handleLogin}>
          <div>
            username <input type='text' autoComplete='username'
              value={username} onChange={({ target }) => { setUsername(target.value) }} />
          </div>
          <div>
            password <input type='password' autoComplete='current-password'
              value={password} onChange={({ target }) => { setPassword(target.value) }} />
          </div>
          <button type='submit'>Log In</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notif && <Notification message={notif.message} type={notif.type} />}
      <div>{user.name} is logged in <button
        onClick={handleLogout}>Log Out</button>
        <Togglable buttonLabel='create new blog'>
          <BlogForm createBlog={handleAddBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App