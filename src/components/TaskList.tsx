import { useState } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

useEffect

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle === '') return;

    const id = +(Math.random() * 1000000000).toFixed(0);
    const newTask= {
      id: id,
      title: newTaskTitle,
      isComplete: false,
    }
    setTasks([...tasks, newTask]);
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    let TasksList: Task[] = []
    
    tasks.forEach(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      TasksList.push(task);
    });
    setTasks(TasksList);
  }

  function handleRemoveTask(id: number) {
    let TasksList: Task[] = []
    
    tasks.forEach(task => {
      if (task.id !== id) {
        TasksList.push(task);
      }
    });
    setTasks(TasksList);
  }

  function handleDeleteCompletedTasks() {
    let TasksList: Task[] = []
    
    tasks.forEach(task => {
      if (task.isComplete === true) return;

      TasksList.push(task);
    });
    setTasks(TasksList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            onKeyPress={(e)=>{
              if (e.charCode === 13) handleCreateNewTask()
            }}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
          <button className="red" type="button"  onClick={handleDeleteCompletedTasks}>
            <FiTrash size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}