import React, { Component } from 'react';
import {
    Animated,
    Easing,
    FlatList,
    I18nManager,
    Platform,
    View,
    ViewPropTypes,
} from 'react-native';

import shallowCompare from 'react-addons-shallow-compare';

import PropTypes from 'prop-types';

const IS_IOS = Platform.OS === 'ios';

const IS_RTL = I18nManager.isRTL;

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
        this.scrollOffsetRef = null;
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

    // 
    componentWillReceiveProps (nextProps) {
        const { interpolators } = this.state;
        const { firstItem, itemHeight, itemWidth, scrollEnabled, sliderHeight, sliderWidth } = nextProps;
        const itemsLength = this.getCustomDataLength(nextProps);

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

        // Prevent issues with dynamically removed items
        if (nextActiveItem > itemsLength - 1) {
            nextActiveItem = itemsLength - 1;
        }

        // Handle changing scrollEnabled independent of user -> carousel interaction
        if (hasNewScrollEnabled) {
            this.setScrollEnabled(scrollEnabled);
        }

        if (interpolators.length !== itemsLength || hasNewSliderWidth ||
            hasNewSliderHeight || hasNewItemWidth || hasNewItemHeight) {
            this.activeItem = nextActiveItem;
            this.previousItemsLength = itemsLength;

            this.initPositionsAndInterpolators(nextProps);

            // Handle scroll issue when dynamically removing items (see #133)
            // This also fixes first item's active state on Android
            // Because 'initialScrollIndex' apparently doesn't trigger scroll
            if (this.previousItemsLength > itemsLength) {
                this.hackActiveSlideAnimation(nextActiveItem, null, true);
            }

            if (hasNewSliderWidth || hasNewSliderHeight || hasNewItemWidth || hasNewItemHeight) {
                this.snapToItem(nextActiveItem, false, false, false, false);
            }
        } else if (nextFirstItem !== this.previousFirstItem && nextFirstItem !== this.activeItem) {
            this.activeItem = nextFirstItem;
            this.previousFirstItem = nextFirstItem;
            this.snapToItem(nextFirstItem, true, true, false, false);
        }
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

    }


    getPositionIndex(index) {
        const { loop, loopClonesPerSide } = this.props;
        return loop ? index + loopClonesPerSide : index;
    }

    getFirstItem(index, props = this.props) {
        const { loopClonesPerSide } = props;
        const itemsLength = this.getCustomDataLength(props);

        if (!itemsLength || index > itemsLength - 1 || index < 0) {
            return 0;
        }

        return this.enableLoop() ? index + loopClonesPerSide : index;
    }

    getWrappedRef() {
        return this.carouselRef && this.carouselRef.getNode && this.carouselRef.getNode();
    }

    getScrollEnabled() {
        return this.scrollEnabled;
    }

    setScrollEnabled(scrollEnabled =  true) {
        const wrappedRef = this.getWrappedRef();

        if (!warppedRef || !wrappedRef.setNativeProps) {
            return;
        }

        wrappedRef.setNativeProps({scrollEnabled});
        this.scrollEnabled = scrollEnabled;
    }

    getKeyExtractor(item, index) {
        return `flatlist-item-${index}`;
    }

    getScrollOffset(event) {
        const { vertical } = this.props;
        return (event && event.nativeEvent && event.nativeEvent.contentOffset &&
            event.nativeEvent.contentOffset[vertical ? 'y' : 'x']) || 0;
    }

    getContainerInnerMargin(opposite = false) {
        const { sliderWidth, sliderHeight, itemWidth, itemHeight, vertical, activeSlideAlignment } = this.props;

        if ((activeSlideAlignment === 'start' && !opposite) ||
            (activeSlideAlignment === 'end' && opposite)) {
            return 0;
        } else if ((activeSlideAlignment === 'end' && !opposite) ||
            (activeSlideAlignment === 'start' && opposite)) {
            return vertical ? sliderHeight - itemHeight : sliderWidth - itemWidth;
        } else {
            return vertical ? (sliderHeight - itemHeight) / 2 : (sliderWidth - itemWidth) / 2;
        }
    }

    // -- 需要改
    getViewportOffet() {
        const { sliderWidth, sliderHeight, itemWidth, itemHeight, vertical, activeSlideAlignment } = this.props;

        if (activeSlideAlignment === 'start') {
            return vertical ? itemHeight / 2 : itemWidth / 2;
        } else if (activeSlideAlignment === 'end') {
            return vertical ?
                sliderHeight - (itemHeight / 2) :
                sliderWidth - (itemWidth / 2);
        } else {
            return vertical ? sliderHeight / 2 : sliderWidth / 2;
        }
    }

    getCenter(offset) {
        return offset + this.getViewportOffet() - this.getContainerInnerMargin();
    }

    getActiveItem(offset) {
        const { activeSlideOffset, swipeTreshold } = this.props;
        const center = this.getCenter(offset);
        const centerOffset = activeSlideOffset || swipeTreshold;

        for (let i = 0; i < this.positions.length; i++) {
            const { start, end } = this.positions[i];
            if (center + centerOffset >= start && center - centerOffset <= end) {
                return i;
            }
        }

        const lastIndex = this.positions.length - 1;
        if (this.positions[lastIndex] && center - centerOffset > this.positions[lastIndex].end) {
            return lastIndex;
        }

        return 0;
    }

    initPositionsAndInterpolators(props = this.props) {
        const { data, itemWidth, itemHeight, scrollInterpolator, vertical } = props;
        const sizeRef = vertical ? itemHeight : itemWidth;

        if (!data.length) {
            return;
        }

        let interpolators = [];
        this.positions = [];

        this.getCustomData(props).forEach((itemData, index) => {
            const _index = this.getCustomIndex(index, props);
            let animatedValue;

            this.positions[index] = {
                start: index * sizeRef,
                end: index * sizeRef + sizeRef
            };

            if (!this.shouldAnimateSlides(props)) {
                animatedValue = new Animated.Value(1);
            } else if (this.shouldUseCustomAnimation()) {
                animatedValue = new Animated.Value(_index === this.activeItem ? 1 : 0);
            } else {
                let interpolator;

                if (scrollInterpolator) {
                    interpolator = scrollInterpolator(_index, props);
                }

                if (!interpolator || !interpolator.inputRange || !interpolator.outputRange) {
                    interpolator = defaultScrollInterpolator(_index, props);
                }

                animatedValue = this.scrollPos.interpolate({
                    ...interpolator,
                    extrapolate: 'clamp'
                });
            }

            interpolators.push(animatedValue);
        });

        this.setState({ interpolators });
    }

    getSlideAnimation(index, toValue) {
        const { interpolators } = this.state;
        const { activeAnimationType, activeAnimationOptions } = this.props;

        const animatedValue = interpolators && interpolators[index];

        if (!animatedValue && animatedValue !== 0) {
            return false;
        }

        const animationCommonOptions = {
            isInteraction: false,
            useNativeDriver: true,
            ...activeAnimationOptions,
            toValue: toValue
        };

        return Animated.parallel([
            Animated['timing'](
                animatedValue,
                { ...animationCommonOptions, easing: Easing.linear }
            ),
            Animated[activeAnimationType](
                animatedValue,
                { ...animationCommonOptions }
            )
        ]);
    }

    /// --- 不需要
    playCustomSlideAnimation(current, next) {
        const { interpolators } = this.state;
        const itemsLength = this.getCustomDataLength();
        const _currentIndex = this.getCustomIndex(current);
        const _currentDataIndex = this.getDataIndex(_currentIndex);
        const _nextIndex = this.getCustomIndex(next);
        const _nextDataIndex = this.getDataIndex(_nextIndex);
        let animations = [];

        // Keep animations in sync when looping
        if (this.enableLoop()) {
            for (let i = 0; i < itemsLength; i++) {
                if (this.getDataIndex(i) === _currentDataIndex && interpolators[i]) {
                    animations.push(this.getSlideAnimation(i, 0));
                } else if (this.getDataIndex(i) === _nextDataIndex && interpolators[i]) {
                    animations.push(this.getSlideAnimation(i, 1));
                }
            }
        } else {
            if (interpolators[current]) {
                animations.push(this.getSlideAnimation(current, 0));
            }
            if (interpolators[next]) {
                animations.push(this.getSlideAnimation(next, 1));
            }
        }

        Animated.parallel(animations, { stopTogether: false }).start();
    }

    hackActiveSlideAnimation(index, goTo, force = false) {
        const { data } = this.props;

        if (!this.mounted || !this.carouselRef || !this.positions[index] || (!force && this.enableLoop())) {
            return;
        }

        const offset = this.positions[index] && this.positions[index].start;

        if (!offset && offset !== 0) {
            return;
        }

        const itemsLength = data && data.length;
        const direction = goTo || itemsLength === 1 ? 'start' : 'end';

        this.scrollTo(offset + (direction === 'start' ? -1 : 1), false);

        clearTimeout(this.hackSlideAnimationTimeout);
        this.hackSlideAnimationTimeout = setTimeout(() => {
            this.scrollTo(offset, false);
        }, 50);
    }

    lockScroll() {
        const { lockScrollTimeoutDuration } = this.props;
        clearTimeout(this.lockScrollTimeout);
        this.lockScrollTimeout = setTimeout(() => {
            this.releaseScroll();
        }, lockScrollTimeoutDuration);
        this.setScrollEnabled(false);
    }

    releaseScroll() {
        clearTimeout(this.lockScrollTimeout);
        this.setScrollEnabled(true);
    }

    repositionScroll(index) {
        const {data, loopClonesPerSide } = this.props;
        const dataLength = data && data.length;

        if (!this.enableLoop() || !dataLength ||
            (index >= loopClonesPerSide && index < dataLength + loopClonesPerSide)) {
            return;
        }

        let repositionTo = index;

        if (index >= dataLength + loopClonesPerSide) {
            repositionTo = index - dataLength;
        } else if (index < loopClonesPerSide) {
            repositionTo = index + dataLength;
        }

        this.snapToItem(repositionTo, false, false, false, false);
    }

    scrollTo(offset, animated = true) {
        const { vertical } = this.props;
        const wrappedRef = this.getWrappedRef();

        if (!this.mounted || !wrappedRef) {
            return;
        }

        const specificOptions = offset;
        const options = {
            ...specificOptions,
            animated
        };

        wrappedRef.scrollToOffset(options);
    }

    onScroll(event) {
        const { callbackOffsetMargin, enableMomentum, onScroll } = this.props;

        const scrollOffset = event ? this.getScrollOffset(event) : this.currentContentOffset;
        const nextActiveItem = this.getActiveItem(scrollOffset);
        const itemReached = nextActiveItem === this.itemToSnapTo;
        const scrollConditions = scrollOffset >= this.scrollOffsetRef - callbackOffsetMargin &&
            scrollOffset <= this.scrollOffsetRef + callbackOffsetMargin;

        this.currentContentOffset = scrollOffset;
        this.onScrollTriggered = true;
        this.lastScrollDate = Date.now();

        if (this.activeItem !== nextActiveItem && this.shouldUseCustomAnimation()) {

        }

        if (enableMomentum) {
            clearTimeout(this.snapNoMomentumTimeout);

            if (this.activeItem !== nextActiveItem) {
                this.activeItem = nextActiveItem;
            }

            if (itemReached) {
                if (this.canFireBeforeCallback) {
                    this.onBeforeSnap(this.getDataIndex(nextActiveItem));
                }

                if (scrollConditions && this.canFireCallback) {
                    this.onSnap(this.getDataIndex(nextActiveItem));
                }
            }
        } else if (this.activeItem !== nextActiveItem && itemReached) {
            if (this.canFireBeforeCallback) {
                this.onBeforeSnap(this.getDataIndex(nextActiveItem));
            }

            if (scrollConditions) {
                this.activeItem = nextActiveItem;

                if (this.canLockScroll()) {
                    this.releaseScroll();
                }

                if (this.canFireCallback) {
                    this.onSnap(this.getDataIndex(nextActiveItem));
                }
            }
        }

        if (nextActiveItem === this.itemToSnapTo &&
            scrollOffset === this.scrollOffsetRef) {
            this.repositionScroll(nextActiveItem);
        }

        if (onScroll && event) {
            onScroll(event);
        }
    }

    onStartShouldSetResponderCapture(event) {
        const { onStartShouldSetResponderCapture } = this.props;

        if (onStartShouldSetResponderCapture) {
            onStartShouldSetResponderCapture(event);
        }

        return this.getScrollEnabled();
    }

    onTouchStart() {
        if (this.getScrollEnabled() !== false && this.autoplaying) {
            this.stopAutoplay();
        }
    }

    onScrollBeginDrag(event) {
        const { onScrollBeginDrag } = this.props;

        if (!this.getScrollEnabled()) {
            return;
        }

        this.scrollStartOffset = this.getScrollOffset(event);
        this.scrollStartActive = this.getActiveItem(this.scrollStartOffset);
        this.ignoreNextMomentum = false;

        if (onScrollBeginDrag) {
            onScrollBeginDrag(event);
        }
    }

    onScrollEndDrag(event) {
        const { onScrollEndDrag } = this.props;

        if (this.carouselRef) {
            this.onScrollEnd && this.onScrollEnd();
        }

        if (onScrollEndDrag) {
            onScrollEndDrag(event);
        }
    }

    onMomentumScrollEnd(event) {
        const { onMomentumScrollEnd } = this.props;

        if (this.carouselRef) {
            this.onScrollEnd && this.onScrollEnd();
        }

        if (onMomentumScrollEnd) {
            onMomentumScrollEnd(event);
        }
    }

    onScrollEnd(event) {
        const { autoplay, enableSnap } = this.props;

        if (this.ignoreNextMomentum) {
            this.ignoreNextMomentum = false;
            return;
        }

        this.scrollEndOffset = this.currentContentOffset;
        this.scrollEndActive = this.getActiveItem(this.scrollEndOffset);

        if (enableSnap) {
            this.snapScroll(this.scrollEndOffset - this.scrollStartOffset);
        }

        if (autoplay) {
            // Restart autoplay after a little while
            // This could be done when releasing touch
            // but the event is buggy on Android...
            // https://github.com/facebook/react-native/issues/9439
            clearTimeout(this.enableAutoplayTimeout);
            this.enableAutoplayTimeout = setTimeout(() => {
                this.startAutoplay();
            }, 300);
        }
    }

    onTouchRelease(event) {
        const { enableMomentum } = this.props;

        if (enableMomentum && IS_IOS) {
            clearTimeout(this.snapNoMomentumTimeout);
            this.snapNoMomentumTimeout = setTimeout(() => {
                this.snapToItem(this.activeItem);
            }, 100);
        }
    }

    onLayout(event) {
        const { onLayout } = this.props;

        // Prevent unneeded actions during the first 'onLayout' (triggered on init)
        if (this.onLayoutInitDone) {
            this.initPositionsAndInterpolators();
            this.snapToItem(this.activeItem, false, false, false, false);
        } else {
            this.onLayoutInitDone = true;
        }

        if (onLayout) {
            onLayout(event);
        }
    }

    snapScroll(delta) {
        const { swipeThreshold } = this.props;

        // When using momentum and releasing the touch with
        // no velocity, scrollEndActive will be undefined (iOS)
        if (!this.scrollEndActive && this.scrollEndActive !== 0 && IS_IOS) {
            this.scrollEndActive = this.scrollStartActive;
        }

        if (this.scrollStartActive !== this.scrollEndActive) {
            // Snap to the new active item
            this.snapToItem(this.scrollEndActive);
        } else {
            // Snap depending on delta
            if (delta > 0) {
                if (delta > swipeThreshold) {
                    this.snapToItem(this.scrollStartActive + 1);
                } else {
                    this.snapToItem(this.scrollEndActive);
                }
            } else if (delta < 0) {
                if (delta < -swipeThreshold) {
                    this.snapToItem(this.scrollStartActive - 1);
                } else {
                    this.snapToItem(this.scrollEndActive);
                }
            } else {
                // Snap to current
                this.snapToItem(this.scrollEndActive);
            }
        }
    }

    snapToItem (index, animated = true, fireCallback = true, initial = false, lockScroll = true) {
        const { enableMomentum, onSnapToItem, onBeforeSnapToItem } = this.props;
        const itemsLength = this.getCustomDataLength();
        const wrappedRef = this.getWrappedRef();

        if (!itemsLength || !wrappedRef) {
            return;
        }

        if (!index || index < 0) {
            index = 0;
        } else if (itemsLength > 0 && index >= itemsLength) {
            index = itemsLength - 1;
        }

        if (index !== this.previousActiveItem) {
            this.previousActiveItem = index;

            // Placed here to allow overscrolling for edges items
            if (lockScroll && this.canLockScroll()) {
                this.lockScroll();
            }

            if (fireCallback) {
                if (onBeforeSnapToItem) {
                    this.canFireBeforeCallback = true;
                }

                if (onSnapToItem) {
                    this.canFireCallback = true;
                }
            }
        }

        this.itemToSnapTo = index;
        this.scrollOffsetRef = this.positions[index] && this.positions[index].start;
        this.onScrollTriggered = false;

        if (!this.scrollOffsetRef && this.scrollOffsetRef !== 0) {
            return;
        }

        this.scrollTo(this.scrollOffsetRef, animated);

        if (enableMomentum) {
            // iOS fix, check the note in the constructor
            if (IS_IOS && !initial) {
                this.ignoreNextMomentum = true;
            }

            // When momentum is enabled and the user is overscrolling or swiping very quickly,
            // 'onScroll' is not going to be triggered for edge items. Then callback won't be
            // fired and loop won't work since the scrollview is not going to be repositioned.
            // As a workaround, '_onScroll()' will be called manually for these items if a given
            // condition hasn't been met after a small delay.
            // WARNING: this is ok only when relying on 'momentumScrollEnd', not with 'scrollEndDrag'
            if (index === 0 || index === itemsLength - 1) {
                clearTimeout(this.edgeItemTimeout);
                this.edgeItemTimeout = setTimeout(() => {
                    if (!initial && index === this.activeItem && !this.onScrollTriggered) {
                        this.onScroll();
                    }
                }, 250);
            }
        }
    }

    onBeforeSnap(index) {
        const { onBeforeSnapToItem } = this.props;

        if (!this.carouselRef) {
            return;
        }

        this.canFireBeforeCallback = false;
        onBeforeSnapToItem && onBeforeSnapToItem(index);
    }

    onSnap(index) {
        const { onSnapToItem } = this.props;

        if (!this.carouselRef) {
            return;
        }

        this.canFireCallback = false;
        onSnapToItem && onSnapToItem(index);
    }

    startAutoplay() {
        const { autoplayInterval, autoplayDelay } = this.props;

        if (this.autoplaying) {
            return;
        }

        clearTimeout(this.autoplayTimeout);
        this.autoplayTimeout = setTimeout(() => {
            this.autoplaying = true;
            this.autoplayInterval = setInterval(() => {
                if (this.autoplaying) {
                    this.snapToNext();
                }
            }, autoplayInterval);
        }, autoplayDelay);
    }

    stopAutoplay() {
        this.autoplaying = false;
        clearInterval(this.autoplayInterval);
    }

    _snapToItem(index, animated = true, fireCallback = true) {
        if (!index || index < 0) {
            index = 0;
        }

        const positionIndex = this.getPositionIndex(index);

        if (positionIndex === this.activeItem) {
            return;
        }

        this.snapToItem(positionIndex, animated, fireCallback);
    }

    snapToNext (animated = true, fireCallback = true) {
        const itemsLength = this.getCustomDataLength();

        let newIndex = this.activeItem + 1;
        if (newIndex > itemsLength - 1) {
            if (!this.enableLoop()) {
                return;
            }
            newIndex = 0;
        }
        this.snapToItem(newIndex, animated, fireCallback);
    }

    snapToPrev (animated = true, fireCallback = true) {
        const itemsLength = this.getCustomDataLength();

        let newIndex = this.activeItem - 1;
        if (newIndex < 0) {
            if (!this.enableLoop()) {
                return;
            }
            newIndex = itemsLength - 1;
        }
        this.snapToItem(newIndex, animated, fireCallback);
    }

    // https://github.com/facebook/react-native/issues/1831#issuecomment-231069668
    triggerRenderingHack (offset) {
        // Avoid messing with user scroll
        if (Date.now() - this.lastScrollDate < 500) {
            return;
        }

        const scrollPosition = this.currentContentOffset;
        if (!scrollPosition && scrollPosition !== 0) {
            return;
        }

        const scrollOffset = offset || (scrollPosition === 0 ? 1 : -1);
        this.scrollTo(scrollPosition + scrollOffset, false);
    }

    getSlideInterpolatedStyle (index, animatedValue) {
        const { layoutCardOffset, slideInterpolatedStyle } = this.props;

        if (slideInterpolatedStyle) {
            return slideInterpolatedStyle(index, animatedValue, this.props);
        } else if (this.shouldUseShiftLayout()) {
            return shiftAnimatedStyles(index, animatedValue, this.props);
        } else {
            return defaultAnimatedStyles(index, animatedValue, this.props);
        }
    }

    renderItem ({ item, index }) {
        const { interpolators } = this.state;
        const {
            hasParallaxImages,
            itemWidth,
            itemHeight,
            keyExtractor,
            renderItem,
            sliderHeight,
            sliderWidth,
            slideStyle,
            vertical
        } = this.props;

        const animatedValue = interpolators && interpolators[index];

        if (!animatedValue && animatedValue !== 0) {
            return false;
        }

        const animate = this.shouldAnimateSlides();
        const Component = animate ? Animated.View : View;
        const animatedStyle = animate ? this.getSlideInterpolatedStyle(index, animatedValue) : {};

        const parallaxProps = hasParallaxImages ? {
            scrollPosition: this.scrollPos,
            carouselRef: this.carouselRef,
            vertical,
            sliderWidth,
            sliderHeight,
            itemWidth,
            itemHeight
        } : undefined;

        const mainDimension = vertical ? { height: itemHeight } : { width: itemWidth };

        return (
            <Component style={[mainDimension, slideStyle, animatedStyle]} pointerEvents={'box-none'}>
                { renderItem({ item, index }, parallaxProps) }
            </Component>
        );
    }

    getComponentOverridableProps () {
        const {
            enableMomentum,
            itemWidth,
            itemHeight,
            loopClonesPerSide,
            sliderWidth,
            sliderHeight,
            vertical
        } = this.props;

        const visibleItems = Math.ceil(vertical ?
            sliderHeight / itemHeight :
            sliderWidth / itemWidth) + 1;
        const initialNumPerSide = this.enableLoop() ? loopClonesPerSide : 2;
        const initialNumToRender = visibleItems + (initialNumPerSide * 2);
        const maxToRenderPerBatch = 1 + (initialNumToRender * 2);
        const windowSize = maxToRenderPerBatch;

        const specificProps = {
            initialNumToRender: initialNumToRender,
            maxToRenderPerBatch: maxToRenderPerBatch,
            windowSize: windowSize
            // updateCellsBatchingPeriod
        };

        return {
            decelerationRate: enableMomentum ? 0.9 : 'fast',
            showsHorizontalScrollIndicator: false,
            showsVerticalScrollIndicator: false,
            overScrollMode: 'never',
            automaticallyAdjustContentInsets: false,
            directionalLockEnabled: true,
            pinchGestureEnabled: false,
            scrollsToTop: false,
            removeClippedSubviews: true,
            inverted: this.needsRTLAdaptations(),
            // renderToHardwareTextureAndroid: true,
            ...specificProps
        };
    }

    getComponentStaticProps () {
        const { hideCarousel } = this.state;
        const {
            containerCustomStyle,
            contentContainerCustomStyle,
            keyExtractor,
            sliderWidth,
            sliderHeight,
            style,
            vertical
        } = this.props;

        const containerStyle = [
            containerCustomStyle || style || {},
            hideCarousel ? { opacity: 0 } : {},
            vertical ?
                { height: sliderHeight, flexDirection: 'column' } :
                // LTR hack; see https://github.com/facebook/react-native/issues/11960
                // and https://github.com/facebook/react-native/issues/13100#issuecomment-328986423
                { width: sliderWidth, flexDirection: this.needsRTLAdaptations() ? 'row-reverse' : 'row' }
        ];
        const contentContainerStyle = [
            contentContainerCustomStyle || {},
            vertical ? {
                paddingTop: this.getContainerInnerMargin(),
                paddingBottom: this.getContainerInnerMargin(true)
            } : {
                paddingLeft: this.getContainerInnerMargin(),
                paddingRight: this.getContainerInnerMargin(true)
            }
        ];

        const specificProps = {
            // extraData: this.state,
            renderItem: this.renderItem,
            numColumns: 1,
            getItemLayout: undefined, // see #193
            initialScrollIndex: undefined, // see #193
            keyExtractor: keyExtractor || this.getKeyExtractor
        };

        return {
            ref: c => this.carouselRef = c,
            data: this.getCustomData(),
            style: containerStyle,
            contentContainerStyle: contentContainerStyle,
            horizontal: !vertical,
            scrollEventThrottle: 1,
            onScroll: this.onScrollHandler,
            onScrollBeginDrag: this.onScrollBeginDrag,
            onScrollEndDrag: this.onScrollEndDrag,
            onMomentumScrollEnd: this.onMomentumScrollEnd,
            onResponderRelease: this.onTouchRelease,
            onStartShouldSetResponderCapture: this.onStartShouldSetResponderCapture,
            onTouchStart: this.onTouchStart,
            onLayout: this.onLayout,
            ...specificProps
        };
    }

    render () {
        const { data, renderItem } = this.props;

        if (!data || !renderItem) {
            return false;
        }

        const props = {
            ...this.getComponentOverridableProps(),
            ...this.props,
            ...this.getComponentStaticProps()
        };

        return (
            <AnimatedFlatList {...props} />
        );
    }


}

