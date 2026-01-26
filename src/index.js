const createTodo = (
  title,
  description,
  dueDate,
  priority,
  checklist = false,
) => {
  let completed = checklist;

  const toggleStatus = () => {
    completed = !completed;
    console.log(`Task "${title}" is now ${completed ? "DONE" : "PENDING"}.`);
  };
  const getStatus = () => completed;

  return {
    title,
    description,
    dueDate,
    priority,
    toggleStatus,
    getStatus,
  };
};

const createProject = (name) => {
  let todos = [];

  const getName = () => name;
  const addTodo = (todo) => {
    todos.push(todo);
    console.log(`Todo "${todo.title}" added to project "${name}".`);
  };
  const removeTodo = (index) => {
    todos.splice(index, 1);
    console.log(`Todo at index ${index} removed from project "${name}".`);
  };
  const getTodos = () => {
    console.log(`Todos in project "${name}":`);
    todos.forEach((todo, index) => {
        console.log(`${index}. [${todo.getStatus() ? "x" : " "}] ${todo.title} - Due: ${todo.dueDate} - Priority: ${todo.priority}`);
    }) 
  };

  return {
    getName,
    addTodo,
    removeTodo,
    getTodos,
  };
};

const sampleProject = createProject("Sample Project");
const todo1 = createTodo(
  "Sample Todo",
  "This is a sample todo item.",
  "2024-12-31",
  "High",
);
const todo2 = createTodo(
  "Another Todo",
  "This is another todo item.",
  "2024-11-30",
  "Medium",
  true,
);

sampleProject.addTodo(todo1);
sampleProject.addTodo(todo2);
sampleProject.getTodos();
todo1.toggleStatus();
sampleProject.getTodos();
sampleProject.removeTodo(1);
sampleProject.getTodos();
