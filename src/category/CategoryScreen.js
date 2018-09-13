import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

export default class CategoryScreen extends Component {
    static navigationOptions = {
        title: '分类',
    };
    render() {
        return (
            <View>
                <Text>Category</Text>
            </View>
        );
    }
}