// Get scroll interpolator's input range from an array of slide indexes
// Indexes are relative to the current active slide (index 0)
// For example, using [3, 2, 1, 0, -1] will return:
// [
//     (index - 3) * sizeRef, // active + 3
//     (index - 2) * sizeRef, // active + 2
//     (index - 1) * sizeRef, // active + 1
//     index * sizeRef, // active
//     (index + 1) * sizeRef // active - 1
// ]
function getInputRangeFromIndexes (range, index, carouselProps) {
    const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
    let inputRange = [];

    for (let i = 0; i < range.length; i++) {
        inputRange.push((index - range[i]) * sizeRef);
    }

    return inputRange;
}


// Default behavior
// Scale and/or opacity effect
// Based on props 'inactiveSlideOpacity' and 'inactiveSlideScale'
function defaultScrollInterpolator (index, carouselProps) {
    const range = [1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = [0, 1, 0];

    return { inputRange, outputRange };
}

function defaultAnimatedStyles (index, animatedValue, carouselProps) {
    let animatedOpacity = {};
    let animatedScale = {};

    if (carouselProps.inactiveSlideOpacity < 1) {
        animatedOpacity = {
            opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [carouselProps.inactiveSlideOpacity, 1]
            })
        };
    }

    if (carouselProps.inactiveSlideScale < 1) {
        animatedScale = {
            transform: [{
                scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [carouselProps.inactiveSlideScale, 1]
                })
            }]
        };
    }

    return {
        ...animatedOpacity,
        ...animatedScale
    };
}

// Shift animation
// Same as the default one, but the active slide is also shifted up or down
// Based on prop 'inactiveSlideShift'
function shiftAnimatedStyles (index, animatedValue, carouselProps) {
    let animatedOpacity = {};
    let animatedScale = {};
    let animatedTranslate = {};

    if (carouselProps.inactiveSlideOpacity < 1) {
        animatedOpacity = {
            opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [carouselProps.inactiveSlideOpacity, 1]
            })
        };
    }

    if (carouselProps.inactiveSlideScale < 1) {
        animatedScale = {
            scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [carouselProps.inactiveSlideScale, 1]
            })
        };
    }

    if (carouselProps.inactiveSlideShift !== 0) {
        const translateProp = carouselProps.vertical ? 'translateX' : 'translateY';
        animatedTranslate = {
            [translateProp]: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [carouselProps.inactiveSlideShift, 0]
            })
        };
    }

    return {
        ...animatedOpacity,
        transform: [
            { ...animatedScale },
            { ...animatedTranslate }
        ]
    };
}
