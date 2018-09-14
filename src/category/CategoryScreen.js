import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
// const readFilePromise = require('fs-readfile-promise');

const kCategoryListData = [
    {
        'key':'0',
        'name':'自营'
    },
    {
        'key':'1',
        'name':'全球购+'
    },
    {
        'key':'2',
        'name':'护理液'
    },
];


export default class CategoryScreen extends Component {
    static navigationOptions = {
        title: '分类',
    };
    render() {
        return (
            <View style={styles.container}>
               <FlatList
                style={{width: Dimensions.get('window').width*0.3, flex:1,}}
                keyExtractor={(item, index) => {item.key}}
                data={kCategoryListData}
                renderItem={({item, index}) => {
                   return <TouchableOpacity 
                        activeOpacity={1}
                        style={{flex:1, justifyContent: 'center', alignItems: 'center',}}
                        key={index+'1'}
                    >
                        <Text style={{backgroundColor:'cyan', color:'black', flex:1, textAlign:'center',}}>{item.name}</Text>
                    </TouchableOpacity>
                }}
               >
               </FlatList>
            </View>
        );
    }

    componentDidMount() {
        alert('componentDidMount');
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    }
});