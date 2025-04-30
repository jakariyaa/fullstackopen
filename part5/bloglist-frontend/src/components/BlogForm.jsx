import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>title: <input type="text" placeholder='Enter blog title' value={title}
          onChange={({ target }) => { setTitle(target.value) }} /></div>
        <div>author: <input type="text" placeholder='Enter blog author' value={author}
          onChange={({ target }) => { setAuthor(target.value) }} /></div>
        <div>url: <input type="text" placeholder='Enter blog URL' value={url}
          onChange={({ target }) => { setUrl(target.value) }} /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm