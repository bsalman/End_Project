//------------------------------------------------------------//
///////////////       IMPORT DEPENDENCIES     /////////////////
//-----------------------------------------------------------//
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';

//-------------------------------------------------------//
///////////////    CLASS COMPONENT       ////////////////
//------------------------------------------------------//
class LandNav extends React.Component {
    state={
        isOpen:false
    }
    toggle =()=>{this.setState({isOpen: !this.state.isOpen})}
    render() {
      return (
  
        <React.Fragment>
          <Navbar 
            className="navbar navbar-expand fixed-top d-flex flex-row justify-content-start " expand="lg">
            <NavbarBrand className="px-lg-3 px-1 mr-0" href="/">SMART Family</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar> 
                <NavItem>
                    <NavLink tag={Link} to="/aboutus">About Us</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/aboutus">Contact Us</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            
        </Navbar>
         
        </React.Fragment>
      )
    }
  }
  
  
    export default withRouter(LandNav)
  