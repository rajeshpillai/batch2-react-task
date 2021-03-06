import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { fetchTasks } from './actions/index';

const store = createStore(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk),
);

store.subscribe(render);

function render() {
    console.log("rendering...", store.getState().tasks);
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
}

render();

registerServiceWorker();
