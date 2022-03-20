import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from '../App';
import Login from './login';
import AddReminder from './addReminder';
import ReminderList from "./reminderList";
import PatientUndone from "./patientUndone";

import {BrowserRouter,Routes, Route,} from "react-router-dom"

const BaseRouter=()=>(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/addReminder/' element={<AddReminder/>}/>
                <Route path='/reminderList/' element={<ReminderList/>}/>
                <Route path='/patientUndone/:email' element={<PatientUndone/>}/>
            </Route>

            <Route path='/login' element={<Login/>}></Route>
            {/*<Route path='' element={<App/>}></Route>*/}
        </Routes>
    </BrowserRouter>
)

export default BaseRouter
