import React, { Component } from 'react';
import './App.css';

const uuidv4 = require('uuid/v4');

class App extends Component {
  state = {
    tasks:[
    {id: uuidv4(), "title": "Learn React", completed: false},
    {id: uuidv4(), "title": "Learn Angular", completed: false},
  ]};

  constructor() {
    super();
  }
  onNewTask() {
    var input = this.task.value;
    var newTask = {
      id: uuidv4(),
      title: input,
      completed: false
    }
    this.setState({
      tasks: [newTask, ...this.state.tasks]
    });
  }

  onTaskDelete (taskId) {
    var found = this.findTaskById(taskId);

    let newTasks = this.state.tasks.filter((task) => {
      return task.id !== taskId;
    });

    this.setState({
      tasks: newTasks
    });
  }

  findTaskById(todoId) {
    let found = this.state.tasks.find((task) => {
      return task.id == todoId;
    })

    return found
  }

  render() {
    var taskUI = this.state.tasks.map((task) => {
        return <li 
          key={task.id}>{task.title}

          <button type="button" onClick={(e)=> {this.onTaskDelete(task.id)}}>delete</button>
        </li>
        
    })
    return (
      <React.Fragment>
        <h2>Agile Task</h2>
        <input type="text" placeholder="enter task" ref={(task)=>{this.task=task}} />
        <button onClick={(e) => {this.onNewTask()}}>add task</button>
        <ul>
          {taskUI}
        </ul>

      </React.Fragment>
    );
  }
}
export default App;
