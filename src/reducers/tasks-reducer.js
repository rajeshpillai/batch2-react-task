import { FETCH_TASKS, ADD_TASK,UPDATE_TASK,
    DELETE_TASK, TOGGLE_EDIT_TASK } 
    from '../actions/types';

export default function(state = [], action) {
  console.log("Before action: ", state);
  switch (action.type) {
    case FETCH_TASKS:
      console.log("fetching tasks...", action.payload);
      return action.payload

    case ADD_TASK:
      console.log("adding tasks...", action.payload);
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task]
      };
    case TOGGLE_EDIT_TASK:
      console.log("toggle edit...", action.payload.id, state);
      var updatedTasks = state.map((task) => {
        if (task.id == action.payload.id) {
          task.edit = !task.edit;
        }
        return task;
      });
      return updatedTasks;

    case UPDATE_TASK:
      console.log("UPDATE_TASK: ",  action.payload.task);
      var updatedTasks = state.map((task) => {
        if (task.id == action.payload.task.id) {
          task.edit = false;
          task.title = action.payload.task.title;
        }
        return task;
      });
      return updatedTasks;

    case DELETE_TASK:
      var updatedTasks = state.filter((task) => {
        return task.id !== action.payload.id;
      });
      return updatedTasks;  
    default:
      return state;
  }
}