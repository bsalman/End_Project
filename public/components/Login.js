import React, { useState } from 'react'

import CustomModal from './CustomModal'

const Login = () => {

  const initialState = {
    username: '',
    password: '',
    errorElement: null,
    entriesError: false,
    errorTitle: ''
  }
  const [myState,
    setMyState] = useState(initialState)


  const  onLoginBtnClick = (e) => {
    e.preventDefault()
    // console.log(myState);
    if (myState.username.trim() === '' || myState.password === '') {
        const errorElement = (
          <ul>
            {myState
              .username
              .trim() === ''
              ? <li className='secondary'>Username should not be empty</li>
              : null}
            {/* {!validator.isEmail(myState.email.trim())
                ? <li>You have to enter a valid Email</li>
                : null} */}
            {myState.password === ''
              ? <li>Password should not be empty</li>
              : null}
  
          </ul>
        )
  
        setMyState({
          ...myState,
          entriesError: true,
          errorElement,
          errorTitle: 'entries Error'
        })
      } else {
        console.log(myState);
      }
    
  }

  const closeModal = () => {
    console.log('I am called from the child');
    setMyState({
      ...myState,
      entriesError: false
    })
  }
  return (
    <React.Fragment>
        <CustomModal
        show={myState.entriesError}
        close={closeModal}
        className='bg-danger'
        title={myState.errorTitle}
        background='bg-warning'>
        {myState.errorElement}
      </CustomModal>
      <div className="d-flex align-items-center pb-4">
        <div className="row mx-auto" style={{width:'100%',maxWidth:'24rem'}}>
          {/* <div className="col-12 mb-2 text-center">
            <img
              src="/images/symbiot4.svg"
              width="140"
              height="20"
              alt="SYMBIOT 4"
              className="mx-auto"/>
          </div> */}
          <div className="col-12">
            {/* <!-- Login form START --> */}
            <div className="card px-4 pt-2">
              <form className="p-2">
                <div className="form-group row">
                  <label htmlFor="user-name" className="col-12 col-form-label">Username</label>
                  <div className="col-12">
                    <input
                    placeholder="Enter your username"
                    onChange={e=>{setMyState({...myState,username:e.target.value})}}
                      className="form-control custom-focus"
                      type="text"
                      value={myState.username}
                      id="user-name"
                      />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="user-password" className="col-12 col-form-label">Password</label>
                  <div className="col-12">
                    <input
                    placeholder="Password"
                    onChange={(e) => {
                    setMyState({
                      ...myState,
                      password: e.target.value
                    })
                  }}
                      className="form-control custom-focus"
                      type="password"
                      value="professor"
                      id="user-password"
                      value={myState.password}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12 mt-3 mb-2 text-center">
                    <button onClick={onLoginBtnClick} className="btn btn-primary btn-block">Login</button>
                  </div>
                </div>

              </form>
            </div>
            {/* <!-- Login form END --> */}
          </div>
        </div>
      </div>

    </React.Fragment>

  )

}

export default Login