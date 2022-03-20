import React, {useEffect, useState} from "react";
import {Form, Input, Button, Checkbox, Select, InputNumber, message} from 'antd';
import {useLocation} from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const { Option } = Select;


export default function AddReminder (props)  {
    // const location=useLocation()
    // const Demail=location.state.email
    const Demail=sessionStorage.getItem('email')
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 8,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 8,
        },
    };
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [patients, setPatients] = useState(null);
    const [count, setCount] = useState(null);
    useEffect(async ()=>{
        const data=await axios.get(`http://127.0.0.1:8000/get_patient`)
            .then(res => {
                console.log("@@@@",res.data);
                //console.log(res.data.login);
                if (res.status==200){console.log("retuer");return res.data.content}
                //return res.data.content


            }).catch(error => {
            if (error.response) {
                console.log(error.response);
            }
        });
        console.log("data",data)
        if (isInitialRender) {
            console.log(isInitialRender)
            setIsInitialRender(false);
            setPatients(patients=>data)
            setCount(Object.keys(data).length)
        }
        //setPatients(patients=>data)
        console.log("patients",Object.keys(data).length)
    },[patients,count])


        const [form] = Form.useForm();

    const generator = () => {
        const patientsset = [];
        for (let i = 0; i < count; i++) {
            patientsset.push(<Option key={patients[i].value.toString()}>{patients[i].label.toString()}</Option>);
        }
        return patientsset
    }

    const priorityToInt = (value) => {
        switch (value)
        {case 'High':
            return  1;
        case 'Middle':
            return 2;
        case 'Low':
            return 3;}
    }
        const onFinish = (values) => {
            console.log(values);
            console.log("pemail",Demail)
            let reminder={"Demail":Demail,
                "Pemail":values.patient,
                'text':values.text,
                'priority':priorityToInt(values.priority),
                'duration':values.duration
            }
            console.log("pair:  ",reminder)
            axios.post(`http://127.0.0.1:8000/add_reminder`, reminder)
                .then(res => {
                    console.log("@@@@",res);
                    //console.log(res.data);
                    if(res.data==true){message.success('reminder adding success!')}
                    //return res.data.login;
                    // if(res.data==true){navigate('/addReminder',{state:{email:values.email}})}
                }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            });
        };

        const onReset = () => {
            form.resetFields();
        };


    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

        return (
            <Form {...layout} form={form} style={{marginTop:60}} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="patient"
                    label="Patient"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {generator()}
                        {/*<Option value="jack">Jack</Option>*/}
                        {/*<Option value="lucy">Lucy</Option>*/}
                        {/*<Option value="tom">Tom</Option>*/}
                    </Select>

                </Form.Item>
                <Form.Item
                    name="text"
                    label="Text"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="Duration"
                    rules={[
                        {
                            required: true,
                            message:'can only be integer between 0 - 48 ',
                            max:2,
                            //type:"integer",
                            pattern: new RegExp(/[0-9]|[0-3][0-9]|[4][0-8]/)
                        },
                    ]}
                >
                    <InputNumber min={1} max={48}/>
                </Form.Item>
                <Form.Item
                    name="priority"
                    label="Priority"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select priority of the reminder"
                        //onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="High">High</Option>
                        <Option value="Middle">Middle</Option>
                        <Option value="Low">Low</Option>
                    </Select>
                </Form.Item>
                {/*<Form.Item*/}
                {/*    noStyle*/}
                {/*    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}*/}
                {/*>*/}
                {/*    {({ getFieldValue }) =>*/}
                {/*        getFieldValue('gender') === 'other' ? (*/}
                {/*            <Form.Item*/}
                {/*                name="customizeGender"*/}
                {/*                label="Customize Gender"*/}
                {/*                rules={[*/}
                {/*                    {*/}
                {/*                        required: true,*/}
                {/*                    },*/}
                {/*                ]}*/}
                {/*            >*/}
                {/*                <Input />*/}
                {/*            </Form.Item>*/}
                {/*        ) : null*/}
                {/*    }*/}
                {/*</Form.Item>*/}
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    {/*<Button type="link" htmlType="button" onClick={onFill}>*/}
                    {/*    Fill form*/}
                    {/*</Button>*/}
                </Form.Item>
            </Form>
        );
    // };


}

