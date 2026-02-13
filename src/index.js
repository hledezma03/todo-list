import "./style.css";

const createTodo = (
  title,
  descripction,
  dueDate,
  priority,
  checklist = false,
) => {
  return {
    title,
    descripction,
    dueDate,
    priority,
    // checklist,
    // showTodo() {
    //   console.log(`${title}`);
    //   console.log(`${descripction}`);
    //   console.log(`${dueDate}`);
    //   console.log(`${priority}`);
    //   console.log(`${checklist}`);
    // },
  };
};

const createProject = (name) => {
  let todosList = [];
  return {
    name,
    addTodo(title, descripction, dueDate, priority) {
      todosList.push(createTodo(title, descripction, dueDate, priority));
    },
    deleteTodo(title) {
      todosList = todosList.filter((todo) => todo.title !== title);
    },
    showTodos() {
      console.log(todosList)
    }
  };
};

const study = createProject('study');
const gym = createProject('gym');

study.addTodo("coding", "code for 90 min", "today", "high");
study.addTodo("learning", "reading a new topic for 30min", "today", "medium");
gym.addTodo("beck press", "4 x 12", "today", "low");

study.showTodos()
gym.showTodos()
study.deleteTodo('learning')
study.showTodos()
