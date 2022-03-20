import React, {useEffect, useState} from "react";
import {Form, Input, Button, Checkbox, Select, Card,Table, Radio, Divider,} from 'antd';
//import { Bar } from '@ant-design/charts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../App.css';
import {useLocation, useParams} from "react-router-dom";

export default function PatientUndone(){
    const demail=sessionStorage.getItem('email')
    // const location=useLocation()
    // const pemail=location.state.email
    let pemail= useParams().email

    const [isInitialRender, setIsInitialRender] = useState(true);
    const [count, setCount] = useState(null);

    useEffect(async ()=>{
        console.log(demail,pemail)
        const data=await fetch(
            'http://127.0.0.1:8000/patient_count/' + new URLSearchParams({Demail:demail,Pemail:pemail}),
            {
                method: 'GET',
            },
        )
            .then(res => {
                const resp=res.json()
                console.log("@@@@",resp);
                return resp
            }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            });
        console.log("data",data)
        if (isInitialRender) {
            console.log(isInitialRender)
            setIsInitialRender(false);
            setCount(patients=>data.content)
            console.log("data in ",count)
        }
        console.log("count ",count)
    },[count])


    return (
        <div>
        {/*//     <ResponsiveContainer width="50%" height="50%">*/}

        <div style={{textAlign:'center',marginTop:20}}><h1 >Numbers of Uncompleted Reminders</h1></div>

        <div style={{textAlign:'center'}}>
                <BarChart
                    width={1200}
                    height={500}
                    data={count}
                    margin={{
                        top: 30,
                        right: 20,
                        left: 150,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="number" fill="#8884d8" />
                    {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
                </BarChart>

        </div>
            </div>
)








}
