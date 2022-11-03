# HR_Manager

an employee management application for Badumts GmbH

---

# Requirements

### Bundle 1:

- Registration page so every employee can register itself ✅
- Employee must login before being able to use the application ✅
- Landing page as overview of existing employees ✅

### Bundle 2:

- A logged in employee can add another employee
- Ability to import employees over a CSV file

### Bundle 3:

- Being able to edit and delete employees

### Bundle 4:

- Add and display comments to employees on employee detail page
- Display author and date of the comment

---

## Backend

- User

  - user data
  - login
  - logout
  - add
  - edit
  - delete
  - export to csv

- Comments
  - comments data
  - add
  - edit
  - delete

## Url plan

/ -> Home
/join -> Join
/login -> Login

/user/:id -> see user
/user/edit -> Edit user
/user/delete -> Delete user
/user/logout -> Logout
