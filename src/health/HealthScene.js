import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class HealthScene extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text>Health Scene</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});