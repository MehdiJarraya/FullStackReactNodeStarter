import express from 'express';
import cors from 'cors';
import { SearchEmployeesByName, getEmployees, SaveEmployee } from './routes/employee';
import { GetRoleByCode, getRoles, SaveRole } from './routes/role';

var app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get("/employees/search/:name", SearchEmployeesByName)
app.get("/employees/all", getEmployees)
app.post("/employees/save", SaveEmployee)
app.get("/roles/all", getRoles)
app.get("/roles/:code", GetRoleByCode)
app.post("/roles/save", SaveRole)


app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
