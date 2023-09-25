import React, { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import Todo from './components/Todo'

// Functions to make focus references work properly
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// Object to filter taks by all/active/inactive
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
}
const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {
  // Store our tasks in state
  const [tasks, setTasks] = useState(props.tasks)
  // Filter hook
  const [filter, setFilter] = useState('All')
  // Use references
  const listHeadingRef = useRef(null)

  // Handle form submission via callback
  // Create addTask function to pass it to Form component as callback function with props
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    console.log(`Added new task with id ${newTask.id}`)
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

  // Deleting a task will follow a similar pattern to toggling its completed state: we need to define a function for updating our state, then pass that function into <Todo /> as a prop and call it when the right event happens.
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id)
    console.log(`Deleted task with id ${id}`)
    setTasks(remainingTasks)
  }

  // Edit task functionality
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(editedTaskList)
  }

  // Mapping tasks, instead of props.tasks.
  // Updated taskList with filters
  const taskList = tasks
    .filter(FILTER_MAP[filter]) // Remove this line to delete filterList function. Else should work as before
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ))

  // Filter taskList
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ))

  // counting tasks
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  // For focus references
  const prevTaskLength = usePrevious(tasks.length)
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength]) // Track if changes in list, then change focus

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* Pass addTask() to Form component as prop */}
      <div className="filters btn-group stack-exception">{filterList}</div>
      {/* Add tabIndex="-1" to make h2 focusable */}
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
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
