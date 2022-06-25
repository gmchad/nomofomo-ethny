import logo from './logo.svg';
import './App.css';
import Table from 'react-bootstrap/Table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Table responsive bordered hover size="sm">
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
      </header>
    </div>
  );
}

export default App;
