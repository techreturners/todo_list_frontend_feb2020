import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Header/Header";
import TaskCount from "./TaskCount/TaskCount";
import Task from "./Task/Task";
import AddNewTask from "./NewTask/AddNewTask";

// Click on the delete button
  // Our application needs to know this happened! (Listen for the event)
  // Know which button was clicked?
  // Remove the relevant todo object from our state

// Click on the complete button
  // Our application needs to know this happens
  // Which button was clicked? (ID)
  // Updates the relevant task in our state (completed = true)

// Adding a new task
  // Ensure the AddNewTask component is Controlled - so that it knows about what is being entered in the form
  // Click on the add button
  // Need to know that this happened
  // What is the state of the form when this click happens? - done
  // Add the new task (constructed based on the data in the form) to the tasks list

// JSX
function App() {
  // If a value can be computed from one piece of state, no need to store it separately (count in this case)
  const [tasks, setTasks] = useState([]);

  // Only run this code once, when the component first mounts
  useEffect(() => {
    // Fetch tasks from Backend (GET)
    axios.get("https://9d8ax0uq9j.execute-api.eu-west-1.amazonaws.com/dev/tasks")
      .then(response => {
        console.log("Success", response.data);
        setTasks(response.data);
      })
      .catch(err => {
        console.log("Error", err);
      });

    // the array would normally contain values that may change, and React would run the above code WHEN that value changes
    // "Array of dependencies"
  }, []);


  // A function to delete a task from the tasks array (based on ID), and update the state with the new, shorter array
  // Any function that updates state should live where the state lives
  const deleteTask = id => {
    // Issue a DELETE request to my API via Postman
      // If resolves, THEN I will filter my tasks on the frontend to remove the task with the given ID
      // If rejects, I'm not gonna filter
    axios.delete(`https://9d8ax0uq9j.execute-api.eu-west-1.amazonaws.com/dev/tasks/${id}`)
      .then(response => {
        const filteredTasks = tasks.filter(task => {
          return task.TaskId !== id;
        });
    
        // Update the state with the new (shorter) array
        setTasks(filteredTasks);
      })
      .catch(err => {
        console.log("API Error", err);
      });
  };

  const markTaskComplete = (id) => {
    axios
      .put(
        `https://9d8ax0uq9j.execute-api.eu-west-1.amazonaws.com/dev/tasks/${id}`, {
          Completed: true
        }
      )
      .then((response) => {
        // Create a new array of updated tasks, where the completed property of the matching task has been updated
        const newTasks = tasks.map((task) => {
          if (task.TaskId === id) {
            task.Completed = 1;
          }

          return task;
        });

        setTasks(newTasks);
      })
      .catch((err) => {
        console.log("Error updating Task", err);
      });
  }

  const addNewTask = (text, date, urgent) => {
    // Create a new task object based on the data passed as parameters
  
    axios.post("https://9d8ax0uq9j.execute-api.eu-west-1.amazonaws.com/dev/tasks", {
      Description: text,
      DueDate: date,
      Urgent: urgent
    })
      .then(response => {
        const newTask = response.data;
        // Create a new array of tasks, which includes this new task
        // AVOID mutating arrays or object (push, pop, shift, splice, sort)
        const newTasks = [...tasks, newTask];
        
        // use the setTasks function to update the state
        setTasks(newTasks);
      })
      .catch(err => {
        console.log("Error creating task", err);
      });
  }

  return (
    <div className="App">
      <Header />
      <main>
        <TaskCount count={tasks.length} />
        <div className="container">
          <AddNewTask addNewTaskFunc={addNewTask} />
          {/* Passing a prop of text to each Task component */}
          {tasks.map(task => {
            return (
              <Task
                // An internal prop used by React to keep track of which Task component is which
                key={task.TaskId}
                deleteTaskFunc={deleteTask}
                markCompleteFunc={markTaskComplete}
                text={task.Description}
                urgent={task.Urgent}
                completed={task.Completed}
                dueDate={task.DueDate}
                id={task.TaskId}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
