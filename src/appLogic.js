//Main controller
import { createProject } from "./todos.js";
export const todoApp = () => {
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
    getProjects: () => projects,
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
    getCurrentProject: () => currentProject,
    addTodoToCurrentProject: (todoData) => currentProject.addTodo(todoData),
    deleteTodo: (todoId) => currentProject.deleteTodo(todoId),
  };
};