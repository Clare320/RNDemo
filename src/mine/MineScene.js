import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class MineScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let buttons = [
            {
                'title':'PushTest',
                action: () => this.props.navigation.navigate('Test')
            },
            {
                'title':'动态加载标签',
                action: this.handlePushCustomMarkScreen
            },
            {
                'title':'苹果组件',
                action: () => {
                    this.props.navigation.navigate('TestAppleModule')
                }
            },
            {
                'title':'Transform',
                action: this.handleTestTransform
            },
            {
                'title': 'Test Banner',
                action: this.showBanner
            },
            {
                title: 'Banner1',
                action: () => {
                    this.props.navigation.navigate('Banner1');
                }
            },
            {
                title: 'TestBanner2',
                action: () => {
                    this.props.navigation.navigate('TestBanner2');
                }
            },
        ];
        return (
            <View style={ styles.container }>
                <Text>Mine Scene</Text>
                {
                   buttons.map( (item, index) => {
                       return <Button
                            key={String(index)}
                            title={item.title}
                            onPress={() => item.action()}
                       />
                   })
                }
            </View>
        );
    }

    handleTestTransform = () => {
        this.props.navigation.navigate('Transform');
    }

    handlePushCustomMarkScreen = () => {
        this.props.navigation.navigate('CustomMark');
    }

    showBanner = () => {
        this.props.navigation.navigate('Banner');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});
