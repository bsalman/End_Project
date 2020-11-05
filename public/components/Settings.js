// import dependencies
import React from 'react'
import {Link} from 'react-router-dom'


class Settings extends React.Component {

  render() {
   
    return (
      <div className="row mt-5">
            <div className="col-sm-12 col-md-6 col-xl-4">
                <div className="card">
                    <div className="card-body text-center">
                      <Link to="/accountSettings">
                        <img src="/images/account.png"></img>
                        <h5> Account Setting </h5>
                        <p>Change Username & Password</p>
                      </Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-4 ">
                <div className="card ">
                    <div className="card-body text-center ">
                      <Link to="">
                      <img src="/images/reset.png"></img>
                        <h5> Factory Setting </h5>
                        <p>Reset Your System </p>
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
                        <p>Get The Latest Update </p>
                      </Link>
                    </div>
                </div>
            </div>        
        </div>
                    

    )
  }

}



export default (Settings)