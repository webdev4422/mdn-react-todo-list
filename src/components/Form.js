import React, { useState } from 'react'

function Form(props) {
  // Use useState hook because it's not possible to update the props a component receives; only to read them.
  const [name, setName] = useState('')

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault()
    // Use addTask prop from App component and send the task back to the App component
    props.addTask(name)
    // clear the input after your form submits
    setName('')
  }

  // Handle changes in <input />
  function handleChange(e) {
    // To read the contents of the input field as they change, you can access the input's value property. We can do this by reading `e.target.value`. `e.target` represents the element that fired the `change` event — that's our input. So, `value` is the text inside it.
    setName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  )
}

export default Form
