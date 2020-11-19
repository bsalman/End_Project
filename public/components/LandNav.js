import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
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
                    <NavLink  tag={Link} to="/aboutus">About us</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/contactus">Contact us</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/technology">Technology</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            
        </Navbar >
         
        </React.Fragment>
      )
    }
  }
  
  
    export default withRouter(LandNav)
  