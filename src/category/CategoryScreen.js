import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    SectionList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
// const readFilePromise = require('fs-readfile-promise');

import categoryData from '../../asset/category.json';

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
    {
        'key':'3',
        'name':'护理液11'
    },
];


export default class CategoryScreen extends Component {
    static navigationOptions = {
        title: '分类',
    };

    constructor(props) {
        super(props);

        this.state = {
            'data': categoryData.Data,
            'secondSourceData':[
                {
                    'title':'测试1',
                    'data': [1, 2, 3]
                    // 'data':[{'source':[{'MobileClassName':'三级分类1'}, {'MobileClassName':'三级分类2'}, {'MobileClassName':'三级分类3'}]}]
                },
                {
                    'title':'测试2',
                    'data': [1, 2, 3]
                    // 'data':[{'source':[{'MobileClassName':'三级分类1'}, {'MobileClassName':'三级分类2'}, {'MobileClassName':'三级分类3'}]}]
                }
            ],
            'categorySelectedIndex': 0,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                style={{
                    flex:1, 
                    width: Dimensions.get('window').width*0.3,
                }}
                keyExtractor={(item, index) => {item.key}}
                data={this.state.data}
                renderItem={({item, index}) => {
                   return <TouchableOpacity 
                        activeOpacity={1}
                        style={{
                            flex:1, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            height: 40, 
                            padding:5,
                            backgroundColor:this.state.categorySelectedIndex == index ? '#ff3366' : 'white',
                            borderRadius: this.state.categorySelectedIndex == index ? 18 : 0,
                        }}
                        key={String(index)}
                        onPress={() => {this._changeCategory(item,index)}}
                    >
                        <Text style={{
                                color:'black', 
                                textAlign:'center',
                                }}
                            >
                                {item.MobileClassName}
                        </Text>   
                    </TouchableOpacity>
                }}
               />
               <SectionList
                    contentContainerStyle={{
                        flex:4,
                        backgroundColor:'white', 
                        height: Dimensions.get('window').height
                    }}
                    keyExtractor={(item, index) => String(index)}
                    sections={[
                        {title:'Title1', data:[{source:['item1', 'item2']}]},
                        {title:'Title2', data:[{source:['item3', 'item4']}]},
                        {title:'Title3', data:[{source:['item5', 'item6']}]}
                    ]}
                    renderItem={({item, index, section}) => {
                        return this._sectionListRenderItem(item, index, section)
                    
                    }}
                    // renderSectionHeader={({ section: {title} }) => (
                    //     <View
                    //         style={{ height:30, justifyContent: 'center', alignItems:'center'}}
                    //     >
                    //         <Text style={{textAlign:'left',}}>{title}</Text>
                    //     </View>
                    // )}
               />
            </View>
        );
    }

    componentDidMount() {
       
    }

    _sectionListRenderItem(item, index, section) {
        console.log(item)
        return <View
            style={{
                flex:1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
            }}
            key={String(index)}
        >
           {
               item.source.map((model, i) => {
                   return this._renderThirdCategoryCell(model, i)
               })
           }
        </View>
    }

    _gotoProductList() {
        this.props.navigation.navigate('ProductList');
    }
    _renderThirdCategoryCell(item, index) {
         
        return  <View 
                    style={{
                            // flex:1,
                            width:70,        
                            height:70,
                            alignItems:'center',
                            backgroundColor: '#f5f5f5'               
                    }} 
                    key={String(index)}          
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this._gotoProductList()
                        }}
                        style={{
                            flex:1, 
                        }}
                    >
                    <Image 
                        style={{
                            marginTop: 5,
                            marginBottom: 5,
                            width: 40,
                            height: 40,
                            backgroundColor: 'cyan'
                        }}
                    />
                    <Text style={{marginBottom:8, textAlign: 'center'}}>{item}</Text>
                    </TouchableOpacity>   
                </View>                
    }

    _changeCategory(item, index) {
        this.setState({
            'categorySelectedIndex': index
        });
    }

    _formatDataSource(){
        let source = new Array();
        let oldSource = categoryData.Data[0];
        return oldSource.Child.map((item) => {
            return {
                'title': item.MobileClassName,
                'data': [{'MobileClassName': '测试属性'}],
            };
            
        });
    }

}

// 问题 -- 设置边框的内边距
//SectionList 为啥只有最后一个分区显示cell

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5',
        flexDirection: 'row'
    }
});