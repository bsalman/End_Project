import React,{useState} from 'react'
import {Button,Progress} from 'reactstrap'
const GarageDoor=(props)=>{
    let initialState={
        OpenGarage:"Open",
        statusGarage:'Closed',
        ariaValue:12,
        isPause:false,
        width:100
    }
    const [state,setState] = useState(initialState)
    const openDoor= (e)=>{
        if(state.ariaValue===0){
            let i=0;
            let w=0;
            let  closeProgress= setInterval(function(){
                if (i==12) {
                    clearInterval(closeProgress); 
                    setState({...state,ariaValue:i,OpenGarage:"Open", statusGarage: 'Closed',width:w}); 
                 }else{

                    setState(state => {
                    if(state.isPause==false){
                        i++;
                        w = w + 100/12
                    }
                        return {...state,ariaValue:i,OpenGarage:"pause", statusGarage: 'Closing',width:w}
                    })
                     
                 }
            },1000)
          } 
         if (state.ariaValue===12){
            let i=12
            let w=100
            let  openProgress= setInterval(function(){
                if (i==0) {
                    clearInterval(openProgress); 
                    setState({...state,ariaValue:i,OpenGarage:"Close", statusGarage: 'Open',width:w}) 
                 }else{
                    setState(state => {
                        if(state.isPause==false){
                            i--;
                            w = w - 100/12
                        }
                        return {...state,ariaValue:i,OpenGarage:"pause", statusGarage: 'Opening',width:w}
                    })
                 }
            },1000)
        } 
        if (state.ariaValue>0 && state.ariaValue<12) {
            setState({...state, isPause:!state.isPause})
        };
    }
    // console.log("ariavlue",state.ariaValue);
    // console.log(state.isPause);
    // console.log(state.OpenGarage)
    // console.log('width',state.width)
    return(
        <React.Fragment>
            <div className="col-sm-12 col-md-6">
                                    {/* <!-- Garage-doors START --> */}
                            <div className="card" data-unit="garage-doors-1">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap mb-2">
                                        <img src="../images/garage.png" style={{width:"32px",height:"32px"}}></img>
                                        <div className="title-status">
                                            <h5>Garage doors</h5>
                                         <p className={`status ${state.OpenGarage=='Open'?'text-success':'text-danger'}`}>{state.statusGarage}</p>
                                        </div>
                                        <div className="ml-auto" >
                                        <Button   type="button" className="btn btn-secondary doors-control" onClick={
                                                    openDoor
                                                } >{state.OpenGarage}</Button>
                                                {/* <Button data-action="pause" type="button" className="btn btn-secondary doors-control">Pause</Button>
                                                <Button data-action="resume" type="button" className="btn btn-secondary doors-control">Resume</Button>
                                                <Button data-action="close" type="button" className="btn btn-secondary doors-control">Close</Button> */}
                                        </div>
                                    </div>
                                    <div className="ProgressCon">
                                        <div className="progressBar" style={{width:`${state.width}%`}}></div>
                                    </div>
                                        {/* <Progress className="progressBar"  value={state.ariaValue} min="0" max="12" style={{width:`${state.width}'%'`}}  style={{display:"block"}}/> */}
                                     <div className="info-holder info-cb">
                                        <div data-toggle="popover-all" data-content="Element driven by javascript (countdown timer)." data-original-title="Progress indicator" data-placement="top" data-offset="0,-12"></div>
                                    </div> 
                                </div>
                            </div>
                        </div>
        </React.Fragment>
    )
}
 export default (GarageDoor)