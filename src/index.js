import "./style.css";

const createTodo = ({
  title,
  description,
  dueDate,
  priority = "low",
  checklist = false,
}) => ({
  title,
  description,
  dueDate,
  priority,
  checklist,
});

const createProject = (name) => {
  let todosList = [];
  return {
    name,
    addTodo(todoData) {
      todosList.push(createTodo(todoData));
    },
    deleteTodo(title) {
      todosList = todosList.filter((todo) => todo.title !== title);
    },
    showTodos() {
      console.log(todosList);
    },
  };
};

const todoApp = () => {
  let projects = [];
  if (projects.length === 0) {
    projects.push(createProject("default"));
  }

  return {
    showProjects() {
      console.log(projects);
    },
    addProject(name) {
      const newProject = createProject(name);
      projects.push(newProject);
      return newProject;
    },
    getProject(name) {
      return projects.find(elem => elem.name === name)
    },
    deleteProject(name) {
      projects = projects.filter((project) => project.name !== name);
    },
  };
};
const myApp = todoApp();
const study = myApp.addProject("study");
const gym = myApp.addProject("gym");

study.addTodo({
  title: "coding",
  description: "code for 90 min",
  dueDate: "today",
  priority: "high",
});
study.addTodo({
  title: "learning",
  description: "reading a new topic for 30min",
  dueDate: "today",
  priority: "medium",
});
gym.addTodo({ title: "beck press", description: "4 x 12", dueDate: "today" });

study.showTodos();
gym.showTodos();
study.deleteTodo("learning");
study.showTodos();
myApp.showProjects();
myApp.getProject("default").addTodo({ title: "Master JS Logic" });
myApp.getProject("default").showTodos();
myApp.showProjects();

