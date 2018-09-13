import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    ScrollView,
    FlatList,
    Animated,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const kWidth = Dimensions.get('window').width;

const kButtons = [
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/b49a6642-d85d-425a-9e8e-c8ddba43ecda.jpg',
        'Name': '精彩推荐',
        'TargetUrl': 'http://192.168.117.146:8007/haitao'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/62ec0b3a-2475-459b-bcee-8d92f60526fc.jpg',
        'Name': '千玺',
        'TargetUrl': 'http://192.168.117.146:8007/community'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/f3b53fbb-e4f3-4627-8ba0-4f20bdefaacc.jpg',
        'Name': '视频购',
        'TargetUrl': 'http://192.168.117.146:8005/community/details?articleId=b15d2197-b70d-435c-9dcb-fd571aadc331&type=4'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/8e4da8ec-c9d5-4577-b790-5ac901991b9f.jpg',
        'Name': 'New',
        'TargetUrl': 'http://192.168.117.146:8007/GoodsGroup/0JHBC.html'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/02ff774f-a8fb-412e-9273-3471c1476995.jpg',
        'Name': '勿动002',
        'TargetUrl': 'http://192.168.117.146:8007/GoodsGroup/z1I8Q.html'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/c6974645-2efb-4756-8bd3-368e32558f6a.jpg',
        'Name': '80选2',
        'TargetUrl': 'http://192.168.117.146:8007/AnyPurchase/EUJSJR1.html'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/e6f26046-141f-466b-a71c-f2c248c52d1e.jpg',
        'Name': '精彩推荐',
        'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=a50e3d61-a560-4373-928c-7414488c62a0'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/fcadc1cf-8f92-4eba-a462-7daa36881c72.jpg',
        'Name': '勿动001',
        'TargetUrl': 'http://192.168.117.146:8007/GoodsGroup/Rgl4V.html'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/3871b600-e683-4422-a4a7-508854b15b1c.jpg',
        'Name': '商品组',
        'TargetUrl': 'http://192.168.117.146:8007/GoodsGroup/yDmBg.html'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/3871b600-e683-4422-a4a7-508854b15b1c.jpg',
        'Name': '商品组',
        'TargetUrl': 'http://192.168.117.146:8007/GoodsGroup/yDmBg.html'
    },
];

const kShoppingOnDemands = [
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/240a2918-0dc8-4376-871f-4c444a6e6ab0.jpg',
        'Name': '秀秀11111',
        'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=aee3c904-a80a-421a-843e-058cec4ad96b'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/240a2918-0dc8-4376-871f-4c444a6e6ab0.jpg',
        'Name': '秀秀11111',
        'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=aee3c904-a80a-421a-843e-058cec4ad96b'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/240a2918-0dc8-4376-871f-4c444a6e6ab0.jpg',
        'Name': '秀秀11111',
        'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=aee3c904-a80a-421a-843e-058cec4ad96b'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/240a2918-0dc8-4376-871f-4c444a6e6ab0.jpg',
        'Name': '秀秀11111',
        'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=aee3c904-a80a-421a-843e-058cec4ad96b'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/240a2918-0dc8-4376-871f-4c444a6e6ab0.jpg',
        'Name': '秀秀11111',
        'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=aee3c904-a80a-421a-843e-058cec4ad96b'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/240a2918-0dc8-4376-871f-4c444a6e6ab0.jpg',
        'Name': '秀秀11111',
        'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=aee3c904-a80a-421a-843e-058cec4ad96b'
    },
    {
        'ImgUrl': 'http://192.168.117.146:8011/AppImages/240a2918-0dc8-4376-871f-4c444a6e6ab0.jpg',
        'Name': '秀秀11111',
        'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=aee3c904-a80a-421a-843e-058cec4ad96b'
    },
];

// 带图片的按钮
class ImageButton extends Component {
    constructor(props) {
        super(props);
        // 需要外面传递 图片url， 按钮title， 按钮事件

    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.action}
                style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: 70, height: 80,}}
                activeOpacity={1}
            >
                <Image 
                    source={{uri:this.props.imageUrl}}
                    style={{margin:5, width: 50, height: 50, borderRadius: 25}}
                />
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

// 版块说明View
class SectionThemeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.moduleTipView}>
                <Image 
                    source={this.props.source ? this.props.source : require('../../resource/tab/tab_health_selected.png')}
                    style={{width:20, height: 20, marginRight: 8}}
                />
                <Text style={{textAlign: 'center'}}>{this.props.theme}</Text>
            </View> 
        );
    }
}

