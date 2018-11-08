import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
} from 'react-native';
import Banner_2 from "./Banner_2";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const sliderWidth = viewportWidth;
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const itemWidth = slideWidth + itemHorizontalMargin * 2;



export default class TestBanner2 extends Component {
    render() {
       return (
           <View style={{flex: 1}}>
             <Text>------Banner2</Text>
               <Banner_2
                   style={{height: 100}}
                   data={['red', 'green', 'blue', 'cyan']}
                   renderItem={this.renderCarousel2Item}
                   sliderWidth={sliderWidth}
                   itemWidth={itemWidth}
                   firstItem={0}
                   loop={true}
                   autoplay={true}
                   autoplayDelay={1000}
                   autoplayInterval={3000}
                   inactiveSlideOpacity={0.7}
                   inactiveSlideScale={0.94}
                   containerCustomStyle={{
                       marginTop: 15,
                       overflow: 'visible' // for custom animations
                   }}
                   contentContainerCustomStyle={{
                       paddingVertical: 10 // for custom animation
                   }}
               />
           </View>
       );
    }

    renderCarousel2Item = ({item, index}) => {
        let color = item
        return (
            <View style={{backgroundColor: item, height: 100}}>
                <Text>{item}</Text>
            </View>
        );
    }

}
