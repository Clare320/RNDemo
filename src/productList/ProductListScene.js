import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';
import ProductItem from './ProductItem';
export default class ProductListScene extends Component {
    static navigationOptions = {
        title: '商品列表'
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: true
        };

        this.pageSize = 10,
        this.pageIndex = 1;
        this.totalPage = 0;
        this.isLoadMore = false;
        this.isRefreshing = false;
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    keyExtractor={(item,index) => String(index)}
                    numColumns={2}
                    renderItem={(item, index) => 
                        <ProductItem item={item} />
                    }
                    data={this.state.data}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.loadMore}
                >
                </FlatList>
            </View>
        );
    }

    onRefresh = () => {
        if (this.isRefreshing) {
            return;
        }
        this.pageIndex = 1;
        this.isRefreshing = true;
        this.setState({refreshing: true});
        this.requestData();
    }

    endRefresh = () => {
        this.isRefreshing = false;
        this.isLoadMore = false;
        this.setState({refreshing: false});
    }

    loadMore = () => {
        if (this.isLoadMore && this.pageIndex >= this.totalPage) {
            return;
        }
        this.pageIndex++;
        this.isLoadMore = true;
        this.requestData();
    }

    // 请求
    requestData = async () => {
        let url = `https://api.baishop.com/api/Goods/Items?Cid=db509a7f-9599-4fa4-8d4f-316aaa67f813&Size=${this.pageSize}&Page=${this.pageIndex}&Sort=0`;

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    salePlatformId: '60CBE5FE-71A7-4660-9BEC-1422227D6ADB',
                })
            });
            if (response.ok) {
                let json = await response.json();
                if (json.State) {
                    console.log(json);
                    this.totalPage = json.TotalPage;
                    this.setState((preState) => {
                        if (this.pageIndex === 1) {
                            preState.data = [];
                        }
                        return {data: preState.data.concat(json.Data)};
                    });   
                } 
            }
            this.endRefresh();
        } catch (e) {
            alert('失败');
            this.endRefresh();
        }
    }

    componentDidMount() {
        // this.requestData();
        this.onRefresh();
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f5f5f5'
    },
    flatList: {
        flex:1
    }
});