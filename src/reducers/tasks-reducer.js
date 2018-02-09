import { FETCH_TASKS, ADD_TASK,UPDATE_TASK,
    DELETE_TASK, TOGGLE_EDIT_TASK } 
    from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TASKS:
      console.log("fetching tasks...", action.payload);
      return {tasks: action.payload};

    case ADD_TASK:
      console.log("adding tasks...", action.payload);
      return {
        tasks: [...state.tasks, action.payload.task]
      };
    case TOGGLE_EDIT_TASK:
      console.log("toggle edit...", action.payload.id);
      var updatedTasks = state.tasks.map((task) => {
        if (task.id == action.payload.id) {
          task.edit = !task.edit;
        }
        return task;
      });
      return {
        tasks: [...updatedTasks]
      };  
    case UPDATE_TASK:
      console.log("UPDATE_TASK: ",  action.payload.task);
      var updatedTasks = state.tasks.map((task) => {
        if (task.id == action.payload.task.id) {
          task.edit = false;
          task.title = action.payload.task.title;
        }
        return task;
      });
      return {
        tasks: [...updatedTasks]
      };  

    case DELETE_TASK:
      var updatedTasks = state.tasks.filter((task) => {
        return task.id !== action.payload.id;
      });
      return {
        tasks: [...updatedTasks]
      };  
    default:
      return state;
  }
}