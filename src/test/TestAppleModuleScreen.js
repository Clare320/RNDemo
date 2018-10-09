import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import MapView from './MapView.js';

export default class TestAppleModuleScreen extends Component {
    
    static navigationOptions = {
        title: '加载苹果组件'
    }
    
    render() {
        return (
            <View style={styles.container}>
                <MapView style={{flex:1, backgroundColor: 'cyan', width: 100, height:100}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'yellow'
    }
});