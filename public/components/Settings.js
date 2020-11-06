// import dependencies
import React from 'react'
import {Link} from 'react-router-dom'







// create a setting classNameName
class Settings extends React.Component {
  

    
  // create a state
  
 
  

  



  
  render() {
   
    return (
      <div className="row mt-5">
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card">
                    <div className="card-body text-center">
                      <Link to="/accountSettings">
                        <img src="/images/account.png"></img>
                        <h5> Account Setting </h5>
                        <p>change Username&Password </p>
                      </Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4 ">
                <div className="card ">
                    <div className="card-body text-center ">
                      <Link to="">
                      <img src="/images/reset.png"></img>
                        <h5> factory setting </h5>
                        <p>Reset your System </p>
                      </Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card">
                    <div className="card-body text-center">
                      <Link to="">
                      <img src="/images/update.png"></img>
                        <h5>System Update</h5>
                        <p>get last update </p>
                      </Link>
                    </div>
                </div>
            </div>        
        </div>
                    

    )
  }

}



export default (Settings)