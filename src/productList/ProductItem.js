import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const itemWidth = Dimensions.get('window').width/2;
const contentWidth = itemWidth - 12 - 6;

export default class ProductItem extends Component {
    render() {
        const { GoodsId, GoodsName, GoodsImg, Price, SaleQuantity, ShopId} = this.props.item.item;
        
        let isLeft = (this.props.item.index % 2 === 0);

        return (
            <View 
                style={styles.container}
                key={GoodsId}
            >
                <View style={[styles.content, {marginLeft: isLeft ? 12 : 6, marginRight: isLeft ? 6 : 12}]}>
                    <Image 
                        source={{uri:GoodsImg}}
                        style={{height: contentWidth, width: contentWidth}}
                        resizeMode={'contain'}
                    />
                    <Text style={styles.goodsNameText}>
                        <Text style={styles.globalBuyText}>{ShopId == 2 ? '全球购' : ''}</Text>
                        {' '+GoodsName}
                    </Text>
                    <Text style={styles.saleCountText}>
                        <Text style={styles.priceText}>{'￥' + Price.toFixed(2)}</Text>
                        {'  销量' + SaleQuantity}件
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height: itemWidth + 100,
        width: itemWidth,
        backgroundColor: 'rgb(245,245,245)'
    },
    content: {
        flex:1,
        marginTop:10,
        borderRadius:6,
        backgroundColor: 'white',
        overflow:'hidden'
    },
    goodsNameText: {
        marginTop: 10,
        marginLeft:5,
    },
    globalBuyText: {
        backgroundColor: '#ff3366',
        color:'white',
        fontSize:12
    },
    saleCountText: {
        fontSize:12,
        marginTop:10,
        marginLeft:5,
    },
    priceText: {
        color:'#ff3366',
        fontSize: 16
    }
});