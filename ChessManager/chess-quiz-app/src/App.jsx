import React from 'react'
import Router from './router/Router.jsx'
import {Provider} from 'react-redux'
import {store} from './store/store.js'
import './App.css'


function App() {

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
};

export default App
