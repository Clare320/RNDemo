import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
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

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start'
    }
});