import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class MineScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text>Mine Scene</Text>
                <Button title={'PushTest'} onPress={(e) => this.props.navigation.navigate('Test')}>Push Test</Button>
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