import { readFile } from 'fs/promises';

 const roles = JSON.parse(
    await readFile(
        new URL('../roles.json', import.meta.url)
    )
  ).roles
  
   const employees = JSON.parse(
    await readFile(
        new URL('../employees.json', import.meta.url)
    )
  ).employees;

  export { roles, employees };