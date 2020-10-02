// import dependencies
import React from 'react'
import {Link} from 'react-router-dom'

// import the components
import CustomModal from './CustomModal'

import {changeUserPost} from '../services/api'

// create a setting classNameName
class Settings extends React.Component {

  // create a state
  state = {
    name: '',
    password: '',
    repassword: '',
    errorComponent: null,
    showErrorModal: false,
    resultElement: null
  }
 
  onRegisterBtnClick = (e) => {
    e.preventDefault()
    if (this.state.name.trim() === '' || this.state.password === '' || this.state.password !== this.state.repassword) {
      const errorsElement = (

        <ul>
          {this
            .state
            .name
            .trim() === ''
            ? <div>Name should not be empty</div>
            : null}
          {this.state.password === ''
            ? <div>password should not be empty</div>
            : null}
          {this.state.password !== this.state.repassword
            ? <div>password is not matching the repassword</div>
            : null}
        </ul>

      )

      this.setState({errorComponent: errorsElement, showErrorModal: true})
    } else {
      //console.log(this.state);
      changeUserPost(this.state.name, this.state.password, this.state.repassword).then(data => {
        console.log(data);
        let badgClass = ''
        let badgMessage =''

        switch (data) {
          case 1:
            badgClass = 'alert alert-success'
            badgMessage = 'You register succefully, you can login now'
            break;
          case 2:
          case 4:
            badgClass = 'alert alert-danger'
            badgMessage = 'there was a server side error, pleasecontact the adminstrator'
            break;
          case 3:
            badgClass = 'alert alert-danger'
            badgMessage = 'there is already a user with the same email, please choose another email'
            break;
          default:
            break;
        }
        const badge = (
          <div className={badgClass} role="alert">
                      {badgMessage}
          </div>
        )
        this.setState({
          resultElement: badge
        })


      }).catch(error => {
          console.log(error);
        const badge = (
          <div className="alert alert-danger" role="alert">
                      can not send the registration data to server
          </div>
        )
        this.setState({
          resultElement: badge
        })
      })
    }

  }


  closeModal = () => {
    this.setState({showErrorModal: false})
  }


