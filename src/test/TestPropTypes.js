import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

import PropTypes from 'prop-types';

const styles = StyleSheet.create({
   container: {
       // flex: 1,
       alignItems: 'center',
       backgroundColor: '#f5f5f5',
   }
});

export default class TestPropTypes extends Component {

    static propTypes = {
        theme: PropTypes.string,
    };

    static defaultProps = {
        theme: 'My Page',
    };

    state = {
        isShowAuthor: false
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.theme}</Text>
                <Button
                    title={'More'}
                    onPress={this.loadMore}
                />
                {
                    this.state.isShowAuthor ? (<Text>Lingjie</Text>) : (undefined)
                }
            </View>
        )
    }

    loadMore = () => {
        this.setState((preState) => {
            return {isShowAuthor: !preState.isShowAuthor};
        });
    }
}

