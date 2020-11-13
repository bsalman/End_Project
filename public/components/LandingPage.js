//------------------------------------------------------------//
///////////////       IMPORT DEPENDENCIES     /////////////////
//-----------------------------------------------------------//
import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
// importing components
import LandNav from './LandNav'

//------------------------------------------------------------//
///////////////    CLASS COMPONENT       ////////////////
//-----------------------------------------------------------//
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
                                    <div className="row">
                                        <div className="col textsContainer   ">
                                                <div className="row justify-content-center">
                                                    <h1>Smart Family <br/>Technology</h1>
                                                </div> 
                                        
                                                <div className="row justify-content-center">
                                                    <p> Welcome to our Smart Home Application. This smart application which belongs to the family of the Internet of Things, 
                                                    has been build by us as a part of our final project in our educational year as Full Stack Web Developers.
                                                    We have build a fully functioning application, with it's devices and sensors, including transmitters and a raspberry pi, to
                                                    be able to control the appliances, lights, temperature and security in your house. You can add as many devices as you want. 
                                                    <br></br>But the core of this project is, that you can work on an independent server which is in your house and not connected 
                                                    to any cloud service.<br></br>Like this all your data stays secure. We wish you a lot of fun trying it.</p>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <Link to="/login">
                                                        <Button type="button" className="btn btn-lg btn-primary btn1">Get Started</Button>
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