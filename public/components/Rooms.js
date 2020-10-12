// import dependencies
import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Form, FormGroup, Label, Input,Modal,ModalHeader,ModalBody,ModalFooter  } from 'reactstrap';


import CustomModal from './CustomModal'
import {addRoomPost} from '../services/api'
import {setRoomsAction} from '../actions'
// import SideNav from './SideNav'

// create a setting classNameName
const Rooms = (props) => {

    let intialState = {
        errorModal:{
            show: false,
            title: '',
            content: null
        },
        roomModalShow: false,
        newRoomName: '',
        newRoomType: ''
    }
    const [state, setState] = useState(intialState)
    const roomElement = props.rooms.map(room => {
        return (
            <div key={room.id} className="col-sm-12 col-md-6 col-xl-4">
                <div className="card active">
                    {/* <svg className="icon-sprite">
                            <use className="glow" fill="url(#radial-glow)" xlinkHref="assets/images/icons-sprite.svg#glow"/>
                            <use xlinkHref="assets/images/icons-sprite.svg#bulb-eco"/>
                        </svg> */}
                    <div className="card-body d-flex flex-row justify-content-center">
                        <Link to={"/adddevices/" + room.type.replace(/ /g, '_') + "/" + room.id}>  <h4 className="card-title">{room.type}: {room.name}</h4>
                        </Link>
                    </div>

                    {/* style={{color: "red"}} */}


                    <hr className="my-0" />
                    <ul className="list-group borderless px-1">
                        <li className="list-group-item">
                            <p className="specs">Device1</p>
                            <p className="ml-auto mb-0 text-success">connected</p>
                        </li>
                        <li className="list-group-item pt-0">
                            <p className="specs">Device1</p>
                            <p className="ml-auto mb-0">connected</p>
                        </li>
                        <li className="list-group-item pt-0 pb-4">
                            <p className="specs">Device2</p>
                            <p className="ml-auto mb-0">connected</p>
                        </li>
                    </ul>
                    <hr className="my-0" />

                    <Button type="button" className="btn btn-primary" >Delete</Button>
                    {/* device element */}

                </div>
            </div>

        )
    })
const errorModalClose = () => {
    const newState = {...state }
    newState.errorModal.show = false
    setState(newState)
}
const roomModaltoggle = () => {
    setState({...state, roomModalShow: !state.roomModalShow})
}
const onAddRoomClick = e => {
    e.preventDefault();
    if(state.newRoomName.trim()===''||state.newRoomType ===''){
        const errorsElement=(
            <ul>
                  {state.newRoomName.trim() === ''? <div>Room Name should not be empty</div>: null}
                  {state.newRoomType ===''? <div>select one of the Options</div>: null}
              </ul>
        )
        const newState = {...state}
        newState.errorModal.show = true
        newState.errorModal.title = "Entries Error"
        newState.errorModal.content = errorsElement
        // hide addroom modal because we need to show error modal and we can not show two modals on the same time
        newState.roomModalShow = false
        setState(newState)
    }else{
        addRoomPost(state.newRoomName, state.newRoomType).then(data => {
    
            let badgeClass = ''
            let badgeMessage =''
            let badgeTitle =''
            switch (data) {
            
          case 2:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'You had an empty data, please fill your data '
            badgeTitle = 'Empty Entries'
            break;
            case 3:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'this name is all ready exist, please change the name of the room '
            badgeTitle = 'Room Name is exist'
            break;
          case 4:
            badgeClass = 'alert alert-danger'
            badgeMessage = 'There was a server side error, please contact the adminstrator'
            badgeTitle = 'Server side error'
            break;
          default:
            const newState = {...state}
            newState.newRoomName = ''
            newState.newRoomType = ''
            setState(newState)
            props.setRoomsAction(data)
            break;
        }
        if(!isNaN(data)){
            const badge = (
            <div className={badgeClass} role="alert">
                        {badgeMessage}
            </div>
          )
          const newState = {...state}
        newState.errorModal.show = true
        newState.errorModal.title = badgeTitle
        newState.errorModal.content = <p>{badgeMessage}</p>
        // hide addroom modal because we need to show error modal and we can not show two modals on the same time
        newState.roomModalShow = false
        setState(newState)

        }
    }).catch((error)=>{
        console.log(error);
        const badge = (
            <div className="alert alert-danger" role="alert">
                        can not send the registration data to server
            </div>
          )
          this.setState({
            errorComponent: badge
          })
    })

}
}
    return (
        <React.Fragment>
            <div>
                <div className="row" >
                    {/* add rooms card start  */}
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div className="card">
                            <div className="card-body d-flex flex-row justify-content-center">
                                <h2 className="card-title">Rooms</h2>
                            </div>
                            <hr className="my-0" />
                            <div className="card-body d-flex flex-row justify-content-center">
                                <Button data-action=""

                                    className="btn btn-primary btn-lg  "
                                    onClick={roomModaltoggle}
                                >
                                    <strong>Add New Room</strong></Button>
                            </div>
                        </div>
                    </div>
                    {roomElement}
                    {/* add rooms card end  */}
                    {/* ===========================rooms element====================================== */}
                </div>
            </div>

            <CustomModal
                show={state.errorModal.show}
                close={errorModalClose}
                className="bg-danger"
                title={state.errorModal.title}>
                {state.errorModal.content}
            </CustomModal>
            <Modal isOpen={state.roomModalShow} toggle={roomModaltoggle} >
                {/* <ModalHeader toggle={this.toggle}><h3 className="card-title">Add Room</h3></ModalHeader> */}
                <ModalBody  >

                    <h3 className="card-title modal-font">Add Room</h3>
                    <Form className="p-2">
                        <FormGroup className="row">
                            <div className="col-12" modal-content>
                                <Label for="room_name" className="col-12 col-form-label modal-font">Room Name</Label>
                                <Input className="form-control custom-focus" type="text" id="room_name"
                                    onChange={e => {
                                        setState({ ...state, newRoomName: e.target.value })
                                    }}
                                    value={state.newRoomName} />
                            </div>
                        </FormGroup>
                        <FormGroup className="form-group row">
                            <div className="col-12">
                                <Label for="room_type" className="col-12 col-form-label modal-font">Room Type</Label>
                                <Input className="form-control custom-focus" type="select" name="select" id="room_type"
                                    onChange={(e) => {
                                        setState({...state, newRoomType: e.target.value })
                                    }}
                                    value={state.newRoomType}>
                                    <option></option>
                                    <option>Kitchen</option>
                                    <option>Dining room</option>
                                    <option>Living room</option>
                                    <option>Bath room</option>
                                    <option>Garage</option>
                                </Input>
                            </div>
                        </FormGroup>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onAddRoomClick} >save</Button>
                    <Button color="secondary" onClick={roomModaltoggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )

}
const setStateToProps = (state) => {
    return ({
        rooms: state.rooms
    })
}

export default connect(setStateToProps, {setRoomsAction})(Rooms)