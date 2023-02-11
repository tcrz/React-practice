import { useCallback } from 'react';
import useFetch from '../../hooks/useFetch';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  
  const processNewTaskData = (data, body) => {
    console.log(data)
    const generatedId = data.name; 
    const createdTask = { id: generatedId, text: body.text };

    props.onAddTask(createdTask);
  }

  const {isLoading, error, sendRequest} = useFetch(processNewTaskData)

  const enterTaskHandler = (taskText) => {
    const requestConfig = {
      url: "https://test-90372-default-rtdb.firebaseio.com/tasks.json",
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      },
    }
    sendRequest(requestConfig)
  }
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
