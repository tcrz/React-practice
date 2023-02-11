import { useRef } from 'react';

import classes from './TaskForm.module.css';

const TaskForm = (props) => {
  console.log(props.loading)
  const taskInputRef = useRef();

  const submitHandler = (event) => {
    console.log(props.loading)
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
      taskInputRef.current.value = ""
      }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type='text' ref={taskInputRef} />
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
