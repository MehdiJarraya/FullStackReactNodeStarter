import express from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { SearchEmployeesByName, getEmployees, SaveEmployee } from './routes/employee';
import { GetRoleByCode, getRoles, SaveRole } from './routes/role';

// export const roles = JSON.parse(
//   await readFile(
//       new URL('../roles.json', import.meta.url)
//   )
// ).roles

// export const employees = JSON.parse(
//   await readFile(
//       new URL('../employees.json', import.meta.url)
//   )
// );


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
