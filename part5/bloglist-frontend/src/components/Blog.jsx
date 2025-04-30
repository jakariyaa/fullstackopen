import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLike = async () => {
    blog.likes = blog.likes + 1
    const response = await blogService.update(
      blog.id, blog
    )
    setBlogLikes(blog.likes)
  }

  if (showDetails) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowDetails(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>likes {blogLikes} <button onClick={increaseLike}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(true)}>view</button>
      </div>
    </div>
  )
}

export default Blog