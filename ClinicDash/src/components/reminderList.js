import React, {useEffect, useState} from "react";
import {Form, Input, Button, Checkbox, Select, Card,Table, Radio, Divider,} from 'antd';
import '../App.css';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";


export default function ReminderList(){
    const Demail=sessionStorage.getItem('email')

    const [isInitialRender, setIsInitialRender] = useState(true);
    const [count, setCount] = useState(null);
    useEffect(async ()=>{
        const data=await fetch(
            'http://127.0.0.1:8000/reminder_count/' + new URLSearchParams({email:Demail}),
            {
                method: 'GET',
            },
        )
            .then(res => {
                const resp=res.json()
                console.log("@@@@",resp);
                //console.log(res.data.login);
                //if (res.status==200){console.log("return");return res.data}
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
            setCount(patients=>data.data)
            console.log("data in ",count)
            //setCount(Object.keys(data).length)
        }
        console.log("count ",count)
        // Object.keys(count).map(key => console.log(count[key]))
        //setPatients(patients=>data)
        //console.log("patients",Object.keys(data).length)
    },[count])

    let navigate = useNavigate();
    function Onclick (pemail) {navigate('/patientUndone',{state:{email:pemail}})
    }

    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'name',
            //render: (text,record) => <a onClick={Onclick(record.email)}>{text}</a>,
            render: (text,record) => <Link to={'/patientUndone/'+record.email}>{text}</Link>
        },
        {
            title: 'Incompleted reminders (High)',
            dataIndex: 'Hcount',
            defaultSortOrder:'ascend',
            sorter: {
                compare: (a, b) => b.Hcount - a.Hcount,
                //multiple: 1,
            },
        },
        {
            title: 'Incompleted reminders (Middle)',
            dataIndex: 'Mcount',
            defaultSortOrder:'ascend',
            sorter: {
                compare: (a, b) => b.Mcount - a.Mcount,
                //multiple: 2,
            },
        },
        {
            title: 'Incompleted reminders (Low)',
            dataIndex: 'Lcount',
            defaultSortOrder:'ascend',
            sorter: {
                compare: (a, b) => b.Lcount - a.Lcount,
                //multiple: 3,
            },
        },
    ];

    return (
        <div>
            {/*<Radio.Group*/}
            {/*    onChange={({ target: { value } }) => {*/}
            {/*        setSelectionType(value);*/}
            {/*    }}*/}
            {/*    value={selectionType}*/}
            {/*>*/}
            {/*    <Radio value="checkbox">Checkbox</Radio>*/}
            {/*    <Radio value="radio">radio</Radio>*/}
            {/*</Radio.Group>*/}

            <Divider />

            <Table
                // rowSelection={{
                //     type: selectionType,
                //     ...rowSelection,
                // }}
                pagination={{ pageSize: 5}}
                columns={columns}
                dataSource={count}
            />
        </div>
    )
}
//export default ReminderList;
