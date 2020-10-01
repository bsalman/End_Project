
import React from 'react'
import ReactDOM from 'react-dom'

import Router from './components/Router'


class App extends React.Component {
    render(){
        return(
            <Router>Hi there!</Router>
        )
    }
}

ReactDOM.render(<App/>,document.querySelector('#container'))