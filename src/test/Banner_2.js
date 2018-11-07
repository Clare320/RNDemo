import React, { Component } from 'react';
import {
    Animated,
    Easing,
    FlatList,
    I18nManager,
    Platform,
    ScrollView,
    View,
    ViewPropTypes,
} from 'react-native';

import shallowCompare from 'react-addons-shallow-compare';

import PropTypes from 'prop-types';

const IS_IOS = Platform.OS === 'ios';

const AnimatedFlatList = FlatList ? Animated.createAnimatedComponent(FlatList) : null;

export default class Banner_2 extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        renderItem: PropTypes.func.isRequired,
        itemWidth: PropTypes.number, // required for horizontal carousel
        itemHeight: PropTypes.number, // required for vertical carousel
        sliderWidth: PropTypes.number, // required for horizontal carousel
        sliderHeight: PropTypes.number, // required for vertical carousel
        activeAnimationType: PropTypes.string,
        activeAnimationOptions: PropTypes.object,
        activeSlideAlignment: PropTypes.oneOf(['center', 'end', 'start']),
        activeSlideOffset: PropTypes.number,
        apparitionDelay: PropTypes.number,
        autoplay: PropTypes.bool,
        autoplayDelay: PropTypes.number,
        autoplayInterval: PropTypes.number,
        callbackOffsetMargin: PropTypes.number,
        containerCustomStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        contentContainerCustomStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        enableMomentum: PropTypes.bool,
        enableSnap: PropTypes.bool,
        firstItem: PropTypes.number,
        hasParallaxImages: PropTypes.bool,
        inactiveSlideOpacity: PropTypes.number,
        inactiveSlideScale: PropTypes.number,
        inactiveSlideShift: PropTypes.number,
        layout: PropTypes.oneOf(['default', 'stack', 'tinder']),
        layoutCardOffset: PropTypes.number,
        lockScrollTimeoutDuration: PropTypes.number,
        lockScrollWhileSnapping: PropTypes.bool,
        loop: PropTypes.bool,
        loopClonesPerSide: PropTypes.number,
        scrollEnabled: PropTypes.bool,
        scrollInterpolator: PropTypes.func,
        slideInterpolatedStyle: PropTypes.func,
        slideStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        shouldOptimizeUpdates: PropTypes.bool,
        swipeThreshold: PropTypes.number,
        useScrollView: PropTypes.bool,
        vertical: PropTypes.bool,
        onBeforeSnapToItem: PropTypes.func,
        onSnapToItem: PropTypes.func
    };

    static defaultProps = {
        activeAnimationType: 'timing',
        activeAnimationOptions: null,
        activeSlideAlignment: 'center',
        activeSlideOffset: 20,
        apparitionDelay: 0,
        autoplay: false,
        autoplayDelay: 5000,
        autoplayInterval: 3000,
        callbackOffsetMargin: 5,
        containerCustomStyle: {},
        contentContainerCustomStyle: {},
        enableMomentum: false,
        enableSnap: true,
        firstItem: 0,
        hasParallaxImages: false,
        inactiveSlideOpacity: 0.7,
        inactiveSlideScale: 0.9,
        inactiveSlideShift: 0,
        layout: 'default',
        lockScrollTimeoutDuration: 1000,
        lockScrollWhileSnapping: false,
        loop: false,
        loopClonesPerSide: 3,
        scrollEnabled: true,
        slideStyle: {},
        shouldOptimizeUpdates: true,
        swipeThreshold: 20,
        useScrollView: !AnimatedFlatList,
        vertical: false
    }

    constructor(props) {
        super(props);

        this.state = {
            hideCarousel: true,
            interpolators: [],
        };

        const initialActiveItem = this.getFirstItem(props.firstItem);
        this.activeItem = initialActiveItem;
        this.previousActiveItem = initialActiveItem;
        this.previousFirstItem = initialActiveItem;
        this.previousItemLength = initialActiveItem;

        this.mounted = false;
        this.positions = [];
        this.currentContentOffset = 0;
        this.canFireBeforeCallback = false;
        this.canFireCallback = false;
        this.scrollOffsetReft = null;
        this.onScrollTriggered = true;
        this.lastScrollDate = 0;
        this.scrollEnabled = props.scrollEnabled === false ? false : true;

        this.initPositionsAndInterpolators = this.initPositionsAndInterpolators.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onSnap = this.onSnap.bind(this);

        this.onLayout = this.onLayout.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onScrollBeginDrag = props.enableSnap ? this.onScrollBeginDrag.bind(this) : undefined;
        this.onScrollEnd = props.enableSnap || props.autoPlay ? this.onScrollEnd.bind(this) : undefined;
        this.onScrollEndDrag = !props.enableMomentum ? this.onScrollEndDrag.bind(this) : undefined;
        this.onMomentumScrollEnd = props.enableMomentum ? this.onMomentumScrollEnd : undefined;
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchRelease = this.onTouchRelease.bind(this);

        this.getKeyExtractor = this.getKeyExtractor.bind(this);

        const scrollEventConfig = {
          listener: this.onScroll,
          useNativeDriver: true,
        };
        this.scrollPos = new Animated.Value(0);
        this.onScrollHandler = props.vertical ?
            Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.scrollPos } } }],
                scrollEventConfig
            ) : Animated.event(
                [{ nativeEvent: { contentOffset: { x: this.scrollPos } } }],
            );

        this.ignoreNextMomentum = false;

    //    --- version warnning

    }

    componentDidMount() {
        const { apparitionDelay, autoplay, firstItem } = this.props;
        const _firstItem = this.getFirstItem(firstItem);
        const apparitionCallback = () => {
            this.setState({ hideCarousel: false });
            if (autoplay) {
                this.startAutoplay();
            }
        }

        this.mounted = true;
        this.initPositionsAndInterpolators();

        requestAnimationFrame(() => {
            if (!this.mounted) {
                return;
            }

            this.snapToItem(_firstItem, false, false, true, true);
            this.hackActiveSlideAnimation(_firstItem, 'start', true);

            if (apparitionDelay) {
                this.apparitionTimeout = setTimeout(() => {
                    apparitionCallback();
                })
            } else {
                apparitionCallback();
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.shouldOptimizeUpdate === false) {
            return true;
        } else {
            return shallowCompare(this, nextProps, nextState);
        }
    }

    // -- 这个用不到
    componentWillReceiveProps (nextProps) {
        const { interpolators } = this.state;
        const { firstItem, itemHeight, itemWidth, scrollEnabled, sliderHeight, sliderWidth } = nextProps;
        const itemLength = this.getCustomDataLength(nextProps);

        if (!itemsLength) {
            return;
        }

        const nextFirstItem = this.getFirstItem(firstItem, nextProps);
        let nextActiveItem = this.activeItem || this.activeItem === 0 ? this.activeItem : nextFirstItem;

        const hasNewSliderWidth = sliderWidth && sliderWidth !== this.props.sliderWidth;
        const hasNewSliderHeight = sliderHeight && sliderHeight !== this.props.sliderHeight;
        const hasNewItemWidth = itemWidth && itemWidth !== this.props.itemWidth;
        const hasNewItemHeight = itemHeight && itemHeight !== this.props.itemHeight;
        const hasNewScrollEnabled = scrollEnabled !== this.props.scrollEnabled;


    }

    componentWillUnmount() {
        this.mounted = false;
        this.stopAutoplay();
        clearTimeout(this.apparitionTimeout);
        clearTimeout(this.hackSlideAnimationTimeout);
        clearTimeout(this.enableAutoplayTimeout);
        clearTimeout(this.autoplayTimeout);
        clearTimeout(this.snapNoMomentumTimeout);
        clearTimeout(this.edgeItemTimeout);
        clearTimeout(this.lockScrollTimeout);
    }

    get realIndex() {
        return this.activeItem;
    }

    get currentIndex() {
        return this.getDataIndex(this.activeItem);
    }

    get currentScrollPosition() {
        return this.currentContentOffset;
    }

    needsRTLAdaptations() {
        const { vertical } = this.props;
        return IS_RTL && !IS_IOS && !vertical;
    }

    canLockScroll() {
        const { scrollEnabled, enableMomentum, lockScrollWhileSnapping } = this.props;
        return scrollEnabled && !enableMomentum && lockScrollWhileSnapping;
    }

    enableLoop() {
        const { data, enableSnap, loop } = this.props;
        return enableSnap && loop && data && data.length && data.length > 1;
    }

    shouldAnimateSlides(props = this.props) {
        const { inactiveSlideOpacity, inactiveSlideScale, scrollInterpolator, slideInterpolatedStyle } = props;
        return inactiveSlideOpacity < 1 ||
            inactiveSlideOpacity < 1 ||
            !!scrollInterpolator ||
            !!slideInterpolatedStyle ||
            this.shouldUseShiftLayout();
    }

    shouldUseCustomAnimation() {
        const { activeAnimationOptions } = this.props;
        return !!activeAnimationOptions;
    }

    shouldUseShiftLayout() {
        const { inactiveSlideShift, layout } = this.props;
        return layout === 'default' && inactiveSlideShift !== 0;
    }

    getCustomData(props = this.props) {
        const { data, loopClonesPerSide } = props;
        const dataLength = data && data.length;

        if (!dataLength) {
            return [];
        }

        if (!this.enableLoop()) {
            return data;
        }

        let previousItems = [];
        let nextItems = [];

        if (loopClonesPerSide > dataLength) {
            const dataMultiplier = Math.floor(loopClonesPerSide / dataLength);
            const remainder = loopClonesPerSide % dataLength;

            for (let i = 0; i < dataMultiplier; i++) {
                previousItems.push(...data);
                nextItems.push(...data);
            }

            previousItems.unshift(...data.slice(-remainder));
            nextItems.push(...data.slice(0, remainder));
        } else {
            previousItems = data.slice(-loopClonesPerSide);
            nextItems = data.slice(0, loopClonesPerSide);
        }

        return previousItems.concat(data, nextItems);
    }

    getCustomDataLength(props = this.props) {
        const { data, loopClonesPerSide } = props;
        const dataLength = data && data.length;

        if (!dataLength) {
            return 0;
        }

        return this.enableLoop() ? dataLength + (2 * loopClonesPerSide) : dataLength;
    }

    getCustomIndex(index, props = this.props) {
        const itemsLength = this.getCustomDataLength(props);

        if (!itemsLength || (!index && index !== 0)) {
            return 0;
        }

        return this.needsRTLAdaptations() ? itemsLength - index - 1 : index;
    }

    getDataIndex(index) {
        const { data, loopClonesPerSide } = this.props;
        const dataLength = data && data.length;

        if (!this.enableLoop() || !dataLength) {
            return index;
        }

        if (index >= dataLength + loopClonesPerSide) {
            return loopClonesPerSide > dataLength ? (index - loopClonesPerSide) % dataLength : index - dataLength - loopClonesPerSide;
        } else if (index < loopClonesPerSide) {
            if (loopClonesPerSide > dataLength) {
                const baseDataIndexes = [];
                const dataIndexes = [];
                const dataMultiplier = Math.floor(loopClonesPerSide / dataLength);
                const remainder = loopClonesPerSide % dataLength;

                for (let i = 0; i < dataLength; i++) {
                    baseDataIndexes.push(i);
                }

                for (let i = 0; i < dataMultiplier; i++) {
                    dataIndexes.push(...baseDataIndexes);
                }

                dataIndexes.unshift(...baseDataIndexes.slice(-remainder));
                return dataIndexes[index];

            } else {
                return index + dataLength - loopClonesPerSide;
            }
        } else {
            return index - loopClonesPerSide;
        }

        ///  --- 444 
    }



}
