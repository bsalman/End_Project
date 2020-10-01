import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

// import the components 
import CustomModal from './CustomModal'



const Login = (props) =>{
    //current state
const initialState = {
    name: '',
    password: '',
    entriesError: false,
    errorElement: null,
    errorTitle: ''  
}

//using the state
const [state, setState] = useState(initialState)

// login button function
const onLoginBtnClick = (e) =>{
    e.preventDefault()
   console.log(state);
   if (state.name.trim() === '' || setState.password === '') {
    const errorElement = (
      <div>
        {state
          .name
          .trim() === ''
          ? <div>Please Enter Your Name</div>
          : null}
        {state.password === ''
          ? <div>A Password is required</div>
          : null}
     </div>
    )
    setState({
      ...state,
      entriesError: true,
      errorElement,
      errorTitle: 'Entries Error'
    })
  } else {
      console.log(state);
  }
}

const closeModal = () => {
    setState({
      ...state,
      entriesError: false
    })
  }

    return(
        <React.Fragment>
   <CustomModal
        show={state.entriesError}
        close={closeModal}
        className="bg-danger"
        title={state.errorTitle}>
          {state.errorElement}
        </CustomModal>
        <div className="d-flex align-items-center pb-4">
    <div className="row mx-auto" style={{width:"100%",maxWidth:"24rem"}}>
      <div className="col-12 mb-2 text-center">
        <img src="/images/symbiot4.svg" width="140" height="20" alt="SYMBIOT 4" className="mx-auto" />
      </div>
      <div className="col-12">
        {/* <!-- Login form START --> */}
        <div className="card px-4 pt-2">
          <form className="p-2">
            <div className="form-group row">
              <label htmlFor="user-name" className="col-12 col-form-label">Username</label>
              <div className="col-12">
                <input className="form-control custom-focus" type="text" placeholder="Name" id="user-name" value={state.name} onChange={(e) => {
                    setState({
                      ...state,
                      name: e.target.value
                    })
                  }} required/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="user-password" className="col-12 col-form-label">Password</label>
              <div className="col-12">
                <input className="form-control custom-focus" type="password" placeholder="Password" id="user-password" value={state.password} onChange={(e) => {
                    setState({
                      ...state,
                      password: e.target.value
                    })
                  }} required/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-12 mt-3 mb-2 text-center">
                <button type="submit" onClick={onLoginBtnClick} className="btn btn-primary btn-block" >Login</button>
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



