import { Container } from 'react-bootstrap';
import './App.css';
import { employeeColumns, employeeData } from './components/constants';
import CustomTable from './components/CustomTable';



function App() {
  return (
    <Container className="App">
      <CustomTable 
      data={employeeData.map((item) => ({
        // item field that should be displayed in table
        "name": item.name,
        "email":item.email,
        // mapping of nested field
        "role":item.role?.role_code
      }))}
      columns={employeeColumns}
      totalCount={employeeData.length}
      limit={5}
      />
    </Container>

  );
}

export default App;
