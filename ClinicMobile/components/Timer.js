import React, {Component, useState} from 'react';
//import type {Node} from 'react'
import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
//import {Card} from 'react-native-paper';

export class Timer extends Component {
  constructor(props) {
    super(props);
    const now = Date.now();
    this.state = {
      time: props.dueHour * (60 * 60),
    };
  }

  render() {
    return <Text> {this.state.time} </Text>;
  }
  componentDidMount() {
    this.interval = setInterval( ( ) => this.setState({time: this.state.time-1}), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default Timer;
