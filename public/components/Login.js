//------------------------------------------------------------//
///////////////       IMPORT DEPENDENCIES     //////////////////
//------------------------------------------------------------//
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Form,
  Label,
  Input,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import {connect} from 'react-redux'

import CustomModal from './CustomModal'
import {loginPost} from '../services/api'
import {setUserAction,setLoggedInAction} from '../actions'

//------------------------------------------------------------//
///////////////         FUNCTIONAL COMPONENT       //////////////
//------------------------------------------------------------//
const Login = (props) => {

  useEffect(() => {
    
    props.setUserAction(null)
    props.setLoggedInAction('false')
    
  },[])

  const history = useHistory()

  // ====== setting an initial state ===== /// 

  const initialState = {
    username: '',
    password: '',
    errorElement: null,
    entriesError: false,
    errorTitle: ''
  }
  const [myState, setMyState] = useState(initialState)


  const onLoginBtnClick = (e) => {
    e.preventDefault()
    // console.log(myState);
    if (myState.username.trim() === '' || myState.password === '') {
        const errorElement = (
          <ListGroup>
            {myState
              .username
              .trim() === ''
              ? <ListGroupItem className='secondary'>The Username should not be empty</ListGroupItem>
              : null}
            
            {myState.password === ''
              ? <ListGroupItem>The Password should not be empty</ListGroupItem>
              : null}
  
          </ListGroup>
        )
  
        setMyState({
          ...myState,
          entriesError: true,
          errorElement,
          errorTitle: 'Error with the Entries'
        })
      } else {
        //console.log(myState);
        loginPost(myState.username,myState.password).then(data => {
        //  console.log(data);
          //here i need to write the switch on the backend
        
          switch (data) {
            case 2:
              setMyState({...myState,entriesError: true,errorElement:<p>There was a server error</p>,errorTitle: 'Server error'})
              break;

            case 3:
              setMyState({...myState, entriesError:true, errorElement:<p>The Password is wrong</p>,errorTitle: 'Wrong password'})
              break;

            case 4:
              setMyState({...myState, entriesError:true, errorElement:<p>The Username that you entered does not exist</p>,errorTitle: 'Username not exist'})
              break;
            case 5:
              setMyState({...myState, entriesError:true, errorElement:<p>Server error, please contact the service provider</p>,errorTitle: 'Server Error'})
              break;
            case 'false':
               //show admin panel
               props.setUserAction(myState.username)
               props.setLoggedInAction(data)
               history.push('/')
               //console.log('should be login');
               break;
            case 'true':
              //show admin panel
              props.setUserAction(myState.username)
              props.setLoggedInAction(data)
              history.push('/settings')
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
       >
        {myState.errorElement}
      </CustomModal>
      <div className="d-flex align-items-center pb-4">
        <div className="row mx-auto" style={{width:'100%',maxWidth:'24rem'}}>
      
          <div className="col-12">
            {/* <!-- Login Form START --> */}
            <div className="card px-4 pt-2">
              <Form className="p-2">
                <div className="form-group row">
                  <Label htmlFor="user-name" className="col-12 col-form-label">Username</Label>
                  <div className="col-12">
                    <Input
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
                  <Label htmlFor="user-password" className="col-12 col-form-label">Password</Label>
                  <div className="col-12">
                    <Input
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
                    <Button onClick={onLoginBtnClick} className="btn btn-primary btn-block">Login</Button>
                  </div>
                </div>

              </Form>
            </div>
            {/* <!-- Login Form END --> */}
          </div>
        </div>
      </div>

    </React.Fragment>

  )

}

export default connect(null,{setUserAction,setLoggedInAction})(Login)