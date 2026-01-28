import './style.css';

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
