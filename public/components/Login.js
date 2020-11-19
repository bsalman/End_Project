import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {connect} from 'react-redux'

import CustomModal from './CustomModal'
import {loginPost} from '../services/api'
import {setUserAction,setLoggedInAction} from '../actions'


const Login = (props) => {

  useEffect(() => {
    
    props.setUserAction(null)
    props.setLoggedInAction('false')
    
  },[])

  const history = useHistory()

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
        //console.log(myState);
        loginPost(myState.username,myState.password).then(data => {
        //  console.log(data);
          //here i need to write the switch depending on the backend
        
          switch (data) {
            case 2:
              setMyState({...myState,entriesError: true,errorElement:<p>There was a server error</p>,errorTitle: 'Server error'})
              break;

            case 3:
              setMyState({...myState, entriesError:true, errorElement:<p>Password is wrong</p>,errorTitle: 'Wrong password'})
              break;

            case 4:
              setMyState({...myState, entriesError:true, errorElement:<p>The username that you enter is not exist</p>,errorTitle: 'Username not exist'})
              break;
            case 5:
              setMyState({...myState, entriesError:true, errorElement:<p>Server error, please contact the service provider</p>,errorTitle: 'Server Error'})
              break;
            case 'false':
               //show admin panel
               props.setUserAction(myState.username)
               props.setLoggedInAction(data)
               history.push('/accountSettings')
               //console.log('should be login');
               break;
            case 'true':
              //show admin panel
              props.setUserAction(myState.username)
              props.setLoggedInAction(data)
              history.push('/dashboard')
              //console.log('should be login');
              break;
          
            default:
              break;
          }
        }).catch(error => {
          console.log(error);
          setMyState({...myState, entriesError:true, errorElement:<p>can not send the data</p>,errorTitle: 'unknown error'})
        })

      }
    
  }

  const closeModal = () => {
    // console.log('I am called from the child');
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
                    placeholder="Enter your password"
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

export default connect(null,{setUserAction,setLoggedInAction})(Login)