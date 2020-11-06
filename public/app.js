
import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {createStore} from 'redux'

import MainRouter from './components/MainRouter'
import reducers from './reducers'


class App extends React.Component {



    render(){
        return(
            <MainRouter></MainRouter>
        )
    }
}

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App/>
    </Provider>
,document.querySelector('#container'))