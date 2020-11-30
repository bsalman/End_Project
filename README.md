# End_Project
Smart_home_device
<h2>Smart_home_device</h2>
<h3>Project Description</h3>
<p>this project is real smart home project.</p>
<p>Where you can control the lights and electronic devices and check the temperature ad humidity inside the rooms.</p>
<p>Rooms can be added easily and within each room,devices and sensors can be added as desired (for example motion sensors and light switchers.)
</p>
<p>In addition, the possibility of cancellation and modification exists</p> 
<p>Work Flow Documentation for the Final Project : SMART – HOUSE

All Dates are in the Year 2020
Due to the pandemic the entire project was done remotely 
In our Group  every body took turns on the tasks. Like this it was
possible for all of us to work on the front and back end as well as on the database structures. 

The Group-Members are : 
- Safa Bouhlel  email: 
- Bashar Salman email:bsalman395850@gmail.com
- Neda Dehghan email: neda.mail7@yahoo.com

Day 1.  Wednesday 30.9. 
We had a remote meeting and exchanged our ideas on what we think the project is actually about,  and how the Interface should look like. 
We started to do researches on the ‘Internet of Things’, the technical devices, and on UX and UI Designs. 

Then we started with the structuring of the main plan and its single Steps.

Day 2 Thursday 1.10.
We did researches on the technical devices and started ordering them 

Name of devices : 
rapberry pi, 
light sensors,
motion sensors,
temperature sensors,
buzzer sensors,
arduino (nano, suppor),
rely,
antenna, 

We set up the repository for our Git Hub accounts, created a main project folder and made local ones and set up the individual branches. 
After that we started with the settings and configurations for the SQL Database and divided
the task for the day.
We set up the usual steps: creating the main folder and downloading the dependencies that were needed. 
Installing the packages for node.js.

For the Back-End: 
Express, 
Express-fileuploads,
express-sessions,
mysql,
nodemailer,
nrf24,
password-hash,
socket.io,
socket.io-client 

For the Front-End:
react,
react-dom,
react-image-gallery,
react-redux,
react-router-dom,
reactstrap,
redux,
socket.io-client,
validator

We set up the webpack configurations, the gitignore for the node_modules and got started.
We designed the Login Page and the Settings page and transferred it into react. 
Which means we created individual components for those pages and made their modals in css.

Day 3. Friday 2.10.
This day was a group work day. 
We connected the login page to the database by writing the login app.post, the api loginPost as well as the sql modul function. But before that we connected the project with our sql database with the sql module and the created runQuery. 
We wrote a sql function to check the User and to be able to insert the data to the database. 
After that we wrote the code to be able to change the users default settings successfully with the change User function on the sql module. 
Then we merged our changed User api function, the app.js and the data module. 
We debugged the code and made it up to date for everybody. 

Day 4. Monday 5.10.
Group meeting at the beginning of the day. 
Discussing UI for coming up pages.
Rethinking of the design, as some things would not be possible as thought.
Searching for new solutions.
Agreeing on design and the functionality of the next pages.

Created and “ add room page”, api service and sql all together.
debugging problems that occurred over the weekend

Day 5. Tuesday 6.10.
Team meeting: discussing next design steps and functionality.
Connecting the “add Room” page to the database.
Researching on a collapse functionality for the Sidebar and trying possibilities. 
Created two new Components. One to be able to add new rooms, and one to see them when they are added to the page. 
Creating the middleware to be able to create a single room when it is added to the main “add room” page.
Creating the api function to fetch the single room.
Creating the sql function to store the created rooms into the database
searching for and implementing svg icons





Day 6. Wednesday 7.10.
Fixing bugs from the sql function and the functionality of react.
Continue working on the “all rooms” page to add the created single room page. 
Created an “all devices” page, to be able to add the single devices to the chosen room
created the apis and the sql for it.
Created a Dashboard page with static data.

Day 7. Thursday 8.10.
New bugs with implementations on dashboard and add rooms.
Fixings bugs.
Implementing the pages to react.
Continue the work on all device page.
Keep adjusting add room page.
Fixing the occurred bugs with router- component.

Day 8. Friday 9.10.
Rethinking and changing concept.
Made a new add device page and system/concept now working with modals and separate pages.
New add room page and system/concept now working with modals and separate pages.
adding all rooms page.
Rewriting the sql function as the functionality changed
New api and app for the changed concepts.

Day 9. Monday 12.10
After new talk, over thrown the all rooms page.
Working and remodeling the add rooms and device page.
Made api and sql functions for deleting and add rooms.
Creating a Route system for the pages

Day 10. Tuesday 13.10
Continue working on add rooms and add device,
Changing the user interface, and solving sql functional problems together for both pages
Searching for a solution for the svg icons.

Day 11. Wednesday 14.10
Fixing add device bugs.
Finding solution to make two components work inside each other.
Creating reducer for two components to be able to transfer and work with redux
to make the page loading instant.

Day 12. Thursday 15.10
Research on landing page.
Agreeing on landing page background and design.
Deciding on how the single room should look like.
Creating single room component with the devices that have been added by the user to the single room and show the devices.
Fixing and deleting components that were colliding with reactstrap
Fixing problems that occurred with the responsiveness. 




