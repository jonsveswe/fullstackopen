import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  console.log('Books render')
  const result = useQuery(ALL_BOOKS)
  const [filterString, setFilterString] = useState('')

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <button onClick={() => setFilterString('')}>Reset</button>
      <button onClick={() => setFilterString('refactoring')}>refactoring</button>
      <button onClick={() => setFilterString('agile')}>agile</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.filter(b => filterString === '' || b.genres.includes(filterString)).map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
