import Table from 'react-bootstrap/Table';

const Events = () => {
  return (
    <Table responsive bordered size="sm">
      <thead>
        <tr>
          <th>Events</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 12 }).map((_, index) => (
          <tr>
            <td key={index}>Table cell {index}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Events