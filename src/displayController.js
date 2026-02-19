import trashIcon from "./assets/trash-2.svg";

export const displayController = (actions) => {
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

  //Submit project form
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

  //Submit todo form
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
      projectListContainer.innerHTML = "";

      const activeProject = projectsArray.find((p) => p.id === activeId);
      const projectTitleDisplay = document.getElementById("project-title");
      if (projectTitleDisplay && activeProject) {
        projectTitleDisplay.textContent = activeProject.name;
      } else {
        projectTitleDisplay.textContent = "No projects available";
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
        todoContainer.classList.add("todo-item");

        const summary = document.createElement("div");
        summary.classList.add("todo-summary");

        const todoTitle = document.createElement("p");
        todoTitle.classList.add("todo-title");
        todoTitle.textContent = todo.title;
        const todoDate = document.createElement("p");
        todoDate.classList.add("todo-date");
        const dateObj = new Date(todo.dueDate);
        todoDate.textContent = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        });
        const todoPriority = document.createElement("p");
        todoPriority.classList.add("todo-priority");
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

        const details = document.createElement("div");
        details.classList.add("todo-details");

        const description = document.createElement("div");
        description.textContent =
          todo.description || "No description provided.";
        details.appendChild(description);

        todoContainer.addEventListener("click", () => {
          todoContainer.classList.toggle("is-expanded");
        });

        //Appending elements
        deleteTodoBtn.appendChild(icon);
        summary.appendChild(todoTitle);
        summary.appendChild(todoDate);
        summary.appendChild(todoPriority);
        summary.appendChild(deleteTodoBtn);
        todoContainer.appendChild(summary);
        todoContainer.appendChild(details);
        todoListContainer.appendChild(todoContainer);
      });
    },
  };
};
