import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useFetch from "./hooks/useFetch";

function App() {
  const [tasks, setTasks] = useState([]);

  const processTasksData = useCallback((data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  
  const { isLoading, error, sendRequest } = useFetch(processTasksData);



  useEffect(() => {
    const requestConfig = { url: "https://test-90372-default-rtdb.firebaseio.com/tasks.json" };
    sendRequest(requestConfig);
  }, [sendRequest]);


  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest.bind(null, { url: "https://test-90372-default-rtdb.firebaseio.com/tasks.json" })}
      />
    </React.Fragment>
  );
}

export default App;
