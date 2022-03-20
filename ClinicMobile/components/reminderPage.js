import React, {Component} from 'react';
//import type {Node} from 'react'
//import Reminders from './reminder.js';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
//import Test from './test.js';
import ReminderList from './reminderList.js';

export class ReminderPage extends Component {
  constructor(props) {
    super(props);
    this.email = props.route.params.email;
    this.state = {
      email: props.email,
      //isLoading: true,
    };
  }


  componentDidMount() {
    console.log("!!!!!!!!!!!!!!!page email",this.email,this.data)
  }
  render() {

    //const {name, type} = this.state;
    return (
      <ScrollView style={styles.container}>
        <ReminderList email={this.email} />
      </ScrollView>
    );
    // this.datas.map((item, index) => {
    //   return <Reminders datas={item} key={index} />;
    // });
    //<Reminders datas={this.datas} />
    // <View style={styles.container}>
    //   <FlatList
    //     data={this.datas}
    //     renderItem={({item})=> {
    //         return this.renderData(item);
    //       }
    //       // datas &&
    //       // datas.map(item => {
    //       //   console.log();
    //       //return <Reminders data={item} />;
    //     }
    //     keyExtractor={item => `${item.id}`}
    //   />
    //   {/*<Text>Hello</Text>*/}
    // </View>
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    //paddingHorizontal: 24,
  },
});

export default ReminderPage;
