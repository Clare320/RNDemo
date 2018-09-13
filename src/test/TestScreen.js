'use strict';

import React, { Component } from 'react';
import {
    View,
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
    }

    _renderPage(data, pageID) {
        return (
            <View style={{backgroundColor:{data}, height: 130, flex: 1}}></View>
        );
    }

    render() {
        return (
            <View style={styles.view}>
                {/* <ViewPager 
                    style={{height: 130}}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'gray'
    }
});