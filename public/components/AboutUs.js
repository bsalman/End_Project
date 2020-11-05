import React, { useState } from 'react'
// import {Collapse} from 'react-transition-group'

// import LandNav from './LandNav'

const AboutUsPage = () => {
    //===================== Set the initial state ======================//

    let intialState = {
      //for the first member display the front or the back of the box
      dFirstBlock:true,
      dFirstNone:false,

      //for the first member display the front or the back of the box
      dSecondBlock:true,
      dSecondNone:false,

      //for the first member display the front or the back of the box
      dThirdBlock:true,
      dThirdNone:false,
  }

  const [state,setState] = useState(intialState)


  // display and hide the first box
  const showDetailsFirstMember = e => {
    e.preventDefault()
    setState({...state,
      dFirstBlock:!state.dFirstBlock,
      dFirstNone:!state.dFirstNone})
  }

  // display and hide the second box
  const showDetailsSecondMember = e => {
    e.preventDefault()
    setState({...state,
      dSecondBlock:!state.dSecondBlock,
      dSecondNone:!state.dSecondNone})
  }

  // display and hide the third box
  const showDetailsThirdMember = e => {
    e.preventDefault()
    setState({...state,
      dThirdBlock:!state.dThirdBlock,
      dThirdNone:!state.dThirdNone})
  }


    return (


      <div className="wrapper">
        <h1>Our Team</h1>

        {/* TEAMS MEMBERS START */}

          <div className="our_team">
            {/* FIRST MEMBER */}
            <div className="team_member">
              <div onClick={showDetailsFirstMember}>
                <div className={`member_area ${state.dFirstBlock === true ? "d-block" : 'd-none'}`}>
                  <div className="member_img">
                    <img src="https://i.imgur.com/JzUIF4o.png" alt="our_team"/>
                    <div className="social_media">
                      <h3>Click on me</h3>
                    </div>
                  </div>
                  <h3>Neda Dehghan</h3>
                  <span>FULLSTACK Web Devloper</span>
                </div>

                <div className={`member_info ${state.dFirstNone === true ? "d-block" : 'd-none'}`}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione perspiciatis, error deleniti quaerat beatae doloribus incidunt excepturi. Fugit deleniti accusantium neque hic quidem voluptatibus cumque.</p>
                </div>
              </div>
              <ul>
                <li><a href="#"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-google-plus" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
              </ul>
            </div>

            {/* SECOND MEMBER */}
            <div className="team_member">
              <div onClick={showDetailsSecondMember}>
                <div className={`member_area ${state.dSecondBlock === true ? "d-block" : 'd-none'}`}>
                  <div className="member_img">
                    <img src="https://i.imgur.com/2Necikc.png" alt="our_team"/>
                    <div className="social_media">
                      <h3>Click on me</h3>
                    </div>
                  </div>
                  <h3>Bashar Salman</h3>
                  <span>FULLSTACK Web Devloper</span>
                </div>

                <div className={`member_info ${state.dSecondNone === true ? "d-block" : 'd-none'}`}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione perspiciatis, error deleniti quaerat beatae doloribus incidunt excepturi. Fugit deleniti accusantium neque hic quidem voluptatibus cumque.</p>
                </div>
              </div>
              <ul>
                <li><a href="#"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-google-plus" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
              </ul>
            </div>

            {/* THIRD MEMBER */}
            <div className="team_member">
              <div onClick={showDetailsThirdMember}>
                <div className={`member_area ${state.dThirdBlock === true ? "d-block" : 'd-none'}`}>
                  <div className="member_img">
                    <img src="https://i.imgur.com/JzUIF4o.png" alt="our_team"/>
                    <div className="social_media">
                      <h3>Click on me</h3>
                    </div>
                  </div>
                  <h3>Safa Bouhlel</h3>
                  <span>FULLSTACK Web Devloper</span>
                </div>

                <div className={`member_info ${state.dThirdNone === true ? "d-block" : 'd-none'}`}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione perspiciatis, error deleniti quaerat beatae doloribus incidunt excepturi. Fugit deleniti accusantium neque hic quidem voluptatibus cumque.</p>
                </div>
              </div>
              <ul>
                <li><a href="#"><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-google-plus" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </div>

        {/* TEAMS MEMBERS END */}
      </div>


    )


}
export default AboutUsPage