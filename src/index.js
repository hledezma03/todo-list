import "./style.css";
import { todoApp } from "./appLogic.js";
import { displayController } from "./displayController.js";

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
    const addTodoBtn = document.getElementById("add-todo-btn")
    const projects = myApp.getProjects();
    const currentProject = myApp.getCurrentProject();
    if (currentProject) {
      addTodoBtn.disable = false
      addTodoBtn.style.opacity = "1"
      addTodoBtn.style.cursor = "pointer"
      const activeId = currentProject.id;
      const currentProjectTodos = currentProject.getTodos();
      myDisplay.renderTodos(currentProjectTodos);
      myDisplay.renderProject(projects, activeId);
    } else {
      addTodoBtn.disable = true
      addTodoBtn.style.opacity = "0.5"
      addTodoBtn.style.cursor = "not-allowed"
      myDisplay.renderProject(projects, null);
      myDisplay.renderTodos([]);
    }
  };

  refreshUI();
};

initApp();
