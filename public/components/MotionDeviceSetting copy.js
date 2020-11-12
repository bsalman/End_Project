import React, { useState, useEffect, useRef } from 'react'
import {
  Label,
  Input,
  FormGroup,
} from 'reactstrap';


import { changeMotionDeviceStatus, addTimeMotionPost, updateTimeMotionPost, deleteTimeMotionPost } from '../services/api'
const MotionDeviceSetting = ({ motiondevice, appliancDevices, motionId }) => {
  useEffect(() => {
    //console.log(appliancDevices);
    setState({
      ...motiondevice, deleted: false
    })
  }, [motiondevice])
  const initialState = {
    startTime: '',
    stopTime: '',
    selectedDevice: '',
    id: null,
    active: 1,
    deleted: false
  }

  const saveRef = useRef()
  const [state, setState] = useState(initialState)
  const setMotionDeviceStatus = (relationId) => {
    changeMotionDeviceStatus(relationId).then(data => {
      setState({ ...state, active: (state.active ? 0 : 1) })

    })
  }
  const onClickSaveBtn = () => {
    console.log(state.id);
    if (state.id === null) {
      addTimeMotionPost(state.startTime, state.stopTime, motionId, state.selectedDevice, state.active).then(data => {
        saveRef.current.classList.add('d-none')
        setState({ ...state, id: data.insertId })
      }).catch(error => {
        console.log('error', error);
      })
    } else {
      updateTimeMotionPost(state.id, state.startTime, state.stopTime, motionId, state.selectedDevice, state.active).then(data => {
        saveRef.current.classList.add('d-none')
      }).catch(error => {
        console.log('error', error);
      })
    }

  }
  const onClickDeleteBtn = () => {
    deleteTimeMotionPost(state.id).then(data => {
      setState({ ...state, deleted: true })
    }).catch(error => {
      console.log('error', error);
    })
  }
  if (!state.deleted) {
    return (
      <FormGroup className="row" >
        {/* //from to with + button */}
        <div className="row col-xl-12 col-sm-12">
          {/* //from */}
          <div className="col-xl-3 col-sm-12  mt-2" modal-content="true">
            <Label
              for="device_seralNum"
              className="col-12 col-form-label modal-font text-center">From</Label >
            <Input
              className="form-control custom-focus ml-4 mb-2 text-primary text-center"
              type="time"
              id="device_seralNum"
              onChange={e => {
                saveRef.current.classList.remove('d-none')
                setState({ ...state, startTime: e.target.value })
              }}
              value={state.startTime} />
          </div>

          {/* //to */}
          <div className="col-xl-3 col-sm-12  mt-2" modal-content="true">
            <Label
              for="device_seralNum"
              className="col-12 col-form-label modal-font  text-center">To</Label >
            <Input
              className="form-control custom-focus  ml-4 mb-2 text-primary text-center"
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
          <div className=" col-xl-3 col-sm-12  ">
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
          </div>
          <div className="row col-xl-3 col-sm-12">
            <div className="mt-5 col-xl-4 col-sm-4">
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
            <div className="mt-5 col-xl-4 col-sm-4">
              <button
                className="btn btn-sm btn-danger"
                data-toggle="tooltip"
                data-placement="right"
                onClick={onClickDeleteBtn}
                title="Delete">
                Delete
              </button>

            </div>
            <div className="mt-5 col-xl-4 col-sm-4">
              <Label className={`switch ml-auto ${state.active ? 'checked' : ''}`} >
                <Input type="checkbox" onChange={() => { setMotionDeviceStatus(state.id) }} />
              </Label>
            </div>
          </div>

        </div>

        {/* //turn on device */}

      </FormGroup>
    )
  } else {
    return (null)
  }

}

export default MotionDeviceSetting