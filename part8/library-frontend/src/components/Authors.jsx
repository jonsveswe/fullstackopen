import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  console.log('Authors render')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()
    const year = Number(e.target.year.value)
    const name = e.target.name.value
    editAuthor({ variables: { name, setBornTo: year } })
    e.target.year.value = ''
    e.target.name.value = ''
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2> Set birthyear </h2>
      <form onSubmit={submit}>
        <select name="name">
          {authors.map((a) => (
            <option key={a.name}>{a.name}</option>
          ))}
        </select>
        <div>
          born
          <input name="year" type="number" />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