// 图片墙
class ImageWallView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let { theme } = this.props;
        return (
            <View style={{marginTop: 8}}>
            <SectionThemeView 
                theme={theme}
            />
            {/* 大图 */}
            <View style={styles.popularBigImage}>
                {
                    [
                        'http://192.168.117.146:8011/AppImages/ba88ffc1-a7a3-431c-b836-2326bae335c7.jpg',
                        'http://192.168.117.146:8011/AppImages/58437d72-bd48-4ee8-9c3a-3e5e23affd8f.jpg',
                        'http://192.168.117.146:8011/AppImages/03f5da50-2e87-4fba-b175-dfa7cfd5a7ce.jpg',
                        'http://192.168.117.146:8011/AppImages/f30d47bc-63a9-4272-bbe3-246fc261219a.jpg'
                    ].map((item, index) => {
                        return <Image 
                            key={'1'+index}
                            source={{uri: item}}
                            style={{width: (kWidth-3)/2, height: 100, borderRadius: 3}}
                        />
                    })
                }
            </View>
            {/* 小图 */}
            <View style={styles.popularBigImage}>
            {
                [
                    'http://192.168.117.146:8011/AppImages/2b4ac779-2268-4a84-a313-bd09a3640245.jpg',
                    'http://192.168.117.146:8011/AppImages/dd02c88f-02e0-4ee7-addb-a00fd8f264a1.jpg',
                    'http://192.168.117.146:8011/AppImages/13fc9f88-87f8-4579-a33c-d0c79370ff81.jpg',
                    'http://192.168.117.146:8011/AppImages/54c744b0-6596-4451-a1c3-2c360911fcc1.jpg'
                ].map((item, index) => {
                    return <Image 
                        key={'1'+index}
                        source={{uri: item}}
                        style={{width: (kWidth-5)/4, height: (kWidth-5)/4/47*56, borderRadius: 3}}
                    />
                })
            }
            </View>
        </View>
        );
    }
}

// 精彩活动
class WonderfulActivityView extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={1}>
                <View style={{backgroundColor: 'black'}}>
                    <View>
                        <Image 
                            source={{uri: 'http://192.168.117.146:8011/AppImages/ba88ffc1-a7a3-431c-b836-2326bae335c7.jpg'}}
                            style={{flex:1, height: kWidth/375*180}}
                        />
                        <Image
                            source={require('../../resource/home/icon_triangle.png')}
                            style={{width: 17, height: 10, marginLeft: 12, marginTop:-10}}
                        />    
                    </View>
                    <View>
                        <FlatList
                            contentContainerStyle={{flex:1, height:154, marginTop:0, marginLeft:0, marginRight:0, backgroundColor: 'white'}}
                            keyExtractor={(data, index) => {
                                return 'l'+index
                            }}
                            horizontal={true}
                            bounces={false}
                            data={['red', 'yellow', 'blue', 'cyan', 'black']}
                            renderItem={({item}) => 
                                <TouchableOpacity
                                    activeOpacity={1}
                                >
                                    <View style={{flex:1, width:108, height:154, backgroundColor:item}}>
                                    </View> 
                                </TouchableOpacity>   
                            }
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

// 问题 --scrollView中嵌套FlatList时 第一个加载的ScrollView高度混乱，没有按style设置显示，后加载的FlatList不显示
// 解决 -- 嵌套在ScrollView里面的FlatList或者SectionList不能使用style来设置，需要contentContainerStyle来设置

export default class HomeScene extends Component {
    constructor(props) {
        super(props);
        this._index = 0;
        this.state = {
            demandsFlagMarginLeftValue: new Animated.Value(0)
        };
    }
    
    render() {
        return (
            <View style={ styles.container }>
                <ScrollView style={styles.scrollView}>
                    {/* --Banner-- */}
                    <ScrollView 
                        ref={(e) => this._bannerScrollView = e}
                        style={styles.flatList}
                        horizontal={true}
                        pagingEnabled={true}
                    >
                        {
                            ['purple', 'cyan', 'green'].map((item, index) => {
                                return (
                                 <TouchableOpacity 
                                    style={styles.topImage}
                                    activeOpacity={1}
                                    key={'ll'+index}
                                >
                                    <View style={{backgroundColor: item, flex: 1}}></View>
                                </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    {/* 快捷入口按钮 */}
                    <View style={styles.quickEntry}>
                        {
                            kButtons.map((item, index) => {
                                return <ImageButton
                                    key={'l'+index} 
                                    title={item.Name}
                                    imageUrl={item.ImgUrl}
                                    action={() => alert('Check Check')}
                                />
                            })
                        }
                    </View>
                    {/* 热门活动 */}
                    <ImageWallView 
                        theme={'热门活动'}
                    />

                    {/* 按需购物 */}
                    <View style={{marginTop: 8, backgroundColor: 'white', alignItems: 'center'}}>
                        <SectionThemeView 
                            theme={'按需购物'}
                        />
                        <ScrollView
                            style={{height: 260}}
                            horizontal={true}
                            bounces={false}
                            onScroll={(event) => {
                                this._handleShoppingOnDemandsAreaOnScroll(event);
                            }}
                        >
                            <View style={styles.shoppingOnDemandsScroll}>
                                {
                                   this._setupShoppingOnDemands()
                                }
                             </View>
                        </ScrollView>
                        {/* 滑动指示条 */}
                        <View style={{width: 80, height: 6, borderRadius: 3, backgroundColor: '#f5f5f5', marginBottom: 15, marginTop: 5}}>
                            <Animated.View 
                                style={{backgroundColor: '#ff3366', width: 48, flex: 1, borderRadius: 3, marginLeft: this.state.demandsFlagMarginLeftValue}}
                                ref={(e) => this._demandsFlagView = e}
                            >
                            </Animated.View>
                        </View>
                    </View>
                    {/* 品牌精选 */}
                    <ImageWallView 
                        theme={'品牌精选'}
                    />
                    {/* 精彩活动 */}
                    <View style={{marginTop: 8}}>
                        <SectionThemeView 
                            theme={'精彩活动'}
                        />
                        {
                            [1, 2, 3].map((item, index) => {
                                return (<WonderfulActivityView 
                                    key={'l' + index}
                                />)
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    };

    // 疑问 -- 为什么在组件里面直接写个方法不行，反而在外面写方法，在组件里面调用就可以
    _setupShoppingOnDemands(){
        let obj = {
            'ImgUrl': 'http://192.168.117.146:8011/AppImages/240a2918-0dc8-4376-871f-4c444a6e6ab0.jpg',
            'Name': '秀秀11111',
            'TargetUrl': 'http://192.168.117.146:8007/community/Details?articleId=aee3c904-a80a-421a-843e-058cec4ad96b'
        };
        let array = [obj];
        for (let i= 0; i < 30; i++) {
            array.push(obj);
        }
         return array.map((item, index) => {
            return <ImageButton 
                key={'l'+index}
                title={item.Name}
                imageUrl={item.ImgUrl}
            />
        })
    }

    // 疑问 -- 多个Animated.View时是只能通过state具体字段来区分还是可以view id这种方式来区分

    // 处理按需购物滑动
    _handleShoppingOnDemandsAreaOnScroll(event) {
         // 拿到scrollView的偏移量
        let scrollView = event.nativeEvent;
        let offsetX = scrollView.contentOffset.x;
        let contentWidth = scrollView.contentSize.width;
        // let extraAreaWidth = contentWidth % kWidth == 0 ? kWidth : contentWidth % kWidth;
        let scale = offsetX / (contentWidth - kWidth);
         // 移动浮标
        let marginLeftValue = scale * 32;
        Animated.timing(this.state.demandsFlagMarginLeftValue, {
            toValue: marginLeftValue,
            duration: 300
        }).start();
    }
   componentDidMount() {
      // 组件加载完成
      this._timer = setInterval(() => {
        let isNeedAnimation = false;   
        if (this._index === 2) {
               this._index = 0;
           } else {
               this._index += 1;
               isNeedAnimation = true;
           }
           this._bannerScrollView.scrollTo({x: this._index * kWidth, y: 0, animated: isNeedAnimation});
      }, 2*1000);
   }

   componentWillUnmount() {
       this._timer && clearInterval(this._timer);
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    flatList: {
        width: Dimensions.get('window').width,
        height: 100,
    },
    topImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: 100,
        backgroundColor: 'red'
    },
    quickEntry: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        backgroundColor: 'white'
    },
    moduleTipView: {
        justifyContent: 'center', 
        height: 40, 
        backgroundColor: 'white', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    popularBigImage: {
        flexWrap: 'wrap', 
        marginLeft: 1, 
        marginRight: 1, 
        justifyContent: 'space-between', 
        flexDirection: 'row'
    },
    // 按需购物
    shoppingOnDemandsScroll: {
        height: 260,
        paddingTop: 10,
        paddingEnd: 10,
        flexDirection: 'column',
        flexWrap: 'wrap'
    }
});

/**
 *                      
                    <FlatList
                        ref={(e) => this.flatList = e}
                        style={styles.flatList}
                        keyExtractor= {(item, index) => String(index)}
                        horizontal={true}
                        pagingEnabled={true}
                        data={['red', 'blue', 'yellow']}
                        renderItem={ ({item}) =>
                            <TouchableOpacity 
                                style={styles.topImage}
                                activeOpacity={1}
                            >
                               <View style={{backgroundColor: item, flex: 1}}></View>
                               </TouchableOpacity>
                            }
                    >
                    </FlatList>
 */