// src/components/ToDoList.js
import React, { useState } from 'react';
import Weather from './weather';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [city, setCity] = useState('');

    const addTask = () => {
        if (task.trim() !=="") {
            setTasks(t => [...t, task]);
            setTask('');
        }
    };
    const delTask = (index) => {
        const updatedTasks = tasks.filter((_,i)=> i !== index)
        setTasks(updatedTasks);
    }
    const MoveUpTask = (index) => {
        if(index > 0 ){
            const updatedTasks = [...tasks]
            const temp = updatedTasks[index - 1]
            updatedTasks[index - 1] = updatedTasks[index]
            updatedTasks[index] = temp;
            setTasks(updatedTasks)
        }
    }
    
    return (
        <div className='Container'>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={addTask}>Add Task</button>

            <h2>Your Tasks</h2>
            <ul className='lists'>
                {tasks.map((t, index) => (
                    <li className='list' key={index}>{t}
                    <button className='delbtn' onClick={()=> delTask(index)}>delete</button>
                    <button className='pribtn' onClick={() => MoveUpTask(index)}>priortize</button></li>
                    
                ))}
            </ul>

            <div className='weather-container'>
            <h2>Weather Information</h2>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <Weather city={city} />
            </div>
        </div>
    );
};

export default ToDoList;