import React from "react";

function TaskCount(props) {
  // { count: 0 }
  return <p>You have {props.count} outstanding tasks</p>;
}

export default TaskCount;
