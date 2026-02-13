import "./style.css";

const createTodo = (title, descripction, dueDate, priority, checklist = false) => {
  return {
    title,
    descripction,
    dueDate,
    priority, 
    checklist,
    showTodo() {
      console.log(`${title}`)
      console.log(`${descripction}`)
      console.log(`${dueDate}`)
      console.log(`${priority}`)
      console.log(`${checklist}`)
    }
  }
}

const todo1 = createTodo('Meditate', 'Meditate 5 minutes every day', '2026/02/13', 'High', 'False')
const todo2 = createTodo('Study', 'Study 90 minutes every day', '2026/02/13', 'High', 'True')

todo1.showTodo()
todo2.showTodo()
