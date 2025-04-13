const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.type === 'error') {
    return (
      <div className='error'>
        {message.content}
      </div>
    )
  }

  return (
    <div className='notification'>
      {message.content}
    </div>
  )
}

export default Notification