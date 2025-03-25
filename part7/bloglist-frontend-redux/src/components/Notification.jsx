
import { useSelector } from 'react-redux'
const Notification = (props) => {
  // const { errorMessage, successMessage } = props
  const notification = useSelector(state => state.notification)
  const errorMessage = notification.errorMessage
  const successMessage = notification.successMessage
  if (!errorMessage && !successMessage) {
    return null
  }
  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  if (successMessage) {
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  }
}

export default Notification