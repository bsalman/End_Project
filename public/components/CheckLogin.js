import React , {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

//import {checkLoginPost} from '../services/api'
import {loginPost} from '../services/api'
import {setUserAction} from '../actions'

// const CheckLogin = props => {
// const history = useHistory()
// useEffect(() => {
//     checkLoginPost().then(data => {
//         if(data === 10) {
//             history.push('/login')
//         } else {
//             props.setUserAction(data)
//         }
//     }).catch(error => {
//         history.push('/login')
//     })
    
// }, []);

//     return props.children
// }

const CheckLogin = props => {
    const history = useHistory()
    useEffect(() => {
        loginPost().then(data => {
            if(data === 10) {
                history.push('/login')
            } else {
                props.setUserAction(data)
            }
        }).catch(error => {
            history.push('/login')
        })
        
    }, []);
    
        return props.children
    }
    

export default connect(null, {setUserAction})(CheckLogin)