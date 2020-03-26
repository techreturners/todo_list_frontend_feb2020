import React, { useState } from "react";

// Any component can keep track of its own state, so long as parent components don't need to know about this state

// This component is now a Controlled Component (a controlled form)

function AddNewTask(props) {
  // Create some initial state for the form
  const [taskText, setTaskText] = useState("");
  const [date, setDate] = useState("2020-03-29"); // TODO: use moment to set the initial date to 1 week from now
  const [urgent, setUrgent] = useState(false);

  const handleTextChange = (event) => {
    setTaskText(event.target.value);
  }

  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  const handleUrgentChange = (event) => {
    setUrgent(event.target.checked);
  }

  const handleAddTask = () => {
    props.addNewTaskFunc(taskText, date, urgent);
    // TODO: can you set the state of the form elements back to their initial state?
    // TODO: should you be able to add a new task if the form fields have not been changed? I.e. taskText is an empty string? (validation)
    // setTaskText("");
  }

  // Make sure we can listen to any events that happen in the form, update state accordingly
  return (
    <div className="row mb-3">
      <div className="col-4">
        <input type="text" className="form-control" value={taskText} onChange={handleTextChange} />
      </div>
      <div className="col-4">
        <input type="date" className="form-control" value={date} onChange={handleDateChange} />
      </div>
      <div className="col-2">
        <input type="checkbox" className="form-check-input" id="urgentCheck" checked={urgent} onChange={handleUrgentChange} />
        <label className="form-check-label" htmlFor="urgentCheck">
          Urgent
        </label>
      </div>
      <div className="col-2">
        <button className="btn btn-primary" onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
}

export default AddNewTask;
