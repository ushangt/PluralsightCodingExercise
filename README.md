# Pluralsight Coding Exercise

### Tech Stack Used:

- Backend: Node.js/Express/REST
- Javascript Frontend: Node.js/Bootstrap Material/Jade
- Database: sqlite3, Sequelize, (Ruby for initialization)

### Steps to be followed after cloning the repo:

**1. Install dependencies:**

Make sure you have `Node JS` and `npm` installed. 
After that open Terminal at the project folder and hit `npm install`

**2. Load the Database:**

The database related files are all in the `db` folder. It has the challenege `CSV` dump as well.
The first step is to move the `csv` file contents into `sqlite3` database. It is done using a simple `Ruby` script. I am
not much of an expert on ruby and thus wrote some simple code. Anyways

`cd db/seed` and type `ruby seed-sqlite.rb`

This generates a `plural-sight.sqlite3` database file in the `db` folder.

**3. Run in development mode:**

Navigate back to the project `root` folder and type:

`npm start` and browse `http://localhost:3000/` on any modern browser.

To check the api endpoints either use [`POSTMAN`](https://www.getpostman.com/) or [`INSOMNIA`](https://insomnia.rest/).

### RESTful API Enpoints:

- GET: `/api/question` - Gets all the questions form the database
- GET: `/api/question/:id` - Gets the question specified by the `id`
- POST: `api/question` - Creates a new question & adds it to the database
- PUT: `/api/question/:id` - Updates an existing question with the specified `id`

Example Body for POST & PUT calls:

```
{
    "question" : "What is 400 * 4 ?",
    "answer" : "1600",
    "distractors" : "8000, 80"
}
```