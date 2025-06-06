//? This is a todo app using http express server and store data into the array

const express = require("express");
const app = express();

app.use(express.json());
let todos = [];

//* create a route handler for creating a todo

app.post("/todos/create", (req, res) => {
  // get the todo and id of that todo from request body
  const { todo, id } = req.body;

  if (!todo || todo.trim() === "") {
    3;
    return res.status(400).send("Todo cannot be empty");
  }

  if (!id) {
    return res.status(400).send("Id cannot be empty");
  }

  // check if todo already exists with the given id
  const exists = todos.some((t) => t.id === id);
  if (exists) {
    return res.status(400).send(`Todo already exists with id ${id}`);
  }

  const newTodo = {
    title: todo,
    id: id,
  };

  todos.push(newTodo);
  res.status(201).send("Todo added successfully");
});

//* create a route handler for deleting a todo with given id

app.delete("/todos/delete/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  const originalLength = todos.length;
  todos = todos.filter((todo) => todo.id !== todoId);

  if (todos.length === originalLength) {
    return res.status(404).send("Todo not found");
  }

  res.send(`Todo with id ${todoId} deleted successfully`);
});

//* creat a route handler for deleting all todo

app.delete("/todos/delete/all", (req, res) => {
  console.log("DELETE ALL route hit");
  todos = [];
  res.send("All todos have been deleted");
});

//* create a route handler for updating a todo with given id

app.put("/todos/update/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { todo } = req.body;

  if (!todo && todo.trim() === "") {
    return res.status(400).send("Todo cannot be empty");
  }

  const index = todos.findIndex((t) => t.id === todoId);

  if (index === -1) {
    return res.status(404).send(`Todo with id ${todoId} not found`);
  }

  todos[index].title = todo;
  res.send(`Todo with id ${todoId} updated successfully`);
});

//* create a route handler to get all the todos(read all the todos from the array)

app.get("/todos/read/all", (req, res) => {
  if (todos.length === 0) {
    return res.status(404).send("No todos found");
  }

  res.status(200).json(todos);
});

//* create a route handler to get the todo with given id

app.get("/todos/read/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  const todo = todos.find((t) => t.id === todoId);

  if (!todo) {
    return res.status(404).send(`Todo with id ${todoId} not found`);
  }

  return res.status(200).json(todo);
});

const port = 3000;

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
