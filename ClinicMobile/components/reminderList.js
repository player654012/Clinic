import React, {Component, useEffect} from 'react';

//import type {Node} from 'react'
import Reminders from './reminder.js';
import RemindersMap from './reminderMap.js';
import {StyleSheet, Text, View, FlatList} from 'react-native';
//import {re} from '@babel/core/lib/vendor/import-meta-resolve';
import {fetch} from 'react-native/Libraries/Network/fetch';

export class ReminderList extends Component {
  constructor(props) {
    super(props);
    this.email = props.email;
    this.data = null;
    this.state = {
      isLoading: true,
      datasource: [],
    };
  }

  async getMovies() {
    try {
      this.setState({isLoading: true});
      console.log('this.email:', this.email);
      const response = await fetch(
        'http://127.0.0.1:8000/' + new URLSearchParams({email: this.email}),
        {
          method: 'GET',
        },
      );
      const json = await response.json();
      console.log(json.content);
      // this.data = json.content;
      this.setState(
        {datasource: json.content},
        () => (this.data = this.state.datasource),
      );
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  }

  // async componentDidMount() {
  //   // const SERVER_URL =
  //   //   'http://127.0.0.1:8000/' + new URLSearchParams({email: this.email});
  //   const res = await fetch(
  //     'http://127.0.0.1:8000/' + new URLSearchParams({email: this.email}),
  //     {
  //       method: 'GET',
  //     },
  //   );
  //   const data = await res.json();
  //   this.setState({isLoading: false, datasource: data});
  //   this.timer = setInterval(() => {
  //     this.setState({isLoading: true});
  //     let lastId = null;
  //     const {isLoading, newData} = this.state;
  //     // if(isLoading ==false) {
  //     //            if(newData.length > 0) lastId = newData[0].id
  //     //             else lastId = initialData[0].id
  //     //          }
  //     const data = fetch(
  //       'http://127.0.0.1:8000/' + new URLSearchParams({email: this.email}),
  //       {
  //         method: 'GET',
  //       },
  //     ).then(res => res.json());
  //     // const res = await fetch(`${SERVER_URL}/${lastId}`);
  //     // const data = await res.json();
  //     this.setState({isLoading: false, datasource: data});
  //   }, 8000);
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }
  componentDidMount() {
    this.getMovies();
    this.interval = setInterval(() => this.getMovies(), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // componentDidMount() {
  //   this.getMovies();
  // }

  render() {
    console.log('this.data:', this.state.datasource);
    //const {name, type} = this.state;
    // return <Text>render</Text>;
    if (this.state.isLoading == true) {
      return <Text>loading</Text>;
    } else {
      return <RemindersMap data={this.state.datasource} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 62,
    //paddingHorizontal: 24,
  },
});

export default ReminderList;
