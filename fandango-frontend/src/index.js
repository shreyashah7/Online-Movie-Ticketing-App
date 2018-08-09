import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import { createStore } from 'redux';
import allReducers from './reducers'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch(e){
        console.log(e)
    }
}

function loadFromLocalStorage(){
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch(e){
        console.log(e)
        return undefined

    }
}

const persistedState = loadFromLocalStorage()
const store = createStore(allReducers, persistedState);
store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
