import React, {Component, useEffect} from 'react';

//import type {Node} from 'react'
import Reminders from './reminder.js';
import {StyleSheet, Text, View, FlatList} from 'react-native';
//import {re} from '@babel/core/lib/vendor/import-meta-resolve';
import {fetch} from 'react-native/Libraries/Network/fetch';

export class ReminderMap extends Component {
    constructor(props) {
        super(props);
        this.test=props.data
        //this.email=props.email
        this.state = {
            datasource: props.data,
        };
    }

    // async getMovies() {
    //     try {
    //         console.log('this.email:', this.email);
    //         const response = await fetch(
    //             'http://127.0.0.1:8000/' + new URLSearchParams({email: this.email}),
    //             {
    //                 method: 'GET',
    //             });
    //         const json = await response.json();
    //         console.log(json.content);
    //         this.setState({datasource: json.content});
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         this.setState({isLoading: false});
    //     }
    // }


    // componentDidMount() {
    //     this.getMovies();
    // }
    //
    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    //     if prevProps
    //         }

    render() {
        console.log("map",this.test,this.state)
        //const {name, type} = this.state;
        // return <Text>render</Text>;
        return this.state.datasource.map((item, index) => {
            return <Reminders datas={item} key={index} />;
        });
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 62,
        //paddingHorizontal: 24,
    },
});

export default ReminderMap;
