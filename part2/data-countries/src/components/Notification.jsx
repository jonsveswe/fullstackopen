const Notification = (props) => {
    console.log('inside Notification, props:', props)
    const { message, type } = props
    if (message === null) {
        return null
    }
    return (
        <div className={type}>
            {message}
        </div>
    )
}
export default Notification