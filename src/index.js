import "./style.css";
import { todoApp } from "./appLogic.js";
import { displayController } from "./displayController.js";
import { storage } from "./storage.js";

const initApp = () => {
  const savedData = storage.loadData();
  const myApp = todoApp(savedData);

  const save = () => storage.saveData(myApp.getProjects());

  //All the possible interactions
  const actions = {
    addProject: (name) => {
      myApp.addProject(name);
      save();
      refreshUI();
    },
    selectProject: (id) => {
      myApp.onProjectClick(id);
      refreshUI();
    },
    editProject(id, newName) {
      myApp.editProject(id, newName);
      save();
      refreshUI();
    },
    deleteProject(id) {
      myApp.deleteProject(id);
      save();
      refreshUI();
    },
    addTodo(todoData) {
      myApp.addTodoToCurrentProject(todoData);
      save();
      refreshUI();
    },
    toggleTodo: (id) => {
      myApp.toggleTodoChecklist(id);
      save();
      refreshUI();
    },
    editTodo(id, newTodoData) {
      myApp.editTodo(id, newTodoData);
      save();
      refreshUI();
    },
    deleteTodo(todoId) {
      myApp.deleteTodo(todoId);
      save();
      refreshUI();
    },
  };

  const myDisplay = displayController(actions);

  const refreshUI = () => {
    const addTodoBtn = document.getElementById("add-todo-btn");
    const projects = myApp.getProjects();
    const currentProject = myApp.getCurrentProject();
    if (currentProject) {
      addTodoBtn.disable = false;
      addTodoBtn.style.opacity = "1";
      addTodoBtn.style.cursor = "pointer";
      const activeId = currentProject.id;
      const currentProjectTodos = currentProject.getTodos();
      myDisplay.renderTodos(currentProjectTodos);
      myDisplay.renderProject(projects, activeId);
    } else {
      addTodoBtn.disable = true;
      addTodoBtn.style.opacity = "0.5";
      addTodoBtn.style.cursor = "not-allowed";
      myDisplay.renderProject(projects, null);
      myDisplay.renderTodos([]);
    }
  };

  refreshUI();
};

initApp();
