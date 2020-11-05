import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {ListGroup,ListGroupItem} from 'reactstrap';


class SideNav extends React.Component{
    render(){
        return(
            <React.Fragment>
             
                   {/* <!-- Side menu START --> */}
              <div id="sidebar" className="sidebar-offcanvas">
                <ListGroup className="nav flex-column nav-sidebar">
                  <ListGroupItem className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                    <img src="/images/dashboard-10-24.png"></img> 
                    &nbsp;
                    &nbsp;
                      Dashboard
                    </Link>
                  </ListGroupItem>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="lights.html">
                      <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#bulb-eco"/></svg>
                      Lights
                    </Link>
                  </li> */}
                  <ListGroupItem className="nav-item">
                    <Link className="nav-link" to="/rooms">
                    <img src="/images/home-24.png"></img> 
                    &nbsp;
                    &nbsp;
                     Rooms
                    </Link>
                  </ListGroupItem>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="appliances.html">
                      <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#appliances"/></svg>
                      Appliances
                    </Link>
                  </li> */}
                  <ListGroupItem className="nav-item">
                    <Link className="nav-link" to="/settings">
                    <img src="/images/services-32.png"></img> 
                    &nbsp;
                      Settings
                    </Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
              {/* <!-- Side menu END --> */}
              
            </React.Fragment>
        )
    }

}

export default withRouter(SideNav)