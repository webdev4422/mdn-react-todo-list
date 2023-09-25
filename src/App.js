import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import Todo from './components/Todo'

function App(props) {
  // Store our tasks in state
  const [tasks, setTasks] = useState(props.tasks)

  // Handle form submission via callback
  // Create addTask function to pass it to Form component as callback function with props
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    console.log(newTask)
    setTasks([...tasks, newTask])
  }

  // Fix checkbox functionality sync JS with HTML
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task
    })
    // Update our state with new task
    setTasks(updatedTasks)
  }

  // mapping tasks, instead of props.tasks.
  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
    />
  ))

  // counting tasks
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* Pass addTask() to Form component as prop */}
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}

export default App
