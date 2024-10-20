import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppName from './AppName';
import AddTodo from './AddTodo';
import TodoItems from './TodoItems';
import WelcomeMessage from './WelcomeMessage';
import './Todo.css'
import { FiLogOut } from "react-icons/fi";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }, // Corrected
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const handleNewItemAdd = async (itemName, itemDueDate) => {
    if (itemName === '' || itemDueDate === '') {
      return;
    }
    try {
      const res = await axios.post(
        '/api/tasks',
        { text: itemName, dueDate: itemDueDate },
        { headers: { Authorization: `Bearer ${token}` } } // Corrected
      );
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };
  const handleItemDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },  // Use correct _id here
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };
  
  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const res = await axios.put(`/api/tasks/${taskId}`, updates, {
        headers: { Authorization: `Bearer ${token}` },  // Use correct _id here
      });
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };
  

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="todo-container">
      <div className="header">
        <AppName />
        <button onClick={logout} className="btn btn-danger logout-button">
          <FiLogOut />
        </button>

      </div>

      <AddTodo onNewItem={handleNewItemAdd} />

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <WelcomeMessage />
      ) : (
        <TodoItems
          todoItems={tasks.map((task) => ({
            todoId: task._id,
            todoName: task.text,
            todoDate: task.dueDate,
          }))}
          onDeleteClick={handleItemDelete}
          onUpdateClick={handleTaskUpdate}
        />
      )}
    </div>
  );
}

export default Todo;



