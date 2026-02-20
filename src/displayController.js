import trashIcon from "./assets/trash-2.svg";
import editIcon from "./assets/square-pen.svg";

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
    const name = document.getElementById("project-name").value;
    if (projectForm.dataset.mode === "edit") {
      const id = parseFloat(projectForm.dataset.editId);
      actions.editProject(id, name);
    } else {
      if (name.trim() !== "") {
        actions.addProject(name);
      }
    }
    delete projectForm.dataset.mode;
    delete projectForm.dataset.editId;
    projectForm.reset();
    projectDialog.close();
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

    if (todoForm.dataset.mode === "edit") {
      const id = parseFloat(todoForm.dataset.editId);
      actions.editTodo(id, {
        title: todoTitleInput.value,
        description: todoDescriptionInput.value,
        dueDate: todoDateInput.value,
        priority: todoPriorityInput.value,
      });
    } else {
      if (todoTitleInput.value.trim() !== "") {
        actions.addTodo({
          title: todoTitleInput.value,
          description: todoDescriptionInput.value,
          dueDate: todoDateInput.value,
          priority: todoPriorityInput.value,
        });
      }
    }
    delete todoForm.dataset.mode;
    delete todoForm.dataset.editId;
    todoForm.reset();
    todoDialog.close();
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

        const editProjectBtn = document.createElement("button");
        editProjectBtn.classList.add("edit-project-btn");

        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.classList.add("delete-project-btn");

        //Event for editing the project
        editProjectBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          document.querySelector("#project-dialog h2").textContent =
            "Edit Project";
          const submitBtn = document.getElementById("create-project-btn");
          submitBtn.value = "Save Changes";

          const projectNameInput = document.getElementById("project-name");
          projectNameInput.value = project.name;

          projectForm.dataset.mode = "edit";
          projectForm.dataset.editId = project.id;

          projectDialog.showModal();
        });

        //Event for deleting the project
        deleteProjectBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          actions.deleteProject(project.id);
        });

        //Edit icon
        const iconEdit = document.createElement("img");
        iconEdit.src = editIcon;
        iconEdit.classList.add("edit-icon");

        //Trash icon
        const iconTrash = document.createElement("img");
        iconTrash.src = trashIcon;
        iconTrash.classList.add("trash-icon");

        projectName.textContent = project.name;

        const projectBtnsContainer = document.createElement("div");
        projectBtnsContainer.classList.add("project-btns-container");

        //Appending elements
        editProjectBtn.appendChild(iconEdit);
        deleteProjectBtn.appendChild(iconTrash);
        projectBtnsContainer.appendChild(editProjectBtn);
        projectBtnsContainer.appendChild(deleteProjectBtn);
        projectElement.appendChild(projectName);
        projectElement.appendChild(projectBtnsContainer);
        projectListContainer.appendChild(projectElement);
      });
    },
    renderTodos(currentProjectTodos) {
      todoListContainer.innerHTML = "";

      currentProjectTodos.forEach((todo) => {
        //Create todo container
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-item");
        todoContainer.classList.add(`priority-${todo.priority}`);

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

        const editTodoBtn = document.createElement("button");
        editTodoBtn.classList.add("edit-todo-btn");

        //Event for editing the todo
        editTodoBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          document.querySelector("#todo-dialog h2").textContent = "Edit Todo";
          const submitTodoBtn = document.getElementById("create-todo-btn");
          submitTodoBtn.value = "Save Changes";

          const todoTitleInput = document.getElementById("todo-title");
          todoTitleInput.value = todo.title;
          const todoDescriptionInput =
            document.getElementById("todo-description");
          todoDescriptionInput.value = todo.description;
          const todoDueDateInput = document.getElementById("todo-date");
          todoDueDateInput.value = todo.dueDate;
          const todoPriorityInput = document.getElementById("todo-priority");
          todoPriorityInput.value = todo.priority;

          todoForm.dataset.mode = "edit";
          todoForm.dataset.editId = todo.id;

          todoDialog.showModal();
        });

        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.classList.add("delete-todo-btn");

        //Event for deleting the todo
        deleteTodoBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          actions.deleteTodo(todo.id);
        });
        //Edit icon
        const iconEdit = document.createElement("img");
        iconEdit.src = editIcon;
        iconEdit.classList.add("edit-icon");

        //Trash icon
        const iconTrash = document.createElement("img");
        iconTrash.src = trashIcon;
        iconTrash.classList.add("trash-icon");

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
        editTodoBtn.appendChild(iconEdit);
        deleteTodoBtn.appendChild(iconTrash);
        summary.appendChild(todoTitle);
        summary.appendChild(todoDate);
        summary.appendChild(todoPriority);
        summary.appendChild(editTodoBtn);
        summary.appendChild(deleteTodoBtn);
        todoContainer.appendChild(summary);
        todoContainer.appendChild(details);
        todoListContainer.appendChild(todoContainer);
      });
    },
  };
};
