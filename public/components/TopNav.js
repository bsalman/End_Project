import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {toggleSideBar,toggleSideBarSmallScreen} from '../actions/index'
//import SideNav from './SideNav'
import {logoutPost} from '../services/api'

class TopNav extends React.Component {

  showSideBar =(e)=>{
    this.props.toggleSideBar(e.target.checked)
  }

  showSideBarSmallScreen = (e) =>{
    this.props.toggleSideBar(!this.props.smallScreenCheck)
    this.props.toggleSideBarSmallScreen(!this.props.smallScreenCheck)
  }

  // log out 
  logoutOnClick = (e) =>{
    e.preventDefault()
    logoutPost().then(data =>{
      console.log('navData:',data);
      if(data === 10){
        console.log('navProps:',this.props);

        this.props.history.push('/login')
      }
    })
  }
  render() {
    return (

      <React.Fragment>
        <nav
          className={`navbar navbar-expand fixed-top d-flex flex-row justify-content-start`}>
          <div className="d-none d-lg-block" >
            <form>
              <div id="menu-minifier">
                <label>
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <rect x="2" y="8" width="4" height="3" className="menu-dots"></rect>
                    <rect x="2" y="15" width="4" height="3" className="menu-dots"></rect>
                    <rect x="2" y="22" width="4" height="3" className="menu-dots"></rect>
                    <rect x="8" y="8" width="21" height="3" className="menu-lines"></rect>
                    <rect x="8" y="15" width="21" height="3" className="menu-lines"></rect>
                    <rect x="8" y="22" width="21" height="3" className="menu-lines"></rect>
                  </svg>
                  <input onClick={this.showSideBar} id="minifier" type="checkbox"/>
                </label>
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
          <Link className="navbar-brand px-lg-3 px-1 mr-0 menu-bar" to="/">SMART Family</Link>
          <div className="ml-auto">
            <div className="navbar-nav flex-row navbar-icons">
              <div className="nav-item">
                {/* <button
                  id="alerts-toggler"
                  className="btn btn-link nav-link"
                  title="Alerts"
                  type="button"
                  data-alerts="3"
                  data-toggle="modal"
                  data-target="#alertsModal">
                  <svg className="icon-sprite">
                    <use xlinkHref="images/icons-sprite.svg#alert"/>
                    <svg className="text-danger"><use className="icon-dot" xlinkHref="images/icons-sprite.svg#icon-dot"/></svg>
                  </svg>
                </button> */}
              </div>
              <div id="user-menu" className="nav-item dropdown">
                <button
                  className="btn btn-link nav-link dropdown-toggle"
                  title="User"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.logoutBtnClick}>
                  <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#user"/></svg>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {/* <Link className="dropdown-item" to="profile.html">Profile</Link>
                  <div className="dropdown-divider"></div> */}
                  <Link className="dropdown-item" onClick={this.logoutOnClick} to="/login">Logout</Link>
                </div>
              </div>
              <div className="nav-item d-lg-none">
                
                <button
                  onClick ={this.showSideBarSmallScreen}
                  id="sidebar-toggler"
                  type="button"
                  className="btn btn-link nav-link"
                  data-toggle="offcanvas">
                  <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#menu"/></svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
       
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    smallScreenCheck: state.smallScreenCheck, 
      //loggedin: state.loggedin
    })
}

let TopNavWithRouter = withRouter(TopNav);

export default connect(mapStateToProps,{toggleSideBar,toggleSideBarSmallScreen})(TopNavWithRouter)