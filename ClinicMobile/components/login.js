import React, {Component} from 'react';
//import type {Node} from 'react'
//import Reminders from './reminder.js';

import {fetch} from 'react-native/Libraries/Network/fetch';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
//import App from '../App';

class Login extends Component {
  constructor(props) {
    super(props);
    this.email = null
    this.vali=false
    this.state = {
      email: '',
      password: '',
      valid: false,
      login: false,
    };
  }
  handleEmail = text => {
    this.setState({email: text});
  };
  handlePassword = text => {

    //this.login();
    this.setState({password: text},() => {
      console.log("handlePassword",this.state.email,this.state.password);
      this.login(this.state.email, this.state.password);
    });
    //console.log("password",text,this.state.password)
  };

  validate = text => {
    this.login(text, this.state.password);
    console.log("input email",text);
    this.email=text;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log(text, 'Email is Not Correct');

      this.setState({email: text, valid: false},() => {
        console.log(this.state.password);
      });
      console.log("?",text,this.state.email ,'Email is Not Correct');
      return false;
    } else {

      this.setState({email: text, valid: true},() => {
        console.log(this.state.password);
      });
      console.log('Email is Correct');
    }
  };

  async login(email, password) {
    console.log("entry login",email, password);
    const data = {'email': email, 'password':password};
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log('json.login:', json.login);
      this.setState({login: json.login},()=>this.vali=this.state.login);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.login(this.state.email, this.state.password);
  }


  checkInput = (email, pass) => {
    alert('email: ' + email + '\npassword: ' + pass);
  };

  checkEmail = () => {
    console.log("entry checkEmail",this.state.email,this.state.password)
    //this.login(this.state.email, this.state.password);

    if (this.state.valid === true) {
      //this.login();
      console.log("$$$$",this.vali, this.state.email);
      if (this.vali === true) {
        console.log("checkEmial", this.email);
        return this.props.navigation.navigate('ReminderPage', {
          email: this.state.email,
          //email: "Pat1@gmail.com",
        });
      } else {
        alert('Invalid email or password2');
      }
    } else {
      alert('Invalid email or password1');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="please input your email"
          placeholderTextColor="#cccccc"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyLabel="next"
          onChangeText={
          this.validate
        }
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="please input your password"
          placeholderTextColor="#cccccc"
          autoCapitalize="none"
          returnKeyType="next"
          returnKeyLabel="next"
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.submitButtom}
          onPress={
            this.checkEmail
            //() => this.props.navigation.navigate('ReminderPage')
            // this.checkInput(this.state.email, this.state.password)
          }>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    //paddingHorizontal: 24,
  },
  input: {
    margin: 15,
    paddingLeft: 8,
    height: 40,
    borderColor: '#975459',
    borderWidth: 1,
  },
  submitButtom: {
    backgroundColor: '#c77',
    padding: 10,
    alignItems: 'center',
    margin: 15,
    height: 40,
  },
});

export default Login;
