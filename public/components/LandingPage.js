import React from 'react'
import {Link} from 'react-router-dom'


import LandNav from './LandNav'

class LandingPage extends React.Component{
render(){
    return(
        
            <div id="wrapper">
                <LandNav/>
                <div className="wrapper-offcanvas cont">
                    <div className="row-offcanvas row-offcanvas-left">
                        <div id="main">
                            <div className="container-fluid landPage-container"> 
                                <div className="container-lg ">
                                    <div className="row ">
                                        <div className="col textsContainer   ">
                                                <div className="row justify-content-center">
                                                    <h1>Smart Family <br/>Technology</h1>
                                                </div> 
                                        
                                                <div className="row justify-content-center">
                                                    <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium commodi accusantium fuga cumque libero. Eligendi minima, itaque, odio earum doloribus expedita dolor harum numquam qui a reprehenderit molestiae, rerum quidem?</p>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <Link to="/dashboard">
                                                        <button type="button" className="btn btn-lg btn-primary btn1">Get started</button>
                                                    </Link>
                                                </div>
                                        </div>
                                        <div className="col houseContainer">
                                            <div className="row justify-content-center">
                                                <div className="row">
                                                    <i className="fas fa-laptop laptop"></i>
                                                    <div className="iconCon light justify-content-center"><i className="fas fa-lightbulb "></i></div>
                                                    <div className="iconCon tv"><i className="fas fa-desktop "></i></div>
                                                    <div className="iconCon lockIcon"><i className="fab fa-expeditedssl "></i></div>
                                                    <div className="iconCon video"><i className="fas fa-video "></i></div>
                                                    <div className="iconCon elk"><i className="fas fa-plug "></i></div>
                                                    <div className="iconCon home"><i className="fas fa-house-user  "></i></div>
                                                </div> 
                                            
                                            </div> 
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
           
        
    )
}

}
export default LandingPage