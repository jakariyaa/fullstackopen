import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    borderRadius: 5
  }

  if (showDetails) {
    return (
      <div className='blog' style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowDetails(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username &&
          <button onClick={() => onDelete(blog)}>remove</button>}
      </div>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(true)}>view</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog