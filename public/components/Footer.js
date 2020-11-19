import React from 'react'
import {Link} from 'react-router-dom'

class Footer extends React.Component {
  render() {
    return (
      <footer className="footerStyle">
        <div className="container py-3">
          <div className="row">
            <div className="col-md-4">
              <div className="address text-center">
                <h4>Our Address</h4>
                <p>Hamburg,PLZ 21456 HauptStr,</p>
                <p>Call : 800 1234 5678</p>
                <p>Email : info@gmail.com</p>
              </div>
              <div className="">
               
            </div>
            </div>
            <div className="col-md-4 med">
              <div className="timing text-center">
              <h4>Timing</h4>
                <p>Mon - Fri: 7am - 10pm</p>
                <p>​​Saturday: 8am - 10pm</p>
                <p>​Sunday: 8am - 11pm</p>
              </div>
                
              </div>
            <div className="col-md-4 rig">
              <div className="navigation text-center">
                <h4 >Info & Contact</h4>
                <ul style={{listStyle: 'none'}}>
                  <li>
                    <Link to="/ContactUs" style={{color:"#aee0fa"}}>Contact us</Link>
                  </li>
                  <br/>
                  <li>
                    <Link to="/AboutUs" style={{color:"#aee0fa"}}>About Us</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
            </div>
          
      </footer>
    )
  }
}

export default Footer