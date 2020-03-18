import React from "react";
import moment from "moment";
import "./Task.css";

function Task(props) {
  // props = { text: "Do the dishes", urgent: true, completed: true, dueDate: "2020-03-10" }
  return (
    <div className="row taskRow">
      <div className="col-12 col-md-4">{props.text}</div>
      <div className="col-6 col-md-2">
        {props.urgent === true ? "URGENT" : ""}
      </div>
      <div className="col-6 col-md-2">
        {moment(props.dueDate).format("ddd Do MMMM YYYY")}
      </div>
      <div className="col-6 col-md-2">
        {props.completed === false && <button className="btn btn-primary">Mark as complete</button>}
      </div>
      <div className="col-6 col-md-2">
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default Task;
