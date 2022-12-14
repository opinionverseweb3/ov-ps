/* eslint-disable */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ToastAndroid,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {setStore} from '../../../redux/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {postReferralCode} from '../../../redux/actionCreater';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  phoneInputTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(64, 56, 56, 1)',
    marginBottom: 20,
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

const ApplyReferral = ({code, phoneNo}) => {
  const dispatch = useDispatch();
  const [referralCode, setReferralCode] = useState(code);
  const cb = useRef(false);
  const onApply = () => {
    dispatch(postReferralCode(referralCode, phoneNo));
  };
  const onReferralChane = code => {
    setReferralCode(code);
  };

  useEffect(() => {
    if (!cb.current && !!referralCode) {
      onApply();
      cb.current = true;
    }
  }, []);

  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}>
      <Text style={styles.phoneInputTitle}>
        Enter your referral code and click on Apply to validate
      </Text>
      <Image
        source={require('../../assets/images/referral_img.jpeg')}
        style={{
          width: '100%',
          height: 200,
          backgroundColor: 'red',
          marginBottom: 10,
        }}
        resizeMode={'stretch'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.phoneField,
            {
              flex: 1,
              marginRight: 4,
              alignItems: 'flex-start',
              paddingLeft: 20,
            },
          ]}>
          <TextInput
            keyboardType="ascii-capable"
            placeholder={'Referral Code'}
            value={referralCode}
            onChangeText={onReferralChane}
          />
        </View>
        <TouchableOpacity
          onPress={!!referralCode ? onApply : null}
          style={[
            styles.phoneField,
            {
              backgroundColor: !referralCode
                ? 'rgba(64, 56, 56, .4)'
                : 'rgba(255, 80, 80, 1)',
            },
          ]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApplyReferral;
