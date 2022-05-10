import { Button, Container, FormControl, InputGroup } from 'react-bootstrap'
import React, { useState, useEffect } from "react"
import axios from "axios"
import CustomTable from "./components/CustomTable"
import { employeeColumns } from "./constants"
import Spinner from 'react-bootstrap/Spinner'
import './App.css';

function App() {

  // const backendUrl = process.env.BACKEND_URL 
  const backendUrl = 'http://localhost:3001'

  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState([])
  const [searchedName, setSearchedName] = useState("")

  const searchHandler = async () => {
    setLoading(true)
    const url = searchedName ? `${backendUrl}/employees/search/${searchedName}` : `${backendUrl}/employees/all`
    const result = await axios.get(url)
    if (result?.data) {
      setEmployees(result?.data)
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    console.log("searchedName", searchedName);
    setSearchedName(e.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchHandler()
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      const result = await axios.get(`${backendUrl}/employees/all`)
      if (result?.data) {
        setEmployees(result?.data)
      }
      setLoading(false)
    })()
  }, []);

  if (loading) {
    return <Container className="App">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  }

  return (
    <Container className="App">
      <InputGroup className="m-3">
        <FormControl
          placeholder="Employee name"
          aria-label="Employee name"
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
          value={searchedName}
          onKeyDown={handleKeyDown}
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
