import React, {useEffect, useState} from "react";
import { Form, Input, Button, Checkbox ,Alert} from 'antd';
import '../App.css';
import axios from 'axios';
import {Link, NavLink} from "react-router-dom";
 import { useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useAsync } from 'react-async-hook';



export default function Login(){
    // constructor(props) {
    //     super(props);
    //     this.state={
    //     valid:null,
    //     //     valid:false,
    //     email:'',
    //     password:'',
    //     }
    // }
    // let data=null
    // console.log("start!!!!!!")
    let navigate = useNavigate();
    const [valid, setValid] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onFinish =(values)=>{
        console.log('#####Success:',values.password,values.email);
        setEmail(values.email)
        setPassword(values.password)
        console.log('#####Success:',values,values.email);
        validate(values)
        let data=values
        //setTimeout(()=>{navigate('/')},1500)
        // console.log("response:",response)
        // if (response==true){console.log("valid email or password!");this.navigate(`/addReminder`);}
        // else{console.log("invalid email or password!");return <Alert message="Error Text" type="error" />}
        // //console.log({email});
        // console.log('Success:',values,values.email);
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validate=(values)=> {
        //console.log("pair:  ",email,password)
        let pair={"email":values.email,"password":values.password}
        console.log("pair:  ",pair)
        axios.post(`http://127.0.0.1:8000/Dlogin`, pair)
            .then(res => {
                console.log("@@@@",res);
                //console.log(res.data.login);
                setValid(res.data.login);
                //return res.data.login;
                if(res.data.login==true)
                    {sessionStorage.setItem('email',values.email) ;navigate('/addReminder',{state:{email:values.email}})}
            }).catch(error => {
            if (error.response) {
                console.log(error.response);
            }
        });


    }

    const Invalid=()=>{
         console.log("entry Invalid",this.state.valid);
        if (this.state.valid==true){navigate(`/addReminder`)
            //return <Alert text='Invalid email or password'/>
        }
        // else{console.log("valid email or password");this.navigate(`/addReminder`)}
    }


    return(
    <div style={{marginTop: 135,height:1000}}>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 8,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            //onFinish={(values) => console.log(values)}
            onFinishFailed={onFinishFailed}
            //onFinishFailed={(values) => console.log(values)}
            autoComplete="off"
        >
            {valid==false && <Alert message="Invalid email or password!"
                                               //description="Error Description Error Description Error Description Error Description Error Description Error Description"
                                               type="error"
                                               //closable
            />}
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        type:'email',
                        message: 'The input is not valid E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 11,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" >
                    Submit
                    {/*<NavLink to="/addReminder" isactive={()=>{if (this.state.valid==true){return true}*/}
                    {/*else{return false}}}>kkk</NavLink>*/}
                </Button>
            </Form.Item>
        </Form>

    </div>
    )
}



