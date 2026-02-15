import "./style.css";
//Create todo
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
//Create project
const createProject = (name) => {
  const id = Date.now() + Math.random();
  let todosList = [];
  return {
    id,
    name,
    addTodo(todoData) {
      todosList.push(createTodo(todoData));
    },
    deleteTodo(title) {
      todosList = todosList.filter((todo) => todo.title !== title);
    },
    getTodos() {
      return todosList;
    },
  };
};

//Display Controller
const displayController = (onProjectSelect) => {
  //Get the projects container
  const projectListContainer = document.getElementById("project-list");
  //Event to know when a project has been clicked
  projectListContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      onProjectSelect(e.target.dataset.index);
    }
  });
  return {
    renderProject(projectsArray) {
      //Clean the screen
      projectListContainer.innerHTML = "";
      projectsArray.forEach((project, i) => {
        //Create project element
        const projectElement = document.createElement("li");
        projectElement.textContent = project.name;
        projectElement.dataset.index = i;
        //Add the project to the projectListContainer
        projectListContainer.appendChild(projectElement);
      });
    },
  };
};

//Main controller
const todoApp = () => {
  let projects = [];
  let currentProject = null;
  //Create default project if there are no projects
  if (projects.length === 0) {
    projects.push(createProject("default"));
  }

  return {
    addProject(name) {
      const newProject = createProject(name);
      projects.push(newProject);
      return newProject;
    },
    getProjects(name) {
      return projects;
    },
    deleteProject(name) {
      projects = projects.filter((project) => project.name !== name);
    },
    onProjectClick(projectId) {
      currentProject = projectId;
    },
  };
};

const myApp = todoApp();
const myDisplay = displayController(myApp.onProjectClick);
myDisplay.renderProject(myApp.getProjects());
myApp.addProject('gym')
myApp.addProject('study')
myDisplay.renderProject(myApp.getProjects());
