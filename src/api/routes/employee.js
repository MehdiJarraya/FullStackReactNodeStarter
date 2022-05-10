import { roles, employees } from '../db'

const employeesWithRoles = [
    ...employees.map(e => {
        // retrieve employee role details
        const role = roles.find(r => r.id === e.role_id)
        return { ...e, role_code: role.role_code, role_name: role.role_name }
    })]


const SearchEmployeesByName = (req, res) => {
    const name = req.params?.name
    const regexObj = new RegExp(name, 'i')
    const filteredEmployees = employeesWithRoles.filter(item =>
        item.name.match(regexObj)
    )
   return res.status(200).send(filteredEmployees)
}

const getEmployees = (req, res) => {
    return res.status(200).send(employeesWithRoles)
}

const SaveEmployee = (req, res) => {
    const employee = req.body
    //validate data
    if (!employee || !employee.role_id ||
        !employee.name || !employee.email
        || !employee.username) {
        return res.status(400).send({ error: true, code: "INVALID_EMPLOYEE" })
    }

    // check if email exist
    const regexObjEmail = new RegExp(employee.email, 'i')
    const employeeWithSameEmail = employeesWithRoles.find(item =>
        item.email.match(regexObjEmail)
    )
    if (employeeWithSameEmail) {
        return res.status(400).send({ error: true, code: "EMAIL_EXIST" })
    }
    // check if username exist
    const regexObjUsername = new RegExp(employee.username, 'i')
    const employeeWithSameUsername = employeesWithRoles.find(item =>
        item.username.match(regexObjUsername)
    )
    if (employeeWithSameUsername) {
        return res.status(400).send({ error: true, code: "USERNAME_EXIST" })
    }
    const newEmployee = { ...employee, id: employees.length + 1 }

    // retrieve employee role details
    const employeeRoleDetails = roles.find(r => r.id === newEmployee.role_id)
    if (!employeeRoleDetails) {
        return res.status(400).send({ error: true, code: "INVALID_ROLE" })
    }
    employeesWithRoles.push(newEmployee)
    console.log("pushed");

    return res.status(201).send({ ...newEmployee, role_code: employeeRoleDetails.role_code, role_name: employeeRoleDetails.role_name })
}


export { SearchEmployeesByName, getEmployees, SaveEmployee };