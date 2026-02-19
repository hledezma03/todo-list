import "./style.css";
import trashIcon from "./assets/trash-2.svg";

//Create todo
const createTodo = ({
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
const createProject = (name) => {
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

//Main controller
const todoApp = () => {
  let projects = [];
  //Create default project
  const defaultProject = createProject("Default");
  projects.push(defaultProject);

  let currentProject = defaultProject;

  return {
    addProject(name) {
      const newProject = createProject(name);
      projects.push(newProject);
      currentProject = newProject;
      return currentProject;
    },
    getProjects() {
      return projects;
    },
    deleteProject(id) {
      projects = projects.filter((project) => project.id !== id);

      if (currentProject.id === id) {
        if (projects.length > 0) {
          currentProject = projects[projects.length - 1];
        } else {
          currentProject = null;
        }
      }
    },
    onProjectClick(id) {
      currentProject = projects.find((project) => project.id === id);
    },
    getCurrentProject() {
      return currentProject;
    },
    addTodoToCurrentProject(todoData) {
      return currentProject.addTodo(todoData);
    },
    deleteTodo(todoId) {
      currentProject.deleteTodo(todoId);
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
  const todoListContainer = document.getElementById("todo-list");
  const addTodoBtn = document.getElementById("add-todo-btn");
  const todoDialog = document.getElementById("todo-dialog");
  const todoForm = document.getElementById("todo-form");
  const closeTodoFormBtn = document.getElementById("close-todo-form-btn");

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

  //Create todo dialog
  addTodoBtn.addEventListener("click", () => {
    const dateInput = document.getElementById("todo-date");

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const today = `${year}-${month}-${day}`;

    dateInput.value = today;

    dateInput.min = today;

    todoDialog.showModal();
  });

  //CLose todo dialog
  closeTodoFormBtn.addEventListener("click", () => {
    todoForm.reset();
    todoDialog.close();
  });

  //Submit a todo form
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoTitleInput = document.getElementById("todo-title");
    const todoDescriptionInput = document.getElementById("todo-description");
    const todoDateInput = document.getElementById("todo-date");
    const todoPriorityInput = document.getElementById("todo-priority");

    if (todoTitleInput.value.trim() !== "") {
      actions.addTodo({
        title: todoTitleInput.value,
        description: todoDescriptionInput.value,
        dueDate: todoDateInput.value,
        priority: todoPriorityInput.value,
      });
      todoForm.reset();
      todoDialog.close();
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
    renderTodos(currentProjectTodos) {
      todoListContainer.innerHTML = "";

      currentProjectTodos.forEach((todo) => {
        //Create todo container
        const todoContainer = document.createElement("div");

        const todoTitle = document.createElement("p");
        todoTitle.textContent = todo.title;
        const todoDate = document.createElement("p");
        const dateObj = new Date(todo.dueDate);
        todoDate.textContent = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const todoPriority = document.createElement("p");
        todoPriority.textContent = todo.priority;

        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.classList.add("delete-todo-btn");

        //Event for deleting the todo
        deleteTodoBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          actions.deleteTodo(todo.id);
        });

        //Trash icon
        const icon = document.createElement("img");
        icon.src = trashIcon;
        icon.classList.add("trash-icon");

        //Appending elements
        deleteTodoBtn.appendChild(icon);
        todoContainer.appendChild(todoTitle);
        todoContainer.appendChild(todoDate);
        todoContainer.appendChild(todoPriority);
        todoContainer.appendChild(deleteTodoBtn);
        todoListContainer.appendChild(todoContainer);
      });
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
    addTodo(todoData) {
      myApp.addTodoToCurrentProject(todoData);
      refreshUI();
    },
    deleteTodo(todoId) {
      myApp.deleteTodo(todoId);
      refreshUI();
    },
  };

  const myDisplay = displayController(actions);

  const refreshUI = () => {
    const projects = myApp.getProjects();
    const currentProject = myApp.getCurrentProject();
    if (currentProject) {
      const activeId = currentProject.id;
      const currentProjectTodos = currentProject.getTodos();
      myDisplay.renderTodos(currentProjectTodos);
      myDisplay.renderProject(projects, activeId);
    } else {
      myDisplay.renderProject(projects, null);
      myDisplay.renderTodos([]);
    }
  };

  refreshUI();
};

initApp();
