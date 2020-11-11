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
                                <div className="container-lg">
                                    <div className="row textsContainer">
                                        <div className="col-sm-12 col-md-6">
                                        <div className="col textsContainer   ">
                                                <div className="row justify-content-center">
                                                    <h1>Smart Family <br/>Technology</h1>
                                                </div> 
                                        
                                                <div className="row justify-content-center">
                                                    <p> With us ,your home comes alive Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32</p>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <Link to="/dashboard">
                                                        <button type="button" className="btn btn-lg btn-primary btn1">Get started</button>
                                                    </Link>
                                                </div>
                                        </div>
                                        </div>
                                       
                                            <div className=" col-sm-12 col-md-6"> 
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
           
        
    )
}

}
export default LandingPage
