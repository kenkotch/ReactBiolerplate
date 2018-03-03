import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import 'normalize.css/normalize.css'
import Reactotron from 'reactotron-react-js'
import './ReactotronConfig'
import './styles/styles.scss'
import reducers from './reducers'
import config from './config/config'
import LoginForm from './components/access/LoginForm'

firebase.initializeApp(config)

const store = Reactotron.createStore(reducers, {}, applyMiddleware(ReduxThunk, logger))

const jsx = (
  <Provider store={ store }>
    <LoginForm />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))
