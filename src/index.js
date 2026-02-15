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
const displayController = (actions) => {
  const projectListContainer = document.getElementById("project-list");
  const projectDialog = document.getElementById("project-dialog");
  const projectForm = document.getElementById("project-form");
  const createProjectBtn = document.getElementById("add-project-btn");
  const closeProjectFormBtn = document.getElementById("close-project-form-btn");

  //Create project dialog
  createProjectBtn.addEventListener("click", () => projectDialog.showModal());

  //CLose project dialog
  closeProjectFormBtn.addEventListener("click", () => {
    projectForm.reset();
    projectDialog.close();
  });

  //Submit a project form
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectNameInput = document.getElementById("project-name");

    if (projectNameInput.value.trim() !== "") {
      actions.addProject(projectNameInput.value);
      projectForm.reset();
      projectDialog.close();
    }
  });

  //Select project
  projectListContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      actions.selectProject(e.target.dataset.index);
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
    getProjects() {
      return projects;
    },
    deleteProject(name) {
      projects = projects.filter((project) => project.name !== name);
    },
    onProjectClick(index) {
      currentProject = index;
      console.log("Selected project index:", currentProject);
    },
  };
};

const initApp = () => {
  const myApp = todoApp();

  //All the possible interactions
  const actions = {
    addProject: (name) => {
      myApp.addProject(name);
      refreshUI();
    },
    selectProject: (index) => {
      myApp.onProjectClick(index);
      refreshUI();
    },
  };

  const myDisplay = displayController(actions)

  const refreshUI = () => {
    myDisplay.renderProject(myApp.getProjects());
  };

  refreshUI();
};

initApp();
