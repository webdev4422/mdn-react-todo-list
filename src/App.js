import React, { useState } from 'react'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import Todo from './components/Todo'

function App(props) {
  // Store our tasks in state
  const [tasks, setTasks] = useState(props.tasks)

  // Handle form submission via callback
  // Create addTask function to pass it to Form component as callback function with props
  function addTask(name) {
    const newTask = { id: 'id', name, completed: false }
    setTasks([...tasks, newTask])
  }

  // mapping tasks, instead of props.tasks.
  const taskList = tasks.map((task) => (
    <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} />
  ))

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* Pass addTask() to Form component as prop */}
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
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
