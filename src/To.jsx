import React, { useState, useEffect } from 'react';
import './Todo.css'

function ToDoList() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = { id: Date.now(), content: inputValue };
      setTasks([...tasks, newTask]);
      setInputValue('');
    } else {
      alert('You should enter something...!');
    }
  };

  const deleteTask = (taskId, e) => {
    e.stopPropagation(); 
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List</h2>
        <div className="row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Give your schedule"
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? 'checked' : ''}
              onClick={() => toggleTask(task.id)}
            >
              {task.content}
              <span onClick={(e) => deleteTask(task.id, e)}>&times;</span>
                </li>
            ))}
            </ul>
      </div>
    </div>
  );
}

export default ToDoList;