Day 13. Friday 16.10
Interruption by half day Lufthansa presentation

After 14. o clock. continue work from Thursday.
Continuing the single room component.
Working on deleting, editing and add devices component. 
Creating buttons and their functionality including the pi and sql functions
Creating the landing page

Day 14. Monday 19.10.
Making a single component overview
Created single components, bug fixes on add, delete and edit functionality.
Brainstorm about dashboard and single elements functionality and design. 
Creating a main and a subrouter.

Day 15. Tuesday 20.10.
Again restructuring the rooms single overview page.
Adding single device components.
Fixing bugs that occurred with redux.
Adding buttons and icons and deleting svg.
Restyling the overview page.

Day 16. Wednesday 21.10.
Trying to get data to the overview page.
Creating single device edit pages.
Creating delete and setting pages with the belonging  api and sql functions.

Day 17. Thursday 22.10
Created single components to be able to add motion, light and temperature to the devices
and to be able to connect them singly with real data and connect them to the dashboard as well to the other pages when needed. 
Added motion dev.
Added light dev.
Added temp dev.

Day 18. Friday 23.10
Created single components to be able to set the settings for  motion, light and temperature to the devices
and to be able to connect them singly with real data and connect them to the dashboard as well to the other pages when needed.
Added light settings
Added  motions settings
Added temp settings
Connected the edit button to the database and redux







Day 19. Monday 26.10
Merged all data.
Optimized the motions settings and light settings.
Connected delete button to the database and redux.
Changed the edit settings.
Cleaned up code
Bug fix with icons and redux

Day 20.Tuesday 27.10
Connecting and formatting the raspberry pi which took most of the day.
Optimizing the devices boxes on single room.
Adding single delete functionality to the motions sector in single device.
Fixing edit and delete bugs.
Continue working on dashboard.

Day 21. Wednesday 28.10
Fixing the appliance adding functionality to be able to get which appliance it is.
Working on the dashboard visualization of it /drop down of lights
Updating the database with three more categories: connected, data and img_url
Fixing the switch function of the of all devices and dashboards and connecting to the database.
Working on the sql and api for that
Resizing and changing icons.

Day 22. Thursday 29.10
Fixing icons as they are not responsive in the side bar.
Working on the sql and api for the motion and light devices.
Checking functions searching for UI bugs
Setting up the raspberry pi antenna.
Making the connection between arduino iot devices and raspberry pi. 
and connecting the project to it

Day 23. Friday 30.10.
Connecting the server and the project to sockets as raspberry can not talk to all devices at the same time.
Added new api and sql functions
creating "about us" page
fixing and getting more icons

Day 24. Monday 2.11.
Making the switches of light and motion settings connect to main page and server.
Fixing redux bugs.
Creating an "about us" page.
Merging code of all branches so they are all up to date again. 

Day 25. Tuesday 3.11.
Team talk and merging more code that we worked on in the night.
Connection of the hardware to the project.
Installing and using iot socket
Installing and connecting the arduino light and motion sensors


Day 26. Wednesday 4.11.
Continuing to set up the connection between adruino temperature, light and motion sensors with our the project and database.

Day 27. Thursday 5.11.
Continuing to set up the connection between adruino temperature, light and motion sensors with our the project and database.
Completing the merge between all steps and projects going through the steps and pages to see if bugs emerge and if the functionality is fine. 

Day 28. Friday 6.11.
Fixing last merge bugs and giving the project over to our Teacher for check ups and functionality check

Day 29. Friday 6.11. and Day 30 Monday 9.11.
Connecting the motion device to the light device on arduino.
Setting up the connections between the motion timer and real life light data.
Changing the input boxes and adding new buttons to the single device components.
Adding motion device setting to the motion settings.
Connecting the motion device setting data to the database : deleting the time settings,
Editing the time settings and saving it to redux and database.
Adding security button to the rooms and connecting them to the dashboard.
Connecting the security to the motion sensor.
Connecting the single rooms to the security motion and to the database.
Connecting the entire motion senors with the whole house and with the security motions, then to the database and redux. 

Day 31. Tuesday 10.11.
Connecting the timer settings to the lights components and to the appliances.
Connecting the real data to the database.
Getting real time data for the motion and connecting the motion setting to the light timer setting on light settings.
Forcing the motion device timer to be subordinate (untergeordnet) to the light timer settings
correcting spelling, comments and input fields.

Day 32. Wednesday 11.11.
Finishing the timer setting for appliances and light.
Trying to do the motion timer setting for appliances to show the same data.
Fixing responsiveness of landing page and the timer settings on motion and lights.
Fixing the unmount leak in the appliance setting.
Correcting and cleaning the documentation.
Cleaning code and Comments.

Day 33. Thursday 12.11.
Created edit button for the serial number.
And added arrow buttons to be able to go back from the pages.
Fixed language and
Made a Footer for the landing page.




Day 33. Friday 13.11.
Made the Logout and the sessions.
Secured the Path of the routes.
Created a Contact us page. 

Day 34. Monday 16.11.
Preparing the presentation, agreeing and separating tasks. 
Going through the Project and checking for mistakes or uncertainties. 
Securing the Login , contact us and other inputs where you can insert data without being logged in. 

Day 35. Tuesday 17.11.



</p>