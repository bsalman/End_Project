import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {ListGroup, ListGroupItem, Button, Label, Input, Form} from 'reactstrap';
// import the components
import CustomModal from './CustomModal'

import {changeUserPost} from '../services/api'



//------------------------------------------------------------//
///////////////     CLASS COMPONENT       ////////////////
//-----------------------------------------------------------//

class AccountSettings extends React.Component {

  // create a state
  state = {
    name: '',
    password: '',
    repassword: '',
    oldPassword: '',
    errorComponent: null,
    showErrorModal: false,
    resultElement: null,
    alert: '',
    alertColor: 'text-danger',
    showSpan : false
  }
 
  onRegisterBtnClick = (e) => {
    //console.log('strong',this.state.alert);
    e.preventDefault()
    if (this.state.name.trim() === '' || this.state.oldPassword.trim() === '' || (this.state.password === '' || this.state.alert === 'weak password') || this.state.password !== this.state.repassword) {
      const errorsElement = (

        <ul>
          {this
            .state
            .name
            .trim() === ''
            ? <div>Please enter a Username into the input box</div>
            : null}
            {this
            .state.oldPassword.trim() === ''
            ? <div>Please enter your Old Password into the input box</div>
            : null}
          {this.state.password === ''
            ? <div>Please enter your new Password into the input box</div>
            : null}
          {this.state.alert === 'weak password'
            ? <div>Your password is too weak... Please enter a strong one into the input box</div>
            : null}
          {this.state.password !== this.state.repassword
            ? <div>Your Password is not matching the Confirmed one</div>
            : null}
        </ul>

      )

      this.setState({errorComponent: errorsElement, showErrorModal: true})
    } else {
      //console.log(this.state);
      changeUserPost(this.state.name, this.state.password,this.state.repassword, this.state.oldPassword).then(data => {
        
        let badgeClass = ''
        let badgeMessage =''

        switch (data) {
          case 1:
            // badgeClass = 'alert alert-success'
            // badgeMessage = 'The changes are done successfully, you can login again now'
            this.props.history.push('/dashboard')
            break;
          case 2:
          case 4:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'There was a server side error, please contact the administrator'
            break;
          case 3:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'The old password is wrong, please try again'
            break;
          default:
            break;
        }
        if(data!=1){
          const badge = (
            <div className="alert alert-danger" role="alert">
                  Can not send the registration data to the server
            </div>
            )
            this.setState({
            errorComponent: badge
            })
        }
        


      }).catch(error => {
         // console.log(error);
        const badge = (
          <div className="alert alert-danger" role="alert">
              Can not send the registration data to the server
          </div>
        )
        this.setState({
          errorComponent: badge,
          showErrorModal: true
        })
      })
    }

  }

  

  closeModal = () => {
    this.setState({showErrorModal: false})
  }

  analyze = (e) =>{
    //this.setState({password: e.target.value})
    const mediumRegex = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,9}$");
    const strongRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,15})");
    
    if(strongRegex.test(e.target.value)) {
        this.setState({ alert: "strong password" ,
        alertColor: "text-success",
                        password: e.target.value,
                        showSpan:true
        });
        //console.log('strong');
    } else if(mediumRegex.test(e.target.value)) {
      this.setState({ alert: "medium password" ,
      alertColor: "text-warning",
                      password: e.target.value,
                      showSpan:true
      });
      //console.log('medium');
    } else {
      this.setState({ alert: "weak password" ,
                      alertColor: "text-danger",
                      password: e.target.value,
                      showSpan:true
      });
      //console.log('weak');
    }
}
  
  render() {
    //   console.log('the props is:',this.props);
    return (

      <React.Fragment>

    <CustomModal show={this.state.showErrorModal}
          close={this.closeModal}
          className="bg-danger"
          title="Error with Your Entries">
          {this.state.errorComponent}
    </CustomModal>

              {/* <!-- Main content START --> className={this.props.loggedin === 'false' ? '' : 'd-none'}*/}
              <div id="main" >
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1">
                      {/* <!-- Profile tabs START --> */}
                      <ListGroup className="nav nav-tabs nav-fill" role="tablist">
                        <ListGroupItem className="pl-0 nav-item">
                          <h3>Change Default Settings</h3>
                        </ListGroupItem>
                      </ListGroup>
                      <div className="info-holder info-ct">
                      <div data-toggle="popover-all"
                          data-content="Customized tabbed interface"
                          data-original-title="Tabs"
                          data-placement="top"
                          data-offset="0,48"></div>
                      </div>
                      {/* <!-- Profile tab panes --> */}
                      <div className="tab-content px-4 px-sm-0 py-sm-4 mt-4">

                        {/* <!-- Password pane START --> */}
                        <Form>
                            <div className="form-group row">
                              <Label htmlFor="first-name" className="col-12 col-sm-3 col-form-label">New Username</Label>
                              <div className="col-12 col-sm-9">
                                <Input
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
                              <Label htmlFor="user-password" className="col-12 col-sm-3 col-form-label">Old Password</Label>
                              <div className="col-12 col-sm-9">
                                <Input
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
                              <Label htmlFor="user-password" className="col-12 col-sm-3 col-form-label">Password</Label>
                              <div className="col-12 col-sm-9">
                                <Input
                                  className="form-control custom-focus"
                                  type="password"
                                  value={this.state.password}
                                  onChange={this.analyze}
                                  id="user-password"
                                  title="8 characters minimum"/>
                                  <span className={this.state.showSpan ?  this.state.alertColor : ''} style={{ display: this.state.showSpan ?  'block' : 'none' }} >{this.state.alert}</span>
                              </div>
                            </div>
                            <div className="form-group row has-success">
                              <Label htmlFor="user-password-confirm" className="col-12 col-sm-3 col-form-label">Confirm Password</Label>
                              <div className="col-12 col-sm-9">
                                <Input
                                  className="form-control custom-focus"
                                  type="password"
                                  value={this.state.repassword}
                                  onChange={(e)=> {
                                      this.setState({repassword: e.target.value})
                                   }}
                                  id="user-password-confirm"/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="offset-xs-0 offset-sm-3 col-12 col-sm-9 mt-3">
                                <Button onClick={this.onRegisterBtnClick} className="btn btn-primary">Save Changes</Button>
                              </div>
                            </div>
                          </Form>
                        
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
            
            {/* <!-- row-offcanvas END --> */}
         
          {/* <!-- wrapper-offcanvas END --> */}
      
        {/* <!-- Wrapper END --> */}
        {/*
  <!-- FAB button - bottom right on large screens --> */}
        {/* <Button
          id="info-toggler"
          type="button"
          className="btn btn-primary btn-fab btn-fixed-br d-none d-lg-inline-block">
          <svg className="icon-sprite"><use xlinkHref="images/icons-sprite.svg#info"/></svg>
        </Button> */}

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
        loggedin: state.loggedin
      })
}

export default connect(mapStateToProps)(withRouter(AccountSettings))