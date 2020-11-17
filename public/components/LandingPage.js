import React from 'react'
import {Link} from 'react-router-dom'


import LandNav from './LandNav'
import Footer from './Footer'

class LandingPage extends React.Component{
render(){
    return(
        <React.Fragment>
            <div id="wrapper">
                <LandNav/>
                <div className="wrapper-offcanvas cont">
                    <div className="row-offcanvas row-offcanvas-left">
                        <div id="main">
                            <div className="container-fluid landPage-container"> 
                                <div className="container-lg">
                                    <div className="row textsContainer">
                                        <div className="col-xl-6 col-sm-12 col-md-6 mb-2">
                                        <div className="col textsContainer   ">
                                                <div className="row justify-content-center mb-3">
                                                    <h1>Smart Family <br/>Technology</h1>
                                                </div> 
                                        
                                                <div className="row justify-content-center">
                                                    <p>Welcome to our Smart Home Application. This smart application which belongs to the family of the Internet of Things, has been build by us as a part of our final project in our educational year as Full Stack Web Developers. We have build a fully functioning application, with it's devices and sensors, including transmitters and a raspberry pi, to be able to control the appliances, lights, temperature and security in your house. You can add as many devices as you want.
                                                        But the core of this project is, that you can work on an independent server which is in your house and not connected to any cloud service.
                                                        Like this all your data stays secure. We wish you a lot of fun trying it.</p>
                                                </div>
                                                <div className="row justify-content-center my-3">
                                                    <Link to="/dashboard">
                                                        <button type="button" className="btn btn-lg btn-primary btn1">Get started</button>
                                                    </Link>
                                                </div>
                                        </div>
                                        </div>
                                       
                                            <div className="col-xl-6 col-sm-12 col-md-6"> 
                                            <div  className="houseContainer"> 
                                                <div className="laptopContainer"> <i className="fas fa-laptop laptop"></i></div>
                                                 {/* <span className="sp1"></span>
                                                  <span className="sp2"></span>
                                                 <span className="sp3"></span>
                                                 <span className="sp4"></span>
                                                  <span className="sp5"></span>
                                                 <span className="sp6"></span>
                                                 <span className="sp7"></span>
                                                 <span className="sp8"></span> */}
                                                <div className="iconCon light justify-content-center"><i className="fas fa-lightbulb "></i></div>
                                                <div className="iconCon tv"><i className="fas fa-desktop "></i></div>
                                                <div className="iconCon lockIcon"><i className="fas fa-unlock-alt"></i></div>
                                                <div className="iconCon video"><i className="fas fa-video "></i></div>
                                                <div className="iconCon elk"><i className="fas fa-plug "></i></div>
                                                <div className="iconCon home"><i className="fas fa-house-user"></i></div>
                                                <div className="iconCon tempIcon"> <i className="fas fa-thermometer-three-quarters"></i></div>
                                                <div className="iconCon musicIcon"><i className="fas fa-music"></i></div>
                                                
                                             </div>
                                             </div>
                                             
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
             </div>
             <Footer/>
             </React.Fragment>   
        
    )
}

}
export default LandingPage