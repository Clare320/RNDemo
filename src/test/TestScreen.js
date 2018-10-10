'use strict';

import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';
// import {ViewPager} from 'react-native-viewpager';

export default class TestScreen extends Component {
    static navigationOptions = {
        title: 'Test'
    };
    
    constructor(props) {
        super(props);
        // let dataSource = new ViewPager.DataSource({
        //     pageHasChanged: (p1, p2) => p1 !== p2,
        // });
        // this.state = {
        //     dataSource: dataSource.cloneWithPages(['red','yellow','blue'])
        // }

        this.state = {
            color: 'white'
        };
    }

    _renderPage(data, pageID) {
        return (
            <View style={{backgroundColor:{data}, height: 130, flex: 1}}></View>
        );
    }

    render() {
        return (
            <View style={{backgroundColor: this.state.color, flex:1}}>
                {/* <ViewPager 
                    style={{height: 130}}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}
                /> */}
                <Button 
                    title={'3s后弹出alert'}
                    onPress={()=>this.delayPresentAlert()}
                />
                <Button 
                    title={'开始循环改变颜色'}
                    onPress={()=>this.changeColor()}
                />
                <Button 
                    title={'结束改变'}
                    onPress={()=>{
                        clearInterval(this.colorInterval)
                    }}
                />
                <Button 
                    title={'测试Immediate'}
                    onPress={() => {
                        /// 来处理耗时，模块内语句处理完之后立即执行
                        // setImmediate(() => {
                        //     alert('test immediate');
                        // });

                    }}
                />
            </View>
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timer3)
    }

    changeColor = () => {
        this.colorInterval = setInterval(() => {
            this.setState((preState) => {
                if (preState.color === 'cyan') {
                    return {color: 'white'}
                } else {
                    return {color: 'cyan'}
                }
            });
        }, 2*1000);
    }

    delayPresentAlert = () => {
        // setTimeout返回的是代表timer的一个编号
        this.timer3 = setTimeout(() => {
            alert('这是3s后的alert');
        }, 3*1000);
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'gray'
    }
});

/**
 *  InteractionManager
 *  runAfterInteractions()
 *  createInteractionHandle()
 *  clearInteractionHandle(handle)
 */