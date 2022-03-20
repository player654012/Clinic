import React, {Component, useState} from 'react';
//import type {Node} from 'react'
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {Card} from 'react-native-paper';
//import Timer from './Timer.js';

class reminders extends Component {
  constructor(props) {
    super(props);
    this.data = props.datas;
    this.state = {
      type: props.datas.states,
      time: props.datas.duration,
    };
  }

  updateState = () => {
    //const type = this.state.type == 'Competed' ? 'Not competed' : 'Competed';
    const type =
        this.state.type == 'Not competed' ? 'Competed' : 'Not competed';
    this.setState({type});
    this.competed();
  };

  async competed() {
    console.log("this.props.id", this.props.datas.id)
    try {
      const response = await fetch(
          'http://127.0.0.1:8000/completed/' +
          new URLSearchParams({id: this.props.datas.id}),
          {
            method: 'GET',
          },
      );
      const json = await response.json();
      console.log(json.content);
      // this.data = json.content;
      // this.setState(
      //     {datasource: json.content},
      //     () => (this.data = this.state.datasource),
      // );
    } catch (error) {
      console.log(error);
    }
  }


  async expired() {
    console.log("this.props.id",this.props.datas.id)
    try{
    const response = await fetch(
        'http://127.0.0.1:8000/expired/' +
          new URLSearchParams({id: this.props.datas.id}),
        {
          method: 'GET',
        },
    );
    const json = await response.json();
    console.log(json.content);
    // this.data = json.content;
    // this.setState(
    //     {datasource: json.content},
    //     () => (this.data = this.state.datasource),
    // );
  } catch (error) {
    console.log(error);
  }}
  // componentDidMount() {
  //   this.interval = setInterval(
  //     () => this.setState({time: this.state.time - 1}),
  //     60 * 1000 * 0.001,
  //   );
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    //let duration = Math.floor(this.state.time / 60);
    const renderTimer = () => {
      if (this.state.time <= 0) {
        this.expired();
        return <Text style={(styles.textStyle, {color: 'red',fontSize: 18,textAlign:'center'})}>Expired!</Text>;
      } else {
        return (
          <View>
            <Text style={styles.textStyle}>
              Due: In {this.state.time} hours
            </Text>
            <Button
              title="click to Done"
              onPress={this.updateState}
              color="#0984e3"
            />
          </View>
        );
      }
    };
    return this.state.type == 'Not competed' ? (
      //<Text style={styles.container}>hello{this.data.states} wor</Text>
      <Card style={styles.completedCard}>
        <Text style={styles.textStyle}>Reminder: {this.data.Remind_text}</Text>
        <Text style={styles.textStyle}>State: {this.state.type} </Text>
        {/*<Text style={styles.textStyle}>Due: {this.data.due} </Text>*/}
        {/*<Text style={styles.textStyle}>*/}
        {/*  Due: In {Math.floor(this.state.time / 60)}{' '}*/}
        {/*</Text>*/}
        {/*<Button*/}
        {/*  title="click to Done"*/}
        {/*  onPress={this.updateState}*/}
        {/*  color="#0984e3"*/}
        {/*/>*/}
        {renderTimer()}
      </Card>
    ) : (
      <Card style={styles.uncompletedCard}>
        <Text style={styles.textStyle}>{this.data.Remind_text}</Text>
        <Text style={styles.textStyle}>{this.state.type} </Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    //paddingHorizontal: 24,
  },
  uncompletedCard: {
    backgroundColor: '#ffeaa7',
    color: 'black',
    textAlign: 'center',
    margin: 12,
    marginTop: 5,
  },
  completedCard: {
    backgroundColor: '#fdcb6e',
    color: 'black',
    textAlign: 'center',
    margin: 12,
    marginTop: 5,
  },
  textStyle: {
    color: '#444444',
    fontSize: 18,
  },
});

export default reminders;
