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
                        {title:'Title1', data:[{source:['item', 'item']}]},
                        {title:'Title2', data:[{source:['item', 'item']}]},
                        {title:'Title3', data:[{source:['item', 'item']}]}
                    ]}
                    renderItem={({item, index, section}) => {
                      return <View
                            style={{
                                flex:1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                            >
                            {
                                item.source.map((obj, i) =>{
                                  return ( <View 
                                    style={{
                                        width:70,        
                                        height:70,
                                        alignItems:'center'               
                                    }} 
                                    key={String(i)}          
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
                                    {/* {item.MobileClassName} */}
                                    <Text style={{marginBottom:8, textAlign: 'center'}}>测试</Text>
                                </View>   );  
                                })
                            }
                             </View>
                    }}
                    renderSectionHeader={({ section: {title} }) => (
                        <View
                            style={{ height:30, justifyContent: 'center', alignItems:'center', backgroundColor:'red'}}
                        >
                            <Text style={{textAlign:'center', color: 'cyan'}}>标题头</Text>
                        </View>
                    )}
               />
            </View>
        );
    }

    componentDidMount() {
       
    }

    _sectionListRenderItem(item, index, section) {
        return <View
            style={{
                flex:1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                height: 100,
            }}
        >
           {/* item.source.map((model, i) => {
                this._renderThirdCategoryCell(model, i)
            }); */}

        </View>
    }

    _renderThirdCategoryCell(item, index) {
        return <View 
                    style={{
                        width:70,        
                        height:70,
                        alignItems:'center'               
                    }} 
                    key={String(index)}          
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
                    {/* {item.MobileClassName} */}
                    <Text style={{marginBottom:8, textAlign: 'center'}}>测试</Text>
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