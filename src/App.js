import { Button, Container, FormControl, InputGroup } from 'react-bootstrap'
import React, { useState, useEffect } from "react"
import axios from "axios"
import CustomTable from "./components/CustomTable"
import { employeeColumns } from "./constants"
import './App.css';

function App() {

  // const backendUrl = process.env.BACKEND_URL 
  const backendUrl = 'http://localhost:3001'

  const [employees, setEmployees] = useState([])
  const [searchedName, setSearchedName] = useState("")

  const searchHandler = async () => {
    const url = searchedName ? `${backendUrl}/employees/search/${searchedName}` : `${backendUrl}/employees/all`
    const result = await axios.get(url)
    console.log("result", result);
    if (result?.data) {
      setEmployees(result?.data)
    }
  }

  const handleInputChange = (e) => {
    console.log("searchedName", searchedName);
    setSearchedName(e.target.value)
  }

  useEffect(() => {
    (async () => {
      const result = await axios.get(`${backendUrl}/employees/all`)
      if (result?.data) {
        setEmployees(result?.data)
      }
    })()
  }, []);

  return (
    <Container className="App">
      <InputGroup className="m-3">
        <FormControl
          placeholder="Employee name"
          aria-label="Employee name"
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
          value={searchedName}

        />
        <Button variant="primary" id="button-addon2"
          onClick={searchHandler}>
          Search
        </Button>
      </InputGroup>


      {employees.length > 0 ? <CustomTable data={employees} columns={employeeColumns} limit={5} /> : <h3>No employees found</h3>}
    </Container>

  );
}

export default App;
