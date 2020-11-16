import React, {useEffect} from 'react'


import SideNav from './SideNav'
import TopNav from './TopNav'
import {checkLoginPost} from '../services/api'
import {useHistory} from 'react-router-dom'

const Wrapper = (props) => {
    const history = useHistory()
    useEffect(() => {
        checkLoginPost().then(data => {
            console.log(data);
            if(data === 10) {
                history.push('/login')
            } else {
                //props.setUserAction(data)
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
                            <div className="row-offcanvas row-offcanvas-left">
                                <SideNav/>
                                     <div id="main">
                                        <div className="container-fluid"> 
                                {props.children}
                                            
                                        </div> 
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
    )
}

export default Wrapper