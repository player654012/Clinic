import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import Login from './components/login.js'
import { Menu,Layout } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {Link, NavLink,Outlet} from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };
    render() {
        return (
            <div>
                <Layout>
                    <Header style={{color:'black',backgroundColor:'white'}}>
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="addReminder"
                                // icon={<MailOutlined />}
                            >
                                <Link to="/addReminder">Add Reminder</Link>

                            </Menu.Item>
                            <Menu.Item key="Reminderlist">
                                {/*<a href="/" target="_blank" rel="noopener noreferrer">*/}
                                {/*    Reminder list*/}
                                {/*</a>*/}
                                <Link to="/reminderList">Reminder list</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{height:'-moz-initial',backgroundColor:'white'}}>
                        <div style={{backgroundColor:'white'}}>
                            <Outlet/>
                        </div>
                    </Content>

                    {/*<Footer>Footer</Footer>*/}
                </Layout>
            </div>
        );
    }

    //
    // render() {
    //     const { current } = this.state;
    //     return (

    //     );
    // }
}




// function App() {
//   return (
//     <div className="App">
//       <Login/>
//     </div>
//   );
// }

export default App;
