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

  return {
    renderProject(projectsArray, activeId) {
      //Clean the screen
      projectListContainer.innerHTML = "";

      const activeProject = projectsArray.find((p) => p.id === activeId);
      const projectTitleDisplay = document.getElementById("project-title");
      if (projectTitleDisplay && activeProject) {
        projectTitleDisplay.textContent = activeProject.name;
      }

      projectsArray.forEach((project) => {
        //Create project element
        const projectElement = document.createElement("li");
        projectElement.addEventListener("click", () => {
          actions.selectProject(project.id);
        });

        if (project.id === activeId) {
          projectElement.classList.add("active-project");
        }
        const projectName = document.createElement("p");
        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.classList.add("delete-project-btn");

        //Event for deleting the project
        deleteProjectBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          actions.deleteProject(project.id);
        });
        //Trash icon
        const icon = document.createElement("img");
        icon.src = trashIcon;
        icon.classList.add("trash-icon");

        projectName.textContent = project.name;
        //Appending elements
        deleteProjectBtn.appendChild(icon);
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
  //Create default project
  const defaultProject = createProject("Default");
  projects.push(defaultProject);
  let currentProjectId = defaultProject.id;

  return {
    addProject(name) {
      const newProject = createProject(name);
      projects.push(newProject);
      currentProjectId = newProject.id;
      return newProject;
    },
    getProjects() {
      return projects;
    },
    deleteProject(id) {
      projects = projects.filter((project) => project.id !== id);

      if (currentProjectId === id && projects.length > 0) {
        currentProjectId = projects[projects.length - 1].id;
      }
    },
    onProjectClick(id) {
      currentProjectId = id;
    },
    getCurrentProjectId() {
      return currentProjectId;
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
    selectProject: (id) => {
      myApp.onProjectClick(id);
      refreshUI();
    },
    deleteProject(id) {
      myApp.deleteProject(id);
      refreshUI();
    },
  };

  const myDisplay = displayController(actions);

  const refreshUI = () => {
    const projects = myApp.getProjects();
    const activeId = myApp.getCurrentProjectId();
    myDisplay.renderProject(projects, activeId);
  };

  refreshUI();
};

initApp();
