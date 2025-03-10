const Notification = (props) => {
  const { errorMessage, successMessage } = props
  if (errorMessage === null && successMessage === null) {
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