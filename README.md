
# Expense Tracking Application [CM 3050 Mobile Development] - Frontend & Backend

Expense tracking application **Frontend** is developed using React Navit, React and its packages. **Backend** is developed using FastApi and SQL Model under the hood.

## Frontend

### Install Dependencies

Install expo globally:

```bash
$ npm install -g expo-cli
```

Install dependencies:


```bash
$ npm install
```

Run Application:

```bash
$ expo start
```

### Run Tests

Jest and react-test-renderer is used for teting purposes. 

To run tests
```bash
$ npm run test
```

### Linting 

Eslint is used for linting. All Linting error are fixed apart from lengths on code comment or typing (It is partially fixed on certain screens/components)

To run linting on a **directory**

```bash
$ npx eslint [Directory Name]

Run below command on a directory (If Eslint installed globally)

$ npm eslint [Directory Name]

Fix Linting error

$ npm eslint [Directory Name] --fix
```

To run linting on **file**

```bash
$ npx eslint [File Name].js or $ npx eslint [File Name].js --fix
```


### HTTP Configration / API Calls

HTTP is configured to call API running on a localhost http://127.0.0.1:8000 . Ensure server is running before using the application running on Expo.


## Backend

### Install Dependencies

Go to the project directory

```bash
  cd Backend/expense_app
```

Install dependencies

```bash
  poetry install
```

Start the server

```bash
  poetry run uvicorn ExpenseApp.main:app --reload
```

**Note: The server will run on localhost: http://127.0.0.1:8000 and Swagger documents could be access from a link http://127.0.0.1:8000/docs . Please ensure localhost is not in use with other application running in background, otherwise, it will give error.**

__It is assumed that Poetry is already installed in the system. If it is not installed then please follow the installation guide from official documentation before executing the above commands. [Peotry Installation](https://python-poetry.org/docs/#installation)__

Alternative procedure to run using __PIP__

Create a virtual envoirnment

```bash
  python -m venv expense_app
```

Go to the project directory

```bash
  cd my-project [It should be /expense_app or any preceding directory]
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
   uvicorn ExpenseApp.main:app --reload
```

[FastAPI Documentation](https://fastapi.tiangolo.com/)


### Database

Database (sqlite3) is also included for ease to refer the existing data already created while testing the application. You can access the user **test1** with the following credentials:

- **Username**: test1
- **Passwrod**: test1 

New users could be easily created using the signup screen from the front end and user specific expense/income transaction could also be posted once user is created and backend is live on a local host.


## Demo




## Tech Stack

**Frontend:** ReactNative, React,

**Backend:** FastAPI, SQLModel

