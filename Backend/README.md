## How to run

- Go to Backend (`cd Backend`).
- rename .env.example to .env and update value in this file.
- execute command `npm i`
- Run application `npm start`
- Production build `npm run build`
- Lint `npm run lint`
- Apis
  - Login
    - Url: `/api/auth/signin`
    - Type: `post`
    - Body: `{
        "email": '',
        "password": ''
    }`

  - Signup
    - Url: `/api/auth/signup`
    - Type: `post`
    - Body: `{
        "name": '',
        "email": '',
        "password": ''
    }`

  - Create Task 
    - Url: `/api/task`
    - Type: `post`
    - Header: Authorization : '<Token>'
    - Body: `{
        "name": '',
        "description": '',
        "status": '',
        "priority": ''
    }`

  - Update Task 
    - Url: `/api/task/:id`
    - Type: `patch`
    - Header: Authorization : '<Token>'
    - Body: `{
        "name": '',
        "description": '',
        "status": '',
        "priority": ''
    }`

  - Delete Task 
    - Url: `/api/task/:id`
    - Type: `delete`
    - Header: Authorization : '<Token>'

  - Get Task 
    - Url: `/api/task`
    - Type: `get`
    - Header: Authorization : '<Token>'
    - params: `{
        "search": '', // Search On name or description
        "status": '', // Search On status
        "priority": '', // Search On priority
        "limit": '',
        "offset" : '', 
        "sortField": '',
        "sortType": '',
    }`

