// import dependencies
import React from 'react'
// import SideNav from './SideNav'
import AddRooms from './AddRooms'

// create a setting classNameName
class Dashboard extends React.Component {
    render(){
        return(
            <div>
               <AddRooms/>
            </div>
        )
    }
}

export default Dashboard