//Main controller
import { createProject } from "./todos.js";

export const todoApp = (initialData = []) => {
  let projects = initialData.map((projectData) => {
    const project = createProject(projectData.name);
    project.id = projectData.id;
    projectData.todosList.forEach((todo) => project.addTodo(todo));
    return project;
  });

  //Create default project
  if (projects.length === 0) {
    const defaultProject = createProject("Default");
    projects.push(defaultProject);
  }

  let currentProject = projects[0];

  return {
    addProject: (name) => {
      const newProject = createProject(name);
      projects.push(newProject);
      currentProject = newProject;
      return currentProject;
    },
    getProjects: () => projects,
    editProject: (id, newName) => {
      const project = projects.find((p) => p.id === id);
      if (project) {
        project.name = newName;
      }
    },
    deleteProject: (id) => {
      projects = projects.filter((project) => project.id !== id);

      if (currentProject.id === id) {
        if (projects.length > 0) {
          currentProject = projects[projects.length - 1];
        } else {
          currentProject = null;
        }
      }
    },
    onProjectClick: (id) => {
      currentProject = projects.find((project) => project.id === id);
    },
    getCurrentProject: () => currentProject,
    addTodoToCurrentProject: (todoData) => {
      if (currentProject) {
        currentProject.addTodo(todoData);
      }
    },
    editTodo: (id, newTodoData) => {
      const todoToChange = currentProject
        .getTodos()
        .find((todo) => todo.id === id);
      if (todoToChange) {
        todoToChange.title = newTodoData.title;
        todoToChange.description = newTodoData.description;
        todoToChange.dueDate = newTodoData.dueDate;
        todoToChange.priority = newTodoData.priority;
      }
    },
    toggleTodoChecklist: (todoId) => {
      const todo = currentProject.getTodos().find((t) => t.id === todoId);
      if (todo) {
        todo.checklist = !todo.checklist;
      }
    },
    deleteTodo: (todoId) => currentProject.deleteTodo(todoId),
    setProjects: (newProjects) => {
      projects = newProjects;
    },
  };
};
