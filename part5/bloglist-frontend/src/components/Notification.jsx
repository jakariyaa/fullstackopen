import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  return (
    <h3 className={type === 'success'
      ? 'notification success' : 'notification error'} >
      {message}
    </h3>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification