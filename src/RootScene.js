import React, { Component } from 'react';
import { StyleSheet, 
    Image,
    TouchableOpacity,
    Text,
    Dimensions 
} from 'react-native';

import { NativeModules } from 'react-native';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScene from './home/HomeScene';
import DiscoveryScene from './discovery/DiscoveryScene';
import HealthScene from './health/HealthScene';
import CartScene from './cart/CartScene';
import MineScene from './mine/MineScene';
import TestScreen from './test/TestScreen';
import CategoryScreen from './category/CategoryScreen';
import ProductListScene from './productList/ProductListScene';
import TestCustomMarkScreen from './test/TestCustomMarkScreen';
import TestAppleModuleScreen from './test/TestAppleModuleScreen';
import TestTransformScreen from './test/TestTransformScreen';
// 可点击图片
class TouchedImage extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.action}
                activeOpacity={1}
            >
                <Image 
                    source={this.props.source}
                    style={this.props.style}
                />
            </TouchableOpacity>
        );
    }
}

const TabBarNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image  
                        source={focused ? require('../resource/tab/tab_home_selected.png') : require('../resource/tab/tab_home_default.png')} 
                        style={styles.tabBarItem} 
                    />
                )
            }
        },
        Discovery: {
            screen: DiscoveryScene,
            navigationOptions: {
                tabBarLabel: '发现',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image  
                        source={focused ? require('../resource/tab/tab_discovery_selected.png') : require('../resource/tab/tab_discovery_default.png')} 
                        style={styles.tabBarItem} 
                    />
                )
            }
        },
        Health: {
            screen: HealthScene,
            navigationOptions: {
                tabBarLabel: '健康',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image  
                        source={focused ? require('../resource/tab/tab_health_selected.png') : require('../resource/tab/tab_health_default.png')} 
                        style={styles.tabBarItem} 
                    />
                )
            }
        },
        Cart: {
            screen: CartScene,
            navigationOptions: {
                tabBarLabel: '购物车',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image  
                        source={focused ? require('../resource/tab/tab_cart_selected.png') : require('../resource/tab/tab_cart_default.png')} 
                        style={styles.tabBarItem} 
                    />
                )
            }
        },
        Mine: {
            screen: MineScene,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image  
                        source={focused ? require('../resource/tab/tab_mine_selected.png') : require('../resource/tab/tab_mine_default.png')} 
                        style={styles.tabBarItem} 
                    />
                )
            }
        }
    }, 
    {
        // navigationOptions: ({ navigation }) => ({
        //     tabBarIcon: ({ focused, tintColor }) => {
        //         const { routeName } = navigation.state;
        //         let iconName = routeName.toLocaleLowerCase;
        //         let name = focused ? 'selected' : 'default';
        //         let source = `../resource/tab/tab_${iconName}_${focused ? 'selected' : 'default'}.png`;
        //         return <Image source={require(`${source}`)} style={styles.tabBarItem} />
        //     }
        // }),
        tabBarOptions: {
            activeTintColor: '#ff3366',
            style: {
                backgroundColor: 'white'
            }
        }
    }
);

// 设置TabNavigator的navigationOptions
TabBarNavigator.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let headerTitle = null;
    let leftItem = null;
    let rightItem = null;
    switch (routeName) {
        case 'Home':
        {
            headerTitle = (
                <TouchableOpacity 
                    activeOpacity={1}
                    style={styles.searchBar}
                    onPress={() => {
                        alert('Search');
                    }}
                >
                    <Image 
                        source={require('../resource/home/nav_search.png')}
                        style={styles.searchIcon}
                    />
                    <Text style={{color:'#c0c0c0'}}>请输入搜索内容</Text>
                </TouchableOpacity>
            );
            leftItem = (<TouchedImage 
                            source={require('../resource/home/nav_classify_char.png')}
                            style={{width:20, height:33.5, marginLeft:15}}
                            action={() => {
                                navigation.navigate('Category');
                            }}
                        />);
            rightItem = (<TouchedImage
                            source={require('../resource/home/nav_message_char.png')}
                            style={{width:20,height:30, marginRight:15}}
                            action={() => {
                                const manager = NativeModules.RNCommunicationManager;
                                manager.addEvent('pop', 'test');
                            }}
                        />);
        }
            break;
        case 'Discovery':
            headerTitle = '发现';
            break;
        case 'Health':
            headerTitle = '健康';
            break;
        case 'Cart':
            headerTitle = '购物车';
            break;
        case 'Mine':
            headerTitle = '我的';
            break;
        default:
            break;
    }
    return {
        headerTitle: headerTitle,
        headerLeft: leftItem,
        headerRight: rightItem
    };
};

// 导航
const StackNavigator = createStackNavigator({
    Tab: {
        screen: TabBarNavigator,
    },
    Test: TestScreen,
    Category: CategoryScreen,
    ProductList: ProductListScene,
    CustomMark: TestCustomMarkScreen,
    TestAppleModule: TestAppleModuleScreen,
    Transform: TestTransformScreen,
},
{
    headerLayoutPreset:'center',
    navigationOptions: {
        headerBackTitle: null,
        headerBackImage:(
            <Image 
                source={require('../resource/nav/nav_back_gray.png')}
                style={{width:44, height:44, marginLeft:15}}
            ></Image>
        )
    }
});



const styles = StyleSheet.create({
    tabBarItem: {
        width: 20,
        height: 20
    },
    searchBar: {
        width:Dimensions.get('window').width*0.7,
        height:30,
        backgroundColor:'#e9e9ee',
        borderRadius: 19,
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchIcon:{
        width:20,
        height:20,
        margin:5,
        marginLeft:20
    }
});

export default StackNavigator;