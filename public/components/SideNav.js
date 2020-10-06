import React from 'react'
import {Link, withRouter} from 'react-router-dom'




class SideNav extends React.Component{
 
    render(){
        return(
            <React.Fragment>
                   {/* <!-- Side menu START --> */}
              <div id="sidebar" className="sidebar-offcanvas">
                <ul className="nav flex-column nav-sidebar">
                  <li className="nav-item">
                    <Link className="nav-link" to="index.html">
                      <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#home"/></svg>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="lights.html">
                      <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#bulb-eco"/></svg>
                      Lights
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="cameras.html">
                      <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#camera"/></svg>
                      Cameras
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="appliances.html">
                      <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#appliances"/></svg>
                      Appliances
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#settings"/></svg>
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <!-- Side menu END --> */}
            </React.Fragment>
        )
    }

}

export default withRouter(SideNav)