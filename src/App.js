import React, { Component } from 'react';
import { fetchTasks, addTask, deleteTask, 
        updateTask, toggleEditTask, toggleComplete } 
        from './actions/index';

import Modal from './components/Modal';
import ColorPicker from './components/ColorPicker';

import './App.css';

const uuidv4 = require('uuid/v4');

class App extends Component {
  state = {
    // tasks:[
    //   {id: uuidv4(), edit: false, "title": "Learn React", author: "rajesh", completed: false, color:"#E0E0E0"},
    //   {id: uuidv4(), edit: false, "title": "Learn Angular", author: "sangram", completed: false,color:"#E0E0E0"},
    // ],
    task: {
      taskTitle: "",
      author: "",
      completed: false
    },
    taskModal: false,
    droppedTasks: []
  };

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    console.log("store: ", this.store);
    this.store.dispatch(fetchTasks());
  }

  onNewTask() {
    //var input = this.taskInput.value;
    var newTask = {
      id: uuidv4(),
      title: this.state.task.taskTitle,
      author: this.state.task.author,
      completed: false,
      color:"#E0E0E0"
    }

    console.log("newTask: ", newTask);

    this.store.dispatch(addTask(newTask));

    // this.setState({
    //   tasks: [newTask, ...this.state.tasks]
    // });
  }

  onTaskDelete (taskId) {
    this.store.dispatch(deleteTask(taskId));
  }

  findTaskById(todoId) {
    let found = this.store.getState().tasks.find((task) => {
      return task.id == todoId;
    })

    return found
  }

  onToggleEdit = (todoId) => {
    this.updateToggleEdit(todoId);
  }

  updateToggleEdit(taskId) {
    this.store.dispatch(toggleEditTask(taskId));
  }

  onChange  = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value
      }
    });

    console.log("updated state: ", this.state.task);
  }

  onTaskKeyUp = (e, taskId) => {
    console.log(e.which);
    if (e.which === 13) {
      var task = {
        id: taskId,
        title: this.taskTitleInput.value,
        edit: false
      }
      this.store.dispatch(updateTask(task));

    }else if (e.which === 27) {
      this.updateToggleEdit(taskId);
    }
  }

  onToggleComplete = (taskId) => {
    this.store.dispatch(toggleComplete(taskId));
  }

  onShowModal = (e, taskId) => {
    var found = this.findTaskById(taskId);
    this.setState({
      taskModal: !this.state.taskModal,
      currentModal: found
    })
  }

  onDragOver = (e) => {
    console.log(e.target);
    e.preventDefault();
  }

  onDragStart = (e, taskId) => {
    e.dataTransfer.setData("id", taskId);
    console.log("Dragging....", taskId);
  }

  onDrop = (e) => {
    var id = e.dataTransfer.getData("id");
    console.log("droppong ", id);

    var task = this.findTaskById(id);

    var exist = this.state.droppedTasks.find((t) => {
      return t.id == id;
    });

    if (exist) return;

    this.setState({
      droppedTasks: [...this.state.droppedTasks, task]
    })
  }

  onColorPick = (e, taskId, color) => {
    let updatedState = this.store.getState().tasks.map((task) => {
      if (task.id == taskId) {
        task.color = color;
      }
      return task;
    });
    this.setState({
      tasks: updatedState
    });
  }

  render() {
    this.store = this.props.store;
    var currentModal = this.state.currentModal;
    var tasks = this.store.getState().tasks;
    
    console.log("before error: ", tasks);

    if (tasks  && tasks.length === 0) return <div>loading...</div>


    var taskUI = tasks.map((task) => {
        return <li 
          style={{backgroundColor: task.color}}
          draggable={true}
          onDragStart={(e)=> { this.onDragStart(e, task.id)}}
          key={task.id}>
          
          {task.edit ? 
             <input type="text" placeholder="enter task" 
              onKeyUp={(e)=>{this.onTaskKeyUp(e, task.id)}}
              name="taskTitle"
              defaultValue={task.title}
              ref = {(taskTitleInput)=> { this.taskTitleInput = taskTitleInput}}

              />
            : 
            <span 
              className={task.completed ? "completed" : ""}
              onClick={(e)=>{this.onToggleComplete(task.id)}}>
              {task.title}
            </span>
          }

          <div className="action-buttons">
            <button type="button" 
              onClick={(e)=> {this.onTaskDelete(task.id)}}>
              delete
            </button>
            <button type="button" 
              onClick={(e)=> {this.onToggleEdit(task.id)}}>
              edit
            </button>
            <button type="button" 
              onClick={(e)=> {this.onShowModal(e,task.id)}}>
              show
            </button>
          </div>

          <ColorPicker onColorPick={(e, color)=>this.onColorPick(e,task.id,color)} />
          
        </li>
    });

    let droppedTaskUI = this.state.droppedTasks.map((t) => {
        return (
            <div key={t.id}>
                {t.title}
            </div>
        );
    });
    return (
      <div>
        <div className="task-container">
          <h2>Agile Task</h2>
          <input type="text" placeholder="enter task" 
            name="taskTitle"
            value={this.state.task.title}
            onChange={this.onChange}
            />
          <input placeholder="author" type="text" 
            name="author"
            onChange={this.onChange}
            value={this.state.task.author} />
          <button onClick={(e) => {this.onNewTask()}}>add task</button>
         

          <ul>
            {taskUI}
          </ul>
        </div>

        <Modal show={this.state.taskModal} onClose={this.onShowModal}>
           <div>
              <h2>Task </h2>
              {
                currentModal &&
                      <div>
                        <h3>{currentModal.title}</h3>
                        <div>{currentModal.author}</div>
                      </div>
              }
            </div>
        </Modal>

        <div className="completed-tasks"
          onDragOver= {(e)=>{this.onDragOver(e)}}
          onDrop = {(e) => {this.onDrop(e)}}>
          <header>Backlog</header>
          {droppedTaskUI}
        </div>

      </div>
    );
  }
}
export default App;
