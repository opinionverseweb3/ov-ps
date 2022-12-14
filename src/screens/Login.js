/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {useDispatch, useSelector} from 'react-redux';
import {
  authenticateUser,
  checkUserLoggedIn,
  getAppPreferences,
  getOTP,
  getUserProfile,
} from '../../redux/actionCreater';
import {setStore} from '../../redux/actions';
import Token from '../assets/icons/token.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
  },
  phoneInputTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(64, 56, 56, 1)',
    // marginBottom: 20,
  },
  phoneField: {
    backgroundColor: '#F0F0F0',
    height: 44,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  disclaimer: {
    fontSize: 10,
    color: '#969696',
    marginTop: 10,
    fontFamily: 'Roboto-Regular',
  },
  underlineStyleBase: {
    backgroundColor: 'rgba(64, 56, 56, .1)',
    color: 'black',
    fontWeight: '600',
  },
});

const renderItem = ({item, index}) => {
  return (
    <Image
      style={{
        height: windowHeight * 0.4,
        width: windowWidth,
        resizeMode: 'contain',
      }}
      source={{
        uri: item,
      }}
    />
  );
};

const RenderSlider = () => {
  const bannerArray = [
    'https://opinionverse.s3.ap-south-1.amazonaws.com/login_banner_1.png',
    'https://opinionverse.s3.ap-south-1.amazonaws.com/2.png',
    'https://opinionverse.s3.ap-south-1.amazonaws.com/3.png',
  ];
  return (
    <View
      style={{
        height: windowHeight * 0.5,
        width: windowWidth,
      }}>
      <FlatList
        data={bannerArray}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  );
};

const Login = props => {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const referralCode = useSelector(({apiReducer}) => apiReducer.referralCode);
  const dispatch = useDispatch();
  const onBackPress = () => {
    setShowOtp(false);
    return true;
  };

  useEffect(() => {
    dispatch(checkUserLoggedIn());
    dispatch(getAppPreferences());
    dispatch(getUserProfile());
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOTPInput = () => {
    return (
      <View style={{paddingHorizontal: 25}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'rgba(64, 56, 56, 1)',
          }}>
          Enter the 6-digit code sent you at
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'rgba(255, 80, 80, 1)',
              fontSize: 16,
              fontWeight: '600',
            }}>
            +91 {phoneNo}
          </Text>
          <TouchableOpacity onPress={() => setShowOtp(false)}>
            <Text
              style={{
                color: 'rgba(255, 80, 80, 1)',
                fontSize: 16,
                fontWeight: '600',
              }}>
              Edit Number
            </Text>
          </TouchableOpacity>
        </View>
        <OTPInputView
          style={{height: 100}}
          pinCount={6}
          code={enteredOtp}
          onCodeChanged={code => setEnteredOtp(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          editable
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'rgba(64, 56, 56, 1)',
            }}>
            Didn’t receive the code? {''}
          </Text>

          <TouchableOpacity onPress={() => dispatch(getOTP(phoneNo))}>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255, 80, 80, 1)',
                fontWeight: 'bold',
              }}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            dispatch(authenticateUser(phoneNo, enteredOtp, referralCode))
          }
          style={{
            backgroundColor:
              enteredOtp.length !== 6
                ? 'rgba(64, 56, 56, .4)'
                : 'rgba(255, 80, 80, 1)',

            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 20,
          }}>
          <Text style={{color: 'white'}}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handelUserLogin = () => {
    setShowOtp(true);
    dispatch(getOTP(phoneNo));
  };

  const renderPhoneNumberInput = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={styles.phoneInputTitle}>Signup and get </Text>
          <Token width={22} height={22} />
          <Text style={styles.phoneInputTitle}> 500 Bonus</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.phoneField}>
            <Text>+91</Text>
          </View>
          <View
            style={[
              styles.phoneField,
              {
                flex: 1,
                marginLeft: 4,
                alignItems: 'flex-start',
                paddingLeft: 20,
              },
            ]}>
            <TextInput
              keyboardType="number-pad"
              placeholder={'Mobile Number'}
              value={phoneNo}
              onChangeText={onPhoneNumberChange}
            />
          </View>
        </View>
        {phoneNo.length >= 10 && (
          <TouchableOpacity
            onPress={() => {
              dispatch(
                setStore({
                  showReferral: true,
                }),
              );
            }}>
            <Text
              style={[
                styles.disclaimer,
                {fontWeight: 'bold', color: 'rgba(255, 80, 80, 1)'},
              ]}>
              Do you have referral code ? Click here.
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.disclaimer}>
          By continuing, I hereby confirm that I am 18 years or above and I’m
          not resident/playing from Andhra Pradesh, Assam , Nagaland, Odisha ,
          Sikkim or Telangana. By signing up, I agree to the terms of services,
          Fairplay policy & Privacy Policy
        </Text>

        <TouchableOpacity
          disabled={phoneNo.length < 10}
          onPress={handelUserLogin}
          style={{
            backgroundColor:
              phoneNo.length < 10
                ? 'rgba(64, 56, 56, .4)'
                : 'rgba(255, 80, 80, 1)',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 30,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPhoneNumberChange = number => {
    if (number.length < 10) {
      setPhoneNo(number);
    } else if (number.length === 10) {
      setPhoneNo(number);
      dispatch(setStore({phoneNo}));
    }
  };
  return (
    <ScrollView contentContainerStyle={{height: windowHeight}}>
      <RenderSlider />
      <View
        style={{
          paddingVertical: 16,
          backgroundColor: 'white',
          elevation: 3,
          borderTopWidth: 1,
          borderColor: 'rgba(64, 56, 56, .1)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!showOtp ? renderPhoneNumberInput() : renderOTPInput()}
      </View>
    </ScrollView>
  );
};

export default Login;
