import React, { Component } from  'react';
import  {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
} from 'react-native';

// import Carousel from 'react-native-looped-carousel';
import CarouselPager from 'react-native-carousel-pager';
import Carousel from 'react-native-snap-carousel';

import PropTypes from 'prop-types';

import TestPropTypes from './TestPropTypes';
import {itemWidth, sliderWidth} from "../example/src/styles/SliderEntry.style";
// import Banner_2 from "./Banner_2";

const { width, height } = Dimensions.get('window');

export default class Banner1Screen extends Component {

    state = {
        currentIndex: 0,
        isShowBottomGap: true,
    };

    render() {
        return (
            <View
                style={{ flex:1, backgroundColor: 'lightgray', }}
            >
                <View style={{ width: width, height: 100, backgroundColor: 'cyan'}}></View>
                {/*<Carousel*/}
                    {/*delay={2000}*/}
                    {/*style={{ width: width, height: 100, }}*/}
                    {/*autoplay={true}*/}
                    {/*pageInfo={false}*/}
                    {/*bullets={true}*/}
                {/*>*/}
                    {/*<View style={{ backgroundColor: 'red', width: width, height: 100, }}>*/}
                        {/*<Text>1</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{ backgroundColor: 'cyan', width: width, height: 100, }}>*/}
                        {/*<Text>2</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{ backgroundColor: 'green', width: width, height: 100, }}>*/}
                        {/*<Text>3</Text>*/}
                    {/*</View>*/}
                {/*</Carousel>*/}
                <View style={{backgroundColor: 'gray', height: 100}}></View>
                <View  style={{width: width, height: 100, backgroundColor:'white',}}>
                    <CarouselPager
                        style={{width: width, height: 100, backgroundColor:'white',}}
                        pageStyle={{backgroundColor: 'cyan', height: 100,}}
                    >
                        <View key={'page0'}></View>
                        <View key={'page1'}></View>
                        <View key={'page2'}></View>
                        <View key={'page3'}></View>
                    </CarouselPager>
                </View>
                <View style={{backgroundColor: 'black', height: 30}} />
                <TestPropTypes theme={'Clare && Lucien'} />
                <View style={{backgroundColor: 'white', height: 100, flexDirection: 'row', justifyContent: 'space-evenly'}} >
                    <View style={{width: 100, backgroundColor: 'red'}}></View>
                    <View style={{width: 200, backgroundColor: 'blue'}}></View>
                </View>

                <Banner_3 data={{content: ['red', 'green', 'blue', 'cyan']}} />

            </View>
        );
    }

}

class Banner_3 extends Component {

   static propTypes = {
       data: PropTypes.object.isRequired,
   };

    state = {
        currentIndex: 0,
        isShowBottomGap: true,
    };

    render() {
        const { style, content } = this.props.data;
        return (
            <View>
                <View style={{backgroundColor:'white'}}>
                    <Carousel
                        style={{height: 150}}
                        data={content}
                        renderItem={this.renderCarousel2Item}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        firstItem={0}
                        loop={true}
                        autoplay={true}
                        autoplayDelay={1000}
                        autoplayInterval={3000}
                        inactiveSlideOpacity={0.7}
                        inactiveSlideScale={0.92}
                        containerCustomStyle={{
                            marginTop: 10,
                            overflow: 'visible', // for custom animations
                            marginBottom: 10,
                        }}
                        onSnapToItem={(index) => {
                            this.setState({
                                currentIndex: index,
                            });
                        }}
                    />
                    <View style={{
                        position: 'absolute',
                        bottom: 18,
                        right: 60,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: 15,
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}>
                        <Text style={{color: 'white'}}>{(this.state.currentIndex + 1) + '/4'}</Text>
                    </View>
                </View>
                {
                    this.state.isShowBottomGap ? (<View style={{backgroundColor: '#f5f5f5', height: 8}}></View>) : (undefined)
                }
            </View>
        );
    }

    renderCarousel2Item = ({item, index}) => {
        let color = item
        return (
            <View style={{backgroundColor: item, height: 150, borderRadius: 5}}>
                <Text>{item}</Text>
                <Button
                    title={'test'}
                    onPress={() => alert('click' + (this.state.currentIndex + 1) + color)}
                />
            </View>
        );
    }
}


/*
* TestPropTypes 为什么实际渲染高度跟设置高度不一样
*
* RN中flex只能为整数，为0时由View的width和height来控制，不再具有弹性；为-1时依然由width和height来控制，空间不够时会缩放到minWidth和minHeight。
* flex为正整数时具有弹性, 同一个父view下按比例来
*
* 元素组件最好不要使用flex
*
* */
