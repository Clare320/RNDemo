import React, { Component } from 'react';
import {
    Text,
    Button,
    View,
} from 'react-native';

export default class TestCustomMarkScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    render() {
        return (
            <View 
                style={{flex:1}}
            >
                <Button onPress={()=>this.handleLoadData()} title='加载数据'></Button>
                <Button onPress={()=>this.handleReset()} title='重置'></Button>
                {
                    this.loadDynamically()
                }
            </View>
        );
    }

    loadDynamically = () => {
        
        if (this.state.data.length) {
           return this.state.data.map((item, index) => {
                let type = item.type;
                switch (type) {
                    case 'text':
                        return <Text key={String(index)}>{item.value}</Text>
                    case 'button':
                        return <Button key={String(index)} title={item.value} onPress={()=>alert(item.value)}/>
                    default:
                        break;
                }
           })
        } else {   
            return <View></View>   
        }       
    }
    
    handleLoadData = () => {
        this.setState({
            data:[
                {
                    'type': 'text',
                    'value': '加载的Text'
                },
                {
                    'type':'button',
                    'value': '进击的button'
                }
            ]
        });
    }

    handleReset = () => {
        this.setState({
            data: []
        });
    }
}