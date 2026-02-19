export const createTodo = ({
  id = Date.now() + Math.random(),
  title,
  description,
  dueDate,
  priority = "low",
  checklist = false,
}) => ({
  id,
  title,
  description,
  dueDate,
  priority,
  checklist,
});

//Create project
export const createProject = (name) => {
  const id = Date.now() + Math.random();
  let todosList = [];
  return {
    id,
    name,
    addTodo(todoData) {
      todosList.push(createTodo(todoData));
    },
    deleteTodo(id) {
      todosList = todosList.filter((todo) => todo.id !== id);
    },
    getTodos() {
      return todosList;
    },
  };
};