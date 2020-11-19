import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {ListGroup, ListGroupItem} from 'reactstrap';
import {connect} from 'react-redux'



class SideNav extends React.Component{



  render(){
      return(
          <React.Fragment>
           
                 {/* <!-- Side menu START --> */}
            <div id="sidebar" className={`${this.props.check ? 'sidebar-offcanvas' : 'sidebar-offcanvas  mini'}`}>
              <ListGroup className="nav flex-column nav-sidebar">
              <ListGroupItem className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                    {/* <i class="fas fa-columns icon-sprite"></i> */}
                    {/* <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#home"/></svg> */}
                    <img src="/images/dashboard-10-24.png"></img> 
                    {/* <br></br>  */}
                    &nbsp;
                      Dashboard
                    </Link>
                  </ListGroupItem>
                {/* <ListGroupItem className="nav-item">
                  <Link className="nav-link" to="lights.html">
                    <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#bulb-eco"/></svg>
                    Lights
                  </Link>
                </ListGroupItem> */}
                <ListGroupItem className="nav-item">
                  <Link className="nav-link" to="/rooms">
                    {/* <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#camera"/></svg> */}
                    <img src="/images/home-24.png"></img> 
                    &nbsp;
                    &nbsp;
                   Rooms
                  </Link>
                </ListGroupItem>
                {/* <ListGroupItem className="nav-item">
                  <Link className="nav-link" to="appliances.html">
                    <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#appliances"/></svg>
                    Appliances
                  </Link>
                </ListGroupItem> */}
                <ListGroupItem className="nav-item">
                  <Link className="nav-link" to="/settings">
                    {/* <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#settings"/></svg> */}
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

let sideNavWithRouter = withRouter(SideNav);

const mapStateToProps = (state) => {
  return({
    check: state.check,
    smallScreenCheck: state.smallScreenCheck, 
  })
}

export default connect(mapStateToProps,null)(sideNavWithRouter)