import React from "react";

function Task(props) {
  // props = { text: "Do the dishes", urgent: true }
  return (
    <p>
      {props.text} - {props.urgent === true ? "URGENT" : ""}
    </p>
  );
}

export default Task;
