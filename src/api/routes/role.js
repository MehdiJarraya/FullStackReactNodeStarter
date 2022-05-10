import { roles } from '../db'

const GetRoleByCode = (req, res) => {
    const code = req?.params?.code
    const regexObj = new RegExp(code, 'i')
    const role = roles.find(item =>
        item.role_code.match(regexObj)
    )
    if(!role){
        return res.status(404).send({ error: true, code: "ROLE_NOT_FOUND" })
    }
    return res.status(200).send(role)
}

const getRoles = (req, res) => {
    return res.status(200).send(roles)
}

const SaveRole = (req, res) => {
    const role = req.body
    //validate data
    if (!role || !role.role_code ||
        !role.role_name) {
        return res.status(400).send({ error: true, code: "INVALID_ROLE" })
    }

    const regexObjCode = new RegExp(role.role_code, 'i')
    const roleWithSameCode = roles.find(item =>
        item.role_code.match(regexObjCode)
    )
    if (roleWithSameCode) {
        return res.status(400).send({ error: true, code: "CODE_EXIST" })
    }

    const newRole = { ...role, id: roles.length + 1 }
    roles.push(newRole)
    return res.status(201).send(newRole)
}


export { SaveRole, getRoles, GetRoleByCode };