//import React, {Component} from 'react';
//import type {Node} from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native';
//import Test from './components/test.js';
//import ReminderList from './components/reminderList.js';
import ReminderPage from './components/reminderPage.js';
import Login from './components/login.js';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return MyStack();
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Log in" component={Login} />
        <Stack.Screen
          name="ReminderPage"
          component={ReminderPage}
          options={{title: 'To do list'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const MyStack = () => {
//
// };

// export class App extends Component {
//   render() {
//     return (
//       <View>
//         <ReminderPage />
//       </View>
//     );
//   }
// }
const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    //paddingHorizontal: 24,
  },
});
