import React, { useState } from 'react'
// import {Collapse} from 'react-transition-group'
import {
  Button
} from 'reactstrap';
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
      dFirstNone:!state.dFirstNone
    })
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
                    <img src="/images/neda.jpg" alt="our_team"/>
                    <div className="social_media">
                      <h3>Click on me</h3>
                    </div>
                  </div>
                  <h3>Neda Dehghan</h3>
                  <span>FULLSTACK Web Developer</span>
                </div>

                <div className={`member_info ${state.dFirstNone === true ? "d-block" : 'd-none'}`}>
                  <h3>Neda Dehghan</h3>
                  <p className={`${state.dFirstNone === true ? 'text-typing' : ''}`}>I have a Background as a<br/>translator and have<br/>my roots in fine Arts.<br/>With Web Development<br/>
                  I am able to combine all<br/>my previous knowledge.<br/>I like to bring ideas<br/>to life and work with<br/>my team to find the best<br/>solution for the customer.<br/></p>
                </div>
              </div>
              <ul>
                <li><a href="#"><i className="fab fa-github" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-google-plus" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-xing" aria-hidden="true"></i></a></li>
              </ul>
            </div>

            {/* SECOND MEMBER */}
            <div className="team_member">
              <div onClick={showDetailsSecondMember}>
                <div className={`member_area ${state.dSecondBlock === true ? "d-block" : 'd-none'}`}>
                  <div className="member_img">
                    <img src="/images/bashar.jpeg" alt="our_team"/>
                    <div className="social_media">
                      <h3>Click on me</h3>
                    </div>
                  </div>
                  <h3>Bashar Salman</h3>
                  <span>FULLSTACK Web Developer</span>
                </div>

                <div className={`member_info ${state.dSecondNone === true ? "d-block" : 'd-none'}`}>
                <h3>Bashar Salman</h3>
                <p className={`${state.dSecondNone === true ? 'text-typing' : ''}`}>Electrical engineer with<br/>experience in embedded<br/>system and i had the<br/>chance to add the<br/>knowledge frontend and<br/>backend web<br/>development to my<br/>background.<br/></p>
                </div>
              </div>
              <ul>
              <li><a href="#"><i className="fab fa-github" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-google-plus" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-xing" aria-hidden="true"></i></a></li>
              </ul>
            </div>

            {/* THIRD MEMBER */}
            <div className="team_member">
              <div onClick={showDetailsThirdMember}>
                <div className={`member_area ${state.dThirdBlock === true ? "d-block" : 'd-none'}`}>
                  <div className="member_img">
                    <img src="/images/safa.jpg" alt="our_team"/>
                    <div className="social_media">
                      <h3>Click on me</h3>
                    </div>
                  </div>
                  <h3>Safa Bouhlel</h3>
                  <span>FULLSTACK Web Developer</span>
                </div>

                <div className={`member_info ${state.dThirdNone === true ? "d-block" : 'd-none'}`}>
                  <h3>Safa Bouhlel</h3>
                  <p className={`${state.dThirdNone === true ? 'text-typing' : ''}`}>I have a degree in<br/>electrical engineering and<br/>have continued my<br/>studies as a full stack<br/>Web Developer.<br/>
                    I have an eye for problem-<br/>solving and am good at<br/>working solution<br/>orientated with my team.<br/></p>
                </div>
              </div>
              <ul>
                <li><a href="https://github.com/Safa-14" target="_blank"><i className="fab fa-github" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fab fa-google-plus" aria-hidden="true"></i></a></li>
                <li><a href="https://www.linkedin.com/in/safa-bouhlel/" target="_blank"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="https://www.xing.com/profile/Safa_Bouhlel/cv" target="_blank"><i className="fab fa-xing" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </div>

        {/* TEAMS MEMBERS END */}

        <a href="/" className="float-left">
                    <Button
                      type="button "
                      className="btn btn-primary"
                      data-toggle="tooltip"
                       data-placement="right"
                        title="go Back">
                        <i className="fas fa-arrow-circle-left"></i>
                    </Button>
                 </a>
      </div>


    )


}
export default AboutUsPage