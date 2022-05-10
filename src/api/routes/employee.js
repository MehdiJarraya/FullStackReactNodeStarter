import { readFile } from 'fs/promises';

const roles = JSON.parse(
    await readFile(
        new URL('../../roles.json', import.meta.url)
    )
).roles;

const employees = JSON.parse(
    await readFile(
        new URL('../../employees.json', import.meta.url)
    )
).employees;

const employeesWithRoles = [
    ...employees.map(e => {
        // retreive employee role details
        const role = roles.find(r => r.id === e.role_id)
        return { ...e, role_code: role.role_code, role_name: role.role_name }
    })]


const SearchEmployeesByName = (req, res) => {
    const name = req.params?.name
    const regexObj = new RegExp(name, 'i')
    const filtredEmployees = employeesWithRoles.filter(item =>
        item.name.match(regexObj)
    )
    res.status(200).send(filtredEmployees)
}

const getEmployees = (req, res) => {
    res.status(200).send(employeesWithRoles)
}

const SaveEmployee = (req, res) => {
    const employee = req.body?.employee

    //validate data
    if (!employee || !employee.role_id ||
        !employee.name || !employee.email
        || !employee.username) {
        res.status(400).send({ error: true, code: "EMPLOYEE_NOT_VALID" })
    }

    // check if email exist
    const regexObjEmail = new RegExp(employee.email, 'i')
    const employeeWithSameEmail = employeesWithRoles.find(item =>
        item.email.match(regexObjEmail)
    )
    if (employeeWithSameEmail) {
        res.status(400).send({ error: true, code: "EMAIL_EXIST" })
    }
    // check if username exist
    const regexObjUsername = new RegExp(employee.username, 'i')
    const employeeWithSameUsername = employeesWithRoles.find(item =>
        item.username.match(regexObjUsername)
    )
    if (employeeWithSameUsername) {
        res.status(400).send({ error: true, code: "USERNAME_EXIST" })
    }
    const newEmployee = { ...employee, id: employees.length + 1 }
    employeesWithRoles.push(newEmployee)

    // retreive employee role details
    const employeeRoleDetails = roles.find(r => r.id === newEmployee.role_id)
    res.status(201).send({ ...newEmployee, role_code: employeeRoleDetails.role_code, role_name: employeeRoleDetails.role_name })
}


export { SearchEmployeesByName, getEmployees, SaveEmployee };