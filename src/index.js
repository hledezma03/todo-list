import "./style.css";
import trashIcon from "./assets/trash-2.svg";

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
    renderProject(projectsArray, activeIndex) {
      //Clean the screen
      projectListContainer.innerHTML = "";

      const projectTitleDisplay = document.getElementById("project-title");
      if (projectTitleDisplay && projectsArray[activeIndex]) {
        projectTitleDisplay.textContent = projectsArray[activeIndex].name;
      }

      projectsArray.forEach((project, i) => {
        //Create project element
        const projectElement = document.createElement("li");
        const projectName = document.createElement("p");
        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.classList.add("delete-project-btn");
        const icon = document.createElement("img");
        icon.src = trashIcon;
        icon.classList.add("trash-icon");

        projectName.textContent = project.name;
        projectElement.dataset.index = i;
        //Add the project to the projectListContainer
        if (i === Number(activeIndex)) {
          projectElement.classList.add("active-project");
        }
        deleteProjectBtn.appendChild(icon)
        projectElement.appendChild(projectName);
        projectElement.appendChild(deleteProjectBtn);
        projectListContainer.appendChild(projectElement);
      });
    },
  };
};

//Main controller
const todoApp = () => {
  let projects = [];
  let currentProjectIndex = 0;
  //Create default project if there are no projects
  if (projects.length === 0) {
    projects.push(createProject("Default"));
  }

  return {
    addProject(name) {
      const newProject = createProject(name);
      projects.push(newProject);
      currentProjectIndex = projects.length - 1;
      return newProject;
    },
    getProjects() {
      return projects;
    },
    deleteProject(index) {
      projects = projects.filter((project) => project.id !== index);
    },
    onProjectClick(index) {
      currentProjectIndex = index;
    },
    getCurrentProjectIndex() {
      return currentProjectIndex;
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
    deleteProject(index) {
      myApp.deleteProject(index);
      refreshUI();
    },
  };

  const myDisplay = displayController(actions);

  const refreshUI = () => {
    const projects = myApp.getProjects();
    const activeIndex = myApp.getCurrentProjectIndex();
    myDisplay.renderProject(projects, activeIndex);
  };

  refreshUI();
};

initApp();
