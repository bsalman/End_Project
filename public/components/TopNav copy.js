import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Nav,NavLink, NavItem, Button, Label, Input} from 'reactstrap'
import {logoutPost} from '../services/api'



//------------------------------------------------------------//
///////////////    CLASS COMPONENT       ////////////////
//-----------------------------------------------------------//
class TopNav extends React.Component {

// log out 
  logoutOnClick = (e) =>{
    e.preventDefault()
    logoutPost().then(data =>{
      console.log(data);
      if(data === 10){
        this.props.history.push('/login')
      }
    })
  }
    

  render() {
    return (

      <React.Fragment>
        <Nav
          className="navbar navbar-expand fixed-top d-flex flex-row justify-content-start">
          <div className="d-none d-lg-block">
            <form>
              <div id="menu-minifier">
                <Label>
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <rect x="2" y="8" width="4" height="3" className="menu-dots"></rect>
                    <rect x="2" y="15" width="4" height="3" className="menu-dots"></rect>
                    <rect x="2" y="22" width="4" height="3" className="menu-dots"></rect>
                    <rect x="8" y="8" width="21" height="3" className="menu-lines"></rect>
                    <rect x="8" y="15" width="21" height="3" className="menu-lines"></rect>
                    <rect x="8" y="22" width="21" height="3" className="menu-lines"></rect>
                  </svg>
                  <Input id="minifier" type="checkbox"/>
                </Label>
                <div className="info-holder info-rb">
                  <div
                    data-toggle="popover-all"
                    data-content="Checkbox element using localStorage to remember the last status."
                    data-original-title="Side menu narrowing"
                    data-placement="right"></div>
                </div>
              </div>
            </form>
          </div>
          <Link className="navbar-brand px-lg-3 px-1 mr-0" to="#">SMART Family</Link>
          <div className="ml-auto">
            <div className="navbar-nav flex-row navbar-icons">
              <div className="nav-item">

              </div>
              <div id="user-menu" className="nav-item dropdown">
                <Button
                  className="btn btn-link nav-link dropdown-toggle"
                  title="User"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#user"/></svg>
                </Button>
                <div className="dropdown-menu dropdown-menu-right">
                  {/* <Link className="dropdown-item" to="profile.html">Profile</Link>
                  <div className="dropdown-divider"></div> */}
                  {/* <Link className="dropdown-item" to="login.html">Logout</Link> */}
                  <NavItem className="dropdown-item"> 
                  <NavLink tag={Link} onChange={this.logoutOnClick} to="/login">Logout</NavLink>
                  </NavItem>
                  {/* <Link className="dropdown-item" onChange={this.logoutOnClick} to="/login">Logout</Link> */}
                </div>
              </div>
              <div className="nav-item d-lg-none">
                <Button
                  id="sidebar-toggler"
                  type="button"
                  className="btn btn-link nav-link"
                  data-toggle="offcanvas">
                  <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#menu"/></svg>
                </Button>
              </div>
            </div>
          </div>
        </Nav>
       
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return({
      user: state.user, 
      loggedin: state.loggedin
    })
}

  export default withRouter(TopNav)