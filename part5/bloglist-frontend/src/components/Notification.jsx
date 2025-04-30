const Notification = ({ message, type }) => {
  return (
    <h3 className={type === 'success'
      ? 'notification success' : 'notification error'} >
      {message}
    </h3>
  )
}

export default Notification