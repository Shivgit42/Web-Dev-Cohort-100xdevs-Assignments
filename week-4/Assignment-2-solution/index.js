const fs = require("fs");
const { Command } = require("commander");
const path = require("path");
const program = new Command();

const todosFilePath = path.join(__dirname, "todos.json");

//helper function to read the file
function readTodos() {
  if (!fs.existsSync(todosFilePath)) {
    return [];
  }
  const data = fs.readFileSync(todosFilePath, "utf-8");
  return JSON.parse(data || "[]");
}

//helper function to write file
function writeTodos(todos) {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), "utf-8");
}

//command to add a new todo
program
  .command("add")
  .description("Add a new todo item")
  .argument("<Todo_Title>", "Enter a todo")
  .argument("<Time>", "Enter a finish time")
  .action((todoTitle, time) => {
    const todos = readTodos();

    const newTodo = {
      Title: todoTitle,
      DeadLine: time,
      Done: false,
    };

    todos.push(newTodo);
    writeTodos(todos);
    console.log("Todo added successfully");
  });

// command to remove todo
program
  .command("delete")
  .description("Delete an existing todo item")
  .argument("<Todo_Title>", "Enter the todo title to delete ")
  .action((todoTitle) => {
    let todos = readTodos();
    const normalizedTitle = todoTitle.trim().toLowerCase();

    const filteredTodos = todos.filter(
      (todo) => todo.Title.trim().toLowerCase() !== normalizedTitle
    );
    if (filteredTodos.length === todos.length) {
      console.log(`❌ No todo found with title: ${todoTitle}`);
    } else {
      writeTodos(filteredTodos);
      console.log(`✅ Todo "${todoTitle}" deleted successfully`);
    }
  });

//command to mark a todo as done
program
  .command("mark")
  .description("Mark a todo item as a done")
  .argument("<Todo_Title>", "Enter the todo title to mark as a done")
  .action((todoTitle) => {
    let todos = readTodos();
    let todoFound = false;

    todos = todos.map((todo) => {
      if (todo.Title === todoTitle) {
        todo.Done = true;
        todoFound = true;
      }
      return todo;
    });
    if (todoFound) {
      writeTodos(todos);
      console.log(`✅ Marked "${todoTitle} as done"`);
    } else {
      console.log(`❌ No todo found with title: ${todoTitle}`);
    }
  });

//command to update existing todo
program
  .command("update")
  .description("Update an existing todo title/deadline")
  .argument("<Old_Todo_Title>", "Enter the current todo title ")
  .argument("<New_Todo_Title>", "Enter the new todo title ")
  .argument("<New_Deadline>", "Enter the new todo deadline ")
  .action((oldTitle, newTitle, newDeadline) => {
    let todos = readTodos();
    let updated = false;

    todos.map((todo) => {
      if (todo.Title.trim().toLowerCase() === oldTitle.trim().toLowerCase()) {
        todo.Title = newTitle;
        todo.DeadLine = newDeadline;
        updated = true;
      }
      return todo;
    });
    if (updated) {
      writeTodos(todos);
      console.log(
        `✅ Updated "${oldTitle}" to "${newTitle}" with deadline "${newDeadline}"`
      );
    } else {
      console.log(`❌ No todo found with title: "${oldTitle}"`);
    }
  });

program.parse();
