import React from 'react'
import LandNav from './LandNav'
import Footer from './Footer'
const Technology = () =>{
    return(
      <React.Fragment>
            <div id="wrapper">
                <LandNav/>
          <div className="containerTech">
            <div className="row">
                <div className="col-sm-12 col-md-6 col-xl-4">
                     <div className="card  tech "><img src="/images/html.png"></img></div>
                </div>
                <div className="col-sm-12 col-md-6 col-xl-4">
                     <div className="card tech">
                     <img src="/images/css.png"></img>
                     </div>
                </div>
                <div className="col-sm-12 col-md-6 col-xl-4">
                     <div className="card tech">
                     <img src="/images/nodejs.png"></img>
                     </div>
                </div>
            </div>
            <br/>
            <div className="row">
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card tech">
                    <img src="/images/js.png"></img>
                </div>
             </div>
            <div className="col-sm-12 col-md-6 col-xl-4">
                 <div className="card tech">
                 <img src="/images/react.png"></img>
                 </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card tech">
                 <img src="../images/mySql.png"></img>
                </div>
             </div>
            </div>
            <br/>
            <div className="row">
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card tech">
                 <img src="/images/arduino.jpg"></img>
                </div>
             </div>
             <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card tech">
                 <img src="/images/ardi.jpeg"></img>
                </div>
             </div>
             <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card tech">
                 <img src="/images/ardi2.jpeg"></img>
                </div>
             </div>
             </div>
             <div className="row">
             <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card tech">
                <img src="/images/raspberry.jpg"></img>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card tech">
                <img src="/images/ardi3.jpg"></img>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card tech">
                <img src="/images/ardi4.jpg"></img>
                </div>
            </div>
             </div>
             </div>
             </div>
             <Footer/>
             </React.Fragment>
    )
}
export default (Technology)