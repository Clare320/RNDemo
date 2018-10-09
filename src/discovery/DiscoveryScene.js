import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { NativeModules, NativeEventEmitter } from 'react-native';

const manager = NativeModules.RNCommunicationManager;
const emitterManager = NativeModules.RNEventEmitterManager;

export default class DiscoveryScene extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text>Discovery Scene</Text>
                <Button 
                    onPress={()=>this._handleTestButton()}
                    title='测试'
                />
                <Button 
                    onPress={() => this.handleTest12()}
                    title='测试原生RCT_REMAP_METHOD'
                />
                <Text>OC发通知，RN中监听通知</Text>
                <Button 
                    title='告诉OC发通知'
                    onPress={() => this.handleSendNotification()}
                />
            </View>
        );
    }

    /// 这里监听没走通
    componentDidMount() {
        const managerEmitter = new NativeEventEmitter(emitterManager);

        this.subscription = managerEmitter.addListener(
            'EventReminder',
            (reminder) => {
                alert(reminder);
            }
        );
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    _handleTestButton = () => {
        alert('Discovery');
    }

    handleTest12 = () => {
        manager.addEvent('测试', 'rn中调用addEvent');
    }

    handleSendNotification = () => {
        manager.addEvent('addObserver', 'llj');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});