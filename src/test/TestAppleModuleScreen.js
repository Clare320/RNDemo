import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import MapView from './MapView';
import RNCustomView from './RNCustomView';

export default class TestAppleModuleScreen extends Component {
    
    static navigationOptions = {
        title: '加载苹果组件'
    }
    
    render() {

        let region = {
            latitude: 121.43,
            longitude: 31.23,
            latitudeDelta:0.1,
            longitudeDelta:0.1,
        };

        return (
            <View style={styles.container}>
                <MapView 
                    style={{width:300, height:300}} 
                    region={region}
                />
                {/* <RNCustomView style={{height: 100, width: 100, backgroundColor:'red'}} /> */}
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