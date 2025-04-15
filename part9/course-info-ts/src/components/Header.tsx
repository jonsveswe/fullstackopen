interface HeaderProps {
  header: string;
}

const Header = (props: HeaderProps) => {
  return (
    <h1>{props.header}</h1>
  )
}

export default Header