
import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Router from './components/Router'
import reducers from './reducers'


class App extends React.Component {
    render(){
        return(
            <Router>Hi there!</Router>
        )
    }
}

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App/>
    </Provider>
,document.querySelector('#container'))