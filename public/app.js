
import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import io from 'socket.io-client'

import MainRouter from './components/MainRouter'
import reducers from './reducers'


class App extends React.Component {

componentDidMount(){
    const socket = io(window.location.origin)
    socket.on('connect', () => {
        console.log('connected to the server');
    })

    socket.on('device_connect', sn => {
        console.log('deviceis connected ', sn);
    })
    socket.on('device_disconnect', sn => {
        console.log('deviceis disconnected ',sn);
    })
}

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