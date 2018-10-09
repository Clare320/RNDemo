import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';

const RNTMap = requireNativeComponent('RNTMap', MapView);

export default class MapView extends Component {
    render() {
        return (
            <RNTMap 
                zoomEnabled={this.props.zoomEnabled}
            />
        );
    }
}

// propTypes设置只能放在class后面？
MapView.propTypes = {
    zoomEnabled: PropTypes.bool
};

MapView.defaultProps = {
    zoomEnabled: false
};
