import React, { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import TaskCount from "./TaskCount/TaskCount";
import Task from "./Task/Task";
import AddNewTask from "./NewTask/AddNewTask";

// JSX
function App() {
  // 0 - this number is 1 piece of state I want to keep track of
  // React REACTS to changes in state
  // let [counter, setCounter] = useState(0); // Array destructuring (ES6)

  // function increaseCounterBy1() {
  //   setCounter(counter + 1);
  // }

  // function decreaseCounterBy1() {
  //   if (counter > 0) {
  //     setCounter(counter - 1);
  //   }
  // }

  // If a value can be computed from one piece of state, no need to store it separately (count in this case)
  const [tasks, setTasks] = useState([
    {
      text: "Clean the dishes",
      completed: true,
      dueDate: "2020-04-02",
      urgent: false,
      id: 1
    },
    {
      text: "Wash the dog",
      completed: false,
      dueDate: "2020-04-03",
      urgent: true,
      id: 2
    },
    {
      text: "Hoover the cupboard",
      completed: true,
      dueDate: "2020-04-04",
      urgent: false,
      id: 3
    },
    {
      text: "Hoover the car",
      completed: true,
      dueDate: "2020-04-04",
      urgent: false,
      id: 4
    }
  ]);

  return (
    <div className="App">
      <Header />
      <main>
        <TaskCount count={tasks.length} />
        <div className="container">
          <AddNewTask />
          {/* Passing a prop of text to each Task component */}
          {tasks.map(task => {
            return (
              <Task
                key={task.id}
                text={task.text}
                urgent={task.urgent}
                completed={task.completed}
                dueDate={task.dueDate}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
