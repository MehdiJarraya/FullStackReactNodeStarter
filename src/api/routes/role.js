import { readFile } from 'fs/promises';

export const roles = JSON.parse(
    await readFile(
        new URL('../../roles.json', import.meta.url)
    )
).roles

const GetRoleByCode = (req, res) => {
    const code = req?.params?.code
    const regexObj = new RegExp(code, 'i')
    const filtedRoles = roles.filter(item =>
        item.role_code.match(regexObj)
    )
    res.status(200).send(filtedRoles)
}

const getRoles = (req, res) => {
    res.status(200).send(roles)
}

const SaveRole = (req, res) => {
    const role = req.body?.role

    //validate data
    if (!role || !role.role_code ||
        !role.role_name) {
        res.status(400).send({ error: true, code: "ROLE_NOT_VALID" })
    }

    const regexObjCode = new RegExp(role.role_code, 'i')
    const roleWithSameCode = roles.find(item =>
        item.role_code.match(regexObjCode)
    )
    if (roleWithSameCode) {
        res.status(400).send({ error: true, code: "CODE_EXIST" })
    }

    const newRole = { ...role, id: roles.length + 1 }
    roles.push(newRole)
    res.status(201).send(newRole)
}


export { SaveRole, getRoles, GetRoleByCode };