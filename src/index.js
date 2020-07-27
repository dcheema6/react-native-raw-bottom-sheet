import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Platform,
  Dimensions,
} from "react-native";
import styles from "./style";

const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
];

class RBSheet extends Component {
  constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            isFullScreen: false,
            fullScreenHeight: Dimensions.get('window').height - props.fullScreenMarginTop,
            animatedHeight: new Animated.Value(0),
            pan: new Animated.ValueXY(),
        }

        this.createPanResponder(props)
    }

    fullScreen() {
      const { animatedHeight, fullScreenHeight } = this.state
        Animated.timing(animatedHeight, {
            toValue: fullScreenHeight,
            duration: this.props.openDuration,
            useNativeDriver: false,
        }).start()
        this.setState({ isFullScreen: true })
    }

    minimize() {
      const { animatedHeight } = this.state     
        Animated.timing(animatedHeight, {
            toValue: this.props.height,
            duration: this.props.closeDuration,
            useNativeDriver: false,
        }).start()
        this.setState({ isFullScreen: false })
    }

    setModalVisible(visible, props) {
        const {
            height,
            minClosingHeight,
            openDuration,
            closeDuration,
            onClose,
            onOpen,
        } = this.props
        const { animatedHeight, pan } = this.state
        if (visible) {
            this.setState({ modalVisible: visible })
            if (typeof onOpen === 'function') onOpen(props)
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: height,
                duration: openDuration,
            }).start()
        } else {
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: minClosingHeight,
                duration: closeDuration,
            }).start(() => {
                pan.setValue({ x: 0, y: 0 })
                this.setState({
                    modalVisible: visible,
                    animatedHeight: new Animated.Value(0),
                })

                if (typeof onClose === 'function') onClose(props)
            })
        }
    }

    createPanResponder(props) {
        const { fullScreenEnabled, closeOnDragDown, height, swipeGestureMinLength } = props
        const { pan, animatedHeight } = this.state
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown,
            onPanResponderMove: (e, gestureState) => {
                // Swiping down
                if (gestureState.dy > 0) {
                    let toValue = fullScreenHeight - gestureState.dy
                    if (!this.state.isFullScreen)
                        toValue = this.props.height - gestureState.dy
                    Animated.timing(animatedHeight, {
                        useNativeDriver: false,
                        toValue,
                        duration: 1,
                    }).start()
                }
                // Swiping up: only registered if not full screen
                else if (!this.state.isFullScreen) {
                    Animated.timing(animatedHeight, {
                        useNativeDriver: false,
                        toValue: this.props.height - gestureState.dy,
                        duration: 1,
                    }).start()
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (
                    gestureState.dy < -swipeGestureMinLength &&
                    fullScreenEnabled &&
                    !this.state.isFullScreen
                ) {
                    this.fullScreen()
                } else if (
                    this.state.isFullScreen &&
                    gestureState.dy > swipeGestureMinLength
                ) {
                    this.minimize()
                } else if (
                    !this.state.isFullScreen &&
                    gestureState.dy > swipeGestureMinLength
                ) {
                    this.setModalVisible(false)
                } else {
                    Animated.spring(animatedHeight, {
                        toValue: this.props.height,
                        useNativeDriver: false,
                    }).start()
                }
            },
        })
    }

    open(props) {
        this.setModalVisible(true, props)
    }

    close(props) {
        this.setModalVisible(false, props)
    }

    render() {
        const {
            animationType,
            closeOnDragDown,
            dragFromTopOnly,
            closeOnPressMask,
            closeOnPressBack,
            children,
            customStyles,
            keyboardAvoidingViewEnabled,
        } = this.props
        const { animatedHeight, pan, modalVisible } = this.state
        const panStyle = {
            transform: pan.getTranslateTransform(),
        }

        return (
            <Modal
                transparent
                animationType={animationType}
                visible={modalVisible}
                supportedOrientations={SUPPORTED_ORIENTATIONS}
                onRequestClose={() => {
                    if (closeOnPressBack) this.setModalVisible(false)
                }}
            >
                <KeyboardAvoidingView
                    enabled={keyboardAvoidingViewEnabled}
                    behavior="padding"
                    style={[styles.wrapper, customStyles.wrapper]}
                >
                    <TouchableOpacity
                        style={styles.mask}
                        activeOpacity={1}
                        onPress={() => (closeOnPressMask ? this.close() : null)}
                    />
                    <Animated.View
                        {...(!dragFromTopOnly && this.panResponder.panHandlers)}
                        style={[
                            panStyle,
                            styles.container,
                            { height: animatedHeight },
                            customStyles.container,
                        ]}
                    >
                        {closeOnDragDown && (
                            <View
                                {...(dragFromTopOnly &&
                                    this.panResponder.panHandlers)}
                                style={styles.draggableContainer}
                            >
                                <View
                                    style={[
                                        styles.draggableIcon,
                                        customStyles.draggableIcon,
                                    ]}
                                />
                            </View>
                        )}
                        {children}
                    </Animated.View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}

RBSheet.propTypes = {
  animationType: PropTypes.oneOf(["none", "slide", "fade"]),
  height: PropTypes.number,
  fullScreenMarginTop: PropTypes.number,
  minClosingHeight: PropTypes.number,
  swipeGestureMinLength: PropTypes.number,
  openDuration: PropTypes.number,
  closeDuration: PropTypes.number,
  fullScreenEnabled: PropTypes.bool,
  closeOnDragDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  dragFromTopOnly: PropTypes.bool,
  closeOnPressBack: PropTypes.bool,
  keyboardAvoidingViewEnabled: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  children: PropTypes.node
};

RBSheet.defaultProps = {
  animationType: "none",
  height: 260,
  fullScreenMarginTop: 0,
  minClosingHeight: 0,
  swipeGestureMinLength: 150,
  openDuration: 300,
  closeDuration: 200,
  fullScreenEnabled: true,
  closeOnDragDown: false,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === "ios",
  customStyles: {},
  onClose: null,
  onOpen: null,
  children: <View />
};

export default RBSheet;
