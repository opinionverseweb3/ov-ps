/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Dimensions,
  Animated,
  Easing,
  BackHandler,
  View,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class GenericPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupPosition: new Animated.Value(height),
      popupOpacity: new Animated.Value(0.5),
      backgroundOpacity: new Animated.Value(0.5),
      loading: false,
    };
  }

  onBackPress = () => {
    this.closeModal();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  openModal = () => {
    Animated.parallel([
      Animated.timing(this.state.popupPosition, {
        toValue: 0,
        easing: Easing.out(Easing.quad),
        duration: 300,
        useNativeDriver: true,
      }).start(),
      Animated.timing(this.state.popupOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  componentDidMount() {
    Animated.timing(this.state.backgroundOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      this.openModal();
    });
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  closeModal = () => {
    const {closeModal = () => {}} = this.props;
    Animated.parallel([
      Animated.timing(this.state.popupPosition, {
        toValue: height,
        easing: Easing.out(Easing.quad),
        duration: 300,
        useNativeDriver: true,
      }).start(),
      Animated.timing(this.state.popupOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.backgroundOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  render() {
    const {showCloseButton = false, backgroundColor = ''} = this.props;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
          backgroundColor: backgroundColor
            ? backgroundColor
            : 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'flex-end',
          opacity: this.state.backgroundOpacity,
        }}>
        <Animated.View
          // onPress={this.closeModal}
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            transform: [{translateY: this.state.popupPosition}],
            justifyContent: 'flex-end',
            flex: 1,
          }}>
          <View
            style={{
              height,
              width,
              justifyContent: 'flex-end',
            }}>
            {showCloseButton && (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 36,
                  width: 36,
                  borderRadius: 18,
                  alignSelf: 'flex-end',
                  backgroundColor: 'rgba(255,255,255,0.22)',
                  marginBottom: 12,
                  marginRight: 12,
                }}
                onPress={() => this.closeModal()}>
                <Icon name="closecircleo" size={32} color={'white'} />
              </TouchableOpacity>
            )}
            <View
              style={{
                alignSelf: 'flex-end',
                width,
                backgroundColor: backgroundColor ? backgroundColor : 'white',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                overflow: 'hidden',
                maxHeight: height * 0.8,
              }}>
              <View>{this.props.children}</View>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default GenericPopup;
