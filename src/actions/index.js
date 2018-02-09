import axios from 'axios';
import {
        FETCH_TASKS, 
        ADD_TASK, 
        DELETE_TASK, 
        UPDATE_TASK,
        TOGGLE_EDIT_TASK} 
    from './types';

const API_URL = "/api/tasks";

export const fetchTasks = () => async dispatch => {
    console.log("fetchTasks()...");
    const res = await axios.get('/api/tasks');
    dispatch({ type: FETCH_TASKS, payload: res.data });
};

export const addTask = (task) => async dispatch => {
    const res = await axios.post('/api/task',{task: task});
    dispatch({ type: ADD_TASK, payload: res.data });
};

export const deleteTask = (taskId) => async dispatch => {
    const res = await axios.delete('/api/task/' + taskId);
    dispatch({ type: DELETE_TASK, payload: res.data });
};

export const toggleEditTask = (taskId) => async dispatch => {
    const res = await axios.put('/api/task/toggle/' + taskId);
    console.log("dispatching ...", res);
    dispatch({ type: TOGGLE_EDIT_TASK, payload: res.data });
};

export const updateTask = (task) => async dispatch => {
    const res = await axios.put('/api/task/', {task: task});
    dispatch({ type: UPDATE_TASK, payload: res.data });
};