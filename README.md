Question 4/4

"Fullstack Developer - Node.JS + React.JS"

Your solution will be scored against a series of unit test cases and a grading script.


EXERCISE TEXT

 

For this task, you will be creating a single page application that reads some information from an API (which you will also be creating), and then displaying the information in a table, in a stylized manner.

 

BACKEND



Here are the steps you need to follow for the API:



First thing’s first, you can use the Internet to research documentation/commands for this
Please make sure your API calls provide the result via the response.send(result) method, otherwise the test cases will fail
Create a single-page application using the npx create-react-app upstack-test command.
Move to the upstack-test folder once everything is done ( cd upstack-test ).
Create a file called employees.json, which will contain some Employee data that will be provided below.
Create a file called roles.json which will contain some Role data that will be provided below.
Once that is finished, you need to create the Rest API. Ideally, you should use express. Note that you may need to install it in your project folder (npm install express).
Create class mappings for each entity, based on the data from the JSON files.
Using any design patterns and choices you see fit, implement the following Controllers/Services and methods
Employee
SearchEmployeesByName() (Route: employees/search/:name, method: GET)
GetEmployees() (Route: employees/all, method: GET)
SaveEmployee(EmployeeViewObject employee) (Route: employees/save, method: POST)
Roles
 GetRoles() (Route: roles/all, method: GET)
GetRoleByCode() (Route: roles/:code, method: GET)
SaveRole(RoleViewObject role) (Route: roles/save, method: POST)
 

THINGS TO CONSIDER FOR THE BACKEND SIDE









The app must run on port 3001. Please use this exact port because it is used in grading your solution.
Save methods don’t need to persist any data to the files, but the implementation should mimic the behavior of a method that persist something to a file/database
Search methods are case insensitive and should return all entries that contain the search string on the given property
While this is only an API, please take into consideration the fact that when returning employee details, the view object should contain the role name and role code somewhere in order for them to be potentially displayed
An employee must always have a role assigned to them; take that into account when creating the SaveEmployee method 
Employee username and email must be unique, so take that into consideration when implementing the method
Role codes must be unique
EmployeeViewObject and RoleViewObject are names that designate that the object is used in a view; you can name the classes as you desire
Use any and all data validation rules that you see fit


FRONTEND

 

Here are the steps you need to follow for the frontend side:











Using axios, create a service that retrieves the information from the server you created earlier. The URL for the server is visible in the top left of your Worskpace IDE, just replace 3000 with 3001.
Create a method that retrieves the employee data and display it in a table;
Create a method that searches for employees based on name. It’s going to be called via a button press and replace the data from the table with the returned results. If no rows are returned, display something like “No employees found”.
Using Bootstrap, another framework of your choice, or custom CSS that you write from scratch, style the page to have the look and feel mentioned above.
Make sure the solution is also responsive and adaptive, i.e. elements change size and position based on screen resolution so that it looks good on any device and on any resolution
BONUS STEPS
1.   Implement pagination

2.   Implement alphabetical sorting

 

THINGS TO CONSIDER FOR THE FRONTEND PART











You can search for any questions you have regarding the documentation of the frameworks you decide to use
You can create as many components as you like
You can use any extra frameworks you like (i.e. fontawesome, bootstrap, tailwind, etc.)
How you organize and document your code is important, so please pay attention to leave it in an orderly manner
Do not change the Rest API method URLs, as they are used to grade your solution


JSON DATA FOR EMPLOYEES.JSON

{

  "employees": [

    { "id": 1, "name": "Tony Stark", "email": "tony.stark@avengers.com", "username": "tonystark", "role_id": 1},

    { "id": 2, "name": "Steve Rogers", "email": "steve.rogers@avengers.com", "username": "steverogers", "role_id": 2 },

    { "id": 3, "name": "Clint Barton", "email": "clint.barton@avengers.com", "username": "clintbarton", "role_id": 3 },

    { "id": 4, "name": "Natasha Romanoff", "email": "natasha.romanoff@avengers.com", "username": "natasharomanoff", "role_id": 4 },

    { "id": 5, "name": "Thor Odinson", "email": "thor.odinson@avengers.com", "username": "thorodinson", "role_id": 5 },

    { "id": 6, "name": "Nick Fury", "email": "nick.fury@avengers.com", "username": "nickfury", "role_id": 6 },

    { "id": 7, "name": "Bruce Banner", "email": "bruce.banner@avengers.com", "username": "brucebanner", "role_id": 7 },

    { "id": 8, "name": "Maria Hill", "email": "maria.hill@avengers.com", "username": "mariahill", "role_id": 8 },

    { "id": 9, "name": "Bucky Barnes", "email": "bucky.barnes@avengers.com", "username": "buckybarnes", "role_id": 9 },

    { "id": 10, "name": "Peter Parker", "email": "peter.parker@avengers.com", "username": "peterparker", "role_id": 10 }

  ]

}

 

JSON DATA FOR ROLES.JSON

{

  "roles": [

    { "id": 1, "role_code": "genius", "role_name": "Genius" },

    { "id": 2, "role_code": "leader", "role_name": "Leader" },

    { "id": 3, "role_code": "quinn", "role_name": "Arrow Man" },

    { "id": 4, "role_code": "spy", "role_name": "Master Spy" },

    { "id": 5, "role_code": "hammergod", "role_name": "God Of Hammers" },

    { "id": 6, "role_code": "organizer", "role_name": "Organizer of Stuff" },

    { "id": 7, "role_code": "hulksmash", "role_name": " Smasher Of Things...also scientist" },

    { "id": 8, "role_code": "cto", "role_name": "CTO" },

    { "id": 9, "role_code": "wintersoldier", "role_name": "Winter Soldier" },

    { "id": 10, "role_code": "spiderman", "role_name": "Spiderman" }

  ]

}