  render() {
    return (

      <React.Fragment>

    <CustomModal
          show={this.state.showErrorModal}
          close={this.closeModal}
          className="bg-danger"
          title="Error with Your Entries">
          {this.state.errorComponent}
    </CustomModal>
        {/* <!-- Preloader --> */}
        {/* <div id="iot-preloader">
          <div className="center-preloader d-flex align-items-center">
            <div className="spinners">
              <div className="spinner01"></div>
              <div className="spinner02"></div>
            </div>
          </div>
        </div> */}

        {/* <!-- Alerts Modal --> */}
        <div
          className="modal modal-nobg centered fade"
          id="alertsModal"
          tabIndex="-1"
          role="dialog"
          aria-label="Alerts"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div
                  className="alert alert-danger alert-dismissible fade show border-0"
                  role="alert">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  Security SW update available
                </div>
                <div
                  className="alert alert-warning alert-dismissible fade show border-0"
                  role="alert">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  New device recognized
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="close close-modal"
            data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {/* <!-- Alarm Modal --> */}
        <div
          className="modal modal-danger centered fade"
          id="alarmModal"
          tabIndex="-1"
          role="dialog"
          aria-label="ALARM"
          aria-hidden="true"
          data-backdrop="static">
          <div className="modal-dialog" role="document">
            <div className="modal-content" data-dismiss="modal">
              <div className="modal-body d-flex">
                <svg className="icon-sprite icon-2x icon-pulse"><use xlinkHref="images/icons-sprite.svg#alarm"/></svg>
                <h3 className="text-right font-weight-bold ml-auto align-self-center">MOTION DETECTED!</h3>
              </div>
            </div>
            <p className="mt-2 text-center text-danger">Click the red area to accept/close message</p>
          </div>
        </div>

        {/* <!-- Wrapper START --> */}
        <div id="wrapper">
          {/* <!-- Top navbar START --> */}
          <nav
            className="navbar navbar-expand fixed-top d-flex flex-row justify-content-start">
            <div className="d-none d-lg-block">
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
                    <input id="minifier" type="checkbox"/>
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
            <Link className="navbar-brand px-lg-3 px-1 mr-0" to="#">SMART family</Link>
            <div className="ml-auto">
              <div className="navbar-nav flex-row navbar-icons">
                <div className="nav-item">
                  <button
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
                  </button>
                </div>
                <div id="user-menu" className="nav-item dropdown">
                  <button
                    className="btn btn-link nav-link dropdown-toggle"
                    title="User"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#user"/></svg>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" to="profile.html">Profile</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="login.html">Logout</Link>
                  </div>
                </div>
                <div className="nav-item d-lg-none">
                  <button
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
          {/* <!-- Top navbar END --> */}
          {/* <!-- wrapper-offcanvas START --> */}
          <div className="wrapper-offcanvas">
            {/* <!-- row-offcanvas START --> */}
            <div className="row-offcanvas row-offcanvas-left">
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
              {/* <!-- Main content START --> */}
              <div id="main">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1">
                      {/* <!-- Profile tabs START --> */}
                      <ul className="nav nav-tabs nav-fill" role="tablist">
                        <li className="nav-item">
                          <h3>CHANGE DEFAULT PASSWORD</h3>
                        </li>
                      </ul>
                      <div className="info-holder info-ct">
                        <div
                          data-toggle="popover-all"
                          data-content="Customized tabbed interface"
                          data-original-title="Tabs"
                          data-placement="top"
                          data-offset="0,48"></div>
                      </div>
                      {/* <!-- Profile tab panes --> */}
                      <div className="tab-content px-4 px-sm-0 py-sm-4 mt-4">

                        {/* <!-- Password pane START --> */}
                          <form>
                            <div className="form-group row">
                              <label htmlFor="first-name" className="col-12 col-sm-3 col-form-label">First name</label>
                              <div className="col-12 col-sm-9">
                                <input
                                  className="form-control custom-focus"
                                  type="text"
                                  value={this.state.name}
                                  onChange={(e) => {
                                   this.setState({name: e.target.value})
                                   }}
                                  id="first-name"/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="user-password" className="col-12 col-sm-3 col-form-label">Password</label>
                              <div className="col-12 col-sm-9">
                                <input
                                  className="form-control custom-focus"
                                  type="password"
                                  value={this.state.password}
                                  onChange={(e) => {
                                   this.setState({password: e.target.value})
                                   }}
                                  id="user-password"/>
                              </div>
                            </div>
                            <div className="form-group row has-success">
                              <label htmlFor="user-password-confirm" className="col-12 col-sm-3 col-form-label">Confirm password</label>
                              <div className="col-12 col-sm-9">
                                <input
                                  className="form-control custom-focus"
                                  type="password"
                                  value={this.state.repassword}
                                  onChange={(e) => {
                                      this.setState({repassword: e.target.value})
                                   }}
                                  id="user-password-confirm"/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="offset-xs-0 offset-sm-3 col-12 col-sm-9 mt-3">
                                <button  onClick={this.onRegisterBtnClick}className="btn btn-primary">Save password</button>
                              </div>
                            </div>
                          </form>
                        
                        {/* <!-- Password pane END --> */}
                      </div>
                      {/* <!-- Profile tabs END --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Main content overlay when side menu appears  --> */}
                <div className="cover-offcanvas" data-toggle="offcanvas"></div>
              </div>
              {/* <!-- Main content END --> */}
            </div>
            {/* <!-- row-offcanvas END --> */}
          </div>
          {/* <!-- wrapper-offcanvas END --> */}
        </div>
        {/* <!-- Wrapper END --> */}
        {/*
  <!-- FAB button - bottom right on large screens --> */}
        <button
          id="info-toggler"
          type="button"
          className="btn btn-primary btn-fab btn-fixed-br d-none d-lg-inline-block">
          <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#info"/></svg>
        </button>

        {/* <!-- SVG assets - not visible --> */}
        <svg
          id="svg-tool"
          xmlnsXlink="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink">
          <defs>
            {/* <style type="text/css">.glow circle {fill:url(#radial-glow)}</style> */}
            <filter id="blur" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
            </filter>
            <radialGradient id="radial-glow" fx="50%" fy="50%" r="50%">
              <stop offset="0" stopColor="#0F9CE6" stopOpacity="1"/>
              <stop offset="1" stopColor="#0F9CE6" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </React.Fragment>
    )
  }

}

export default Settings