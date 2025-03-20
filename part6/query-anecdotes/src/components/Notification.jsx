import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = (props) => {
  // const { notification } = props
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    height: 15
  }

  // if (true) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
