import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";
import TaskCount from "./TaskCount/TaskCount";
import Task from "./Task/Task";

// JSX
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <TaskCount />
        <div>
          {/* Passing a prop of text to each Task component */}
          <Task text="Do the dishes" urgent={true} />
          <Task text="Walk the dog" urgent={false} />
          <Task text="Phone the vets" urgent={true} />
          <Task text="Deflea the cat" urgent={false} />
          <Task text="Revise React" urgent={false} />
        </div>
      </main>
    </div>
  );
}

export default App;
