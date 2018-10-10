import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent,
    View,
} from 'react-native';

// export default requireNativeComponent('LJMapView', null);

const RNMapView = requireNativeComponent('LJMapView', MapView);
 class MapView extends Component {
    
    _onRegionChange = (event) => {
        if (!this.props.onRegionChange) {
            return;
        }
        alert('test');
        this.props.onRegionChange(event.nativeEvent);
    }
    
    render() {
        return (
            <RNMapView 
                style={{
                    flex:1,
                    // width:300, 
                    // height:300
                }}    
                zoomEnabled={this.props.zoomEnabled}
                onRegionChange={this._onRegionChange}
            />
        );
    }
}

// propTypes设置要在类声明之后
MapView.propTypes = {
    zoomEnabled: PropTypes.bool,
    // 地图显示区域
    region: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        latitudeDelta: PropTypes.number.isRequired,
        longitudeDelta: PropTypes.number.isRequired,
    }),
};

MapView.defaultProps = {
    zoomEnabled: false
};

export default MapView;

// 在外层直接设置style不起作用， 可以将style中属性以props形式外放出去来设置
