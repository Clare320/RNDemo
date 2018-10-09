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
                <Button 
                    title={'测试动态加载标签'}
                    onPress={()=>this.handlePushCustomMarkScreen()}
                />
                <Button 
                    title={'测试苹果组件'}
                    onPress={()=>this.props.navigation.navigate('TestAppleModule')}
                />
            </View>
        );
    }

    handlePushCustomMarkScreen = () => {
        this.props.navigation.navigate('CustomMark');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});