import React, { useState, useEffect, useRef } from 'react'
import {
  Label,
  Input,
  FormGroup,
} from 'reactstrap';


import { addTimeDevicePost, updateTimeDevicePost, deleteTimeDevicePost, changeTimeDeviceStatus } from '../services/api'

const TimeDeviceSetting = ({deviceId,device}) => {
  useEffect(() => {
    //console.log(appliancDevices);
    setState({
      ...device,deleted: false
    })
  }, [device])


  const initialState = {
    startTime: '',
    stopTime: '',
    id: null,
    deleted: false,
    active: false
  }


  const saveRef = useRef()
  const [state, setState] = useState(initialState)
  const setTimeDeviceStatus = () => {
    changeTimeDeviceStatus(state.id).then(data => {
      setState({ ...state, active: (state.active ? 0 : 1) })

    })
  }
  const onClickSaveBtn = () => {
    //console.log(state.id);
    if (state.id === null) {
        addTimeDevicePost(state.startTime, state.stopTime, deviceId, 1).then(data => {
          //console.log(data);
        saveRef.current.classList.add('d-none')
        setState({ ...state, id: data.insertId })
      }).catch(error => {
        console.log('error', error);
      })
    } else {
        updateTimeDevicePost(state.id, state.startTime, state.stopTime, deviceId, 1).then(data => {
          //console.log(data);
        saveRef.current.classList.add('d-none')
      }).catch(error => {
        console.log('error', error);
      })
    }

  }


  const onClickDeleteBtn = () => {
    deleteTimeDevicePost(state.id).then(data => {
      setState({ ...state, deleted: true })
    }).catch(error => {
      console.log('error', error);
    })
  }





  if (!state.deleted) {
    return (
      <FormGroup className=" card row m-2" >
        {/* //from to with + button */}
        <div className="row col-xl-12 col-md-12 col-sm-12 mb-3">

          {/* //from  */}
            <div className="col-xl-2 col-md-2 col-sm-6 mt-4">
              <h5 className="specs text-center">From</h5>
            </div>
            <div className="col-xl-3 col-md-3 col-sm-6 mt-4">
            <Input
              className="text-primary text-center"
              type="time"
              id="device_seralNum"
              onChange={e => {
                saveRef.current.classList.remove('d-none')
                setState({ ...state, startTime: e.target.value })
              }}
              value={state.startTime} />
          </div>

          {/* //to */}
            <div className="col-xl-1 col-md-1 col-sm-6 mt-4">
              <h5 className="specs text-center">To</h5>
            </div>
            <div className="col-xl-3 col-md-3 col-sm-6 mt-4">
            <Input
              className="ml-auto mb-0 text-primary text-center"
              type="time"
              id="device_seralNum"
              onChange={e => {
                saveRef.current.classList.remove('d-none')
                setState({
                  ...state,
                  stopTime: e.target.value
                })
              }}
              value={state.stopTime} />
          </div>
          
          
          {/* <div className=" col-xl-3 col-sm-12  ">
            <div className="col-12 mt-2">
              <Label for="room_type" className="col-12 col-form-label modal-font text-center">Turn On Device</Label>
              <select
                className="form-control custom-focus"
                value={state.selectedDevice ? state.selectedDevice : ''}
                onChange={(e) => {
                  saveRef.current.classList.remove('d-none')
                  setState({
                    ...state,
                    selectedDevice: e.target.value
                  })
                }}>
                <option value=''></option>
                {appliancDevices}
              </select>
            </div>
          </div> */}



          {/* button part */}
          <div className="row col-xl-3 col-md-3 col-sm-9 mt-4 col-9 mx-auto">

              {/* button for save */}
            <div className="col-xl-4 col-md-4 col-sm-4 col-4">
              <button
                ref={saveRef}
                className="btn btn-sm btn-primary d-none"
                data-toggle="tooltip"
                data-placement="right"
                onClick={onClickSaveBtn}
                title="Save changes">
                <img src="/images/checkC.png" style={{width:"20px",height:"20px"}} />
              </button>
            </div>
            
            {/* button for delete */}
            <div className="col-xl-4 col-md-4 col-sm-4 col-4 pl-2">
              <button
                className="btn btn-sm btn-danger"
                data-toggle="tooltip"
                data-placement="right"
                onClick={onClickDeleteBtn}
                title="Delete">
                Delete
              </button>

            </div>
            
            {/* button for activate the light device */}
            <div className="col-xl-4 col-md-4 col-sm-4 col-4">
              <Label className={`switch ml-auto ${state.active ? 'checked' : ''}`} >
                <Input type="checkbox"  onChange={setTimeDeviceStatus}/>
              </Label>
            </div>
          
          </div>
          <br/>

        </div>

        {/* //turn on device */}

      </FormGroup>
    )
  } else {
    return (null)
  }

}

export default TimeDeviceSetting