// import dependencies
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
// import the components
import {changeUserPost} from '../services/api'
import CustomModal from './CustomModal'
import SideNav from './SideNav'
import TopNav from './TopNav'

// create a setting classNameName
class Settings extends React.Component {

  // create a state
  state = {
    username: '',
    password: '',
    repassword: '',
    oldPassword: '',
    errorComponent: null,
    showErrorModal: false,
    resultElement: null
  }
 
  onRegisterBtnClick = (e) => {
    e.preventDefault()
    if (this.state.username.trim() === ''|| this.state.oldPassword.trim() === '' || this.state.password === '' || this.state.password !== this.state.repassword) {
      const errorsElement = (

        <ul>
          {this
            .state.username.trim() === ''
            ? <div>Name should not be empty</div>
            : null}
            {this
            .state.oldPassword.trim() === ''
            ? <div>Old Password should not be empty</div>
            : null}
          {this.state.password === ''
            ? <div>Password should not be empty</div>
            : null}
          {this.state.password !== this.state.repassword
            ? <div>Password is not matching the Reconfirmation</div>
            : null}
        </ul>

      )

      this.setState({errorComponent: errorsElement, showErrorModal: true})
    } else {
      // console.log(this.state);
      changeUserPost(this.state.username, this.state.password, this.state.repassword, this.state.oldPassword).then(data => {
     console.log(data);
        let badgeClass = ''
        let badgeMessage =''

        switch (data) {
          case 1:
            badgeClass = 'alert alert-success'
            badgeMessage = 'You changed your Username and Password successfully, please go on'
            break;
          case 2:
          case 4:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'there was a server side error, please contact the administrator'
            break;
          case 3:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'this user already exists'
            break;
          default:
            break;
        }
        const badge = (
          <div className={badgeClass} role="alert">
                      {badgeMessage}
          </div>
        )
        this.setState({
          resultElement: badge
        })

      }).catch(error => {
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
    console.log(this.state);
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
          <TopNav />
          {/* <!-- Top navbar END --> */}

          {/* <!-- wrapper-offcanvas START --> */}
          <div className="wrapper-offcanvas">
            {/* <!-- row-offcanvas START --> */}
            <div className="row-offcanvas row-offcanvas-left">

              {/* <!-- Side menu START --> */}
              <SideNav />
              {/* <!-- Side menu END --> */}

              {/* <!-- Main content START --> */}
              <div id="main" className={this.props.loggedin === 'false' ? '' : 'd-none'}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1">
                      {/* <!-- Profile tabs START --> */}
                      <ul className="nav nav-tabs nav-fill" role="tablist">
                        <li className="nav-item">
                          <h3>Please Change Your Default Settings</h3>
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
                              <label htmlFor="first-name" className="col-12 col-sm-3 col-form-label">New Username</label>
                              <div className="col-12 col-sm-9">
                                <input
                                  className="form-control custom-focus"
                                  type="text"
                                  value={this.state.username}
                                  onChange={(e) => {
                                   this.setState({username: e.target.value})
                                   }}
                                  id="first-name"/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="user-password" className="col-12 col-sm-3 col-form-label">Old Password</label>
                              <div className="col-12 col-sm-9">
                                <input
                                  className="form-control custom-focus"
                                  type="password"
                                  value={this.state.oldPassword}
                                  onChange={(e) => {
                                   this.setState({oldPassword: e.target.value})
                                   }}
                                  id="user-password"/>
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
                              <label htmlFor="user-password-confirm" className="col-12 col-sm-3 col-form-label">Confirm Password</label>
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
                                <button  onClick={this.onRegisterBtnClick}className="btn btn-primary">Save Changes</button>
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
const mapStateToProps = (state) => {
  return({
      user: state.user, 
      loggedin: state.loggedin})
}


export default connect(mapStateToProps)(withRouter(Settings))