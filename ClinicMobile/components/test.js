import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
//import ReminderList from './reminderList';

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async getMovies() {
    try {
      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'GET',
      });
      const json = await response.json();
      console.log(json.content);
      this.setState({data: json.content});
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id}
            renderItem={({item}) => (
                      <Text>{item.text}, {item.states}</Text>
                  )}
              />
          )}
        </View>
    );
  }
}
