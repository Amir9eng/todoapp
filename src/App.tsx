import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header/header';
import { AllTasks } from './AllTasks/alltasks';

const LOCAL_STORAGE_KEY = 'todo:tasks';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadSavedTasks = () => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as Task[]);
    }
  };
  const setTasksAndSave = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  useEffect(() => {
    loadSavedTasks();
  }, []);

  const addTask = (taskTitle: string) => {
    if (!taskTitle) {
      window.alert('You have to add a task');
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false,
    };
    setTasksAndSave([...tasks, newTask]);
  };

  const deleteTasksByIndex = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  };

  const toggleTaskCompletedById = (taskId: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  };

  return (
    <>
      <Header handleAddTask={addTask} />
      <AllTasks
        tasks={tasks}
        onDelete={deleteTasksByIndex}
        onComplete={toggleTaskCompletedById}
      />
    </>
  );
}

export default App;
