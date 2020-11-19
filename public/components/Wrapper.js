import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import SideNav from './SideNav'
import TopNav from './TopNav'
import {checkLoginPost} from '../services/api'
import {useHistory} from 'react-router-dom'

const Wrapper = (props) => {
    const history = useHistory()
    const [state, setState] = useState({loading: true})
    useEffect(() => {
        checkLoginPost().then(data => {
            console.log(data);
            if(data === 10) {
                history.push('/login')
            } else {
                //props.setUserAction(data)
                setState({loading: false})
            }
        }).catch(error => {
            history.push('/login')
        })
        
    }, []);
    return(
        <div>
                    <div id="wrapper">
                        <TopNav /> 
                  
                       

                        <div className="wrapper-offcanvas">
                            <div className={ props.smallScreenCheck ? "row-offcanvas row-offcanvas-left active" : "row-offcanvas row-offcanvas-left"}>
                                <SideNav/>
                                     <div id="main">
                                        <div className="container-fluid"> 

                                {state.loading? <div>Loading ....</div> : props.children}
                                            
                                        </div> 
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
    )
}
const mapStateToProps = (state) => {
    return({
      smallScreenCheck: state.smallScreenCheck, 
    })
  }
export default connect(mapStateToProps)(Wrapper)
