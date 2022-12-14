/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {isEmpty} from 'lodash';
import {getorderId, getOffers} from '../../../redux/actionCreater';
import {useSelector, useDispatch} from 'react-redux';
import {setStore} from '../../../redux/actions';
import {updateDepositeOrder, getWalletData} from '../../../redux/actionCreater';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';
import axios from 'axios';
import Token from '../../assets/icons/token.svg';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const AddMoney = props => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('100');
  const orderId = useSelector(({apiReducer}) => apiReducer.orderId);
  const userProfile = useSelector(({apiReducer}) => apiReducer.userProfile);
  const addMoneyOffers = useSelector(
    ({apiReducer}) => apiReducer.addMoneyOffers,
  );
  useEffect(() => {
    dispatch(getOffers({}));
  }, [dispatch]);
  const addMoneyKeyGeneration = async () => {
    dispatch(getorderId({addAmount: price}));
  };
  useEffect(() => {
    if (!isEmpty(orderId)) {
      handlePayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handlePayment = async () => {
    const url = 'https://api.cashfree.com/api/v2/cftoken/order';
    let cftoken = '';
    await axios
      .post(
        url,
        {
          orderId: orderId,
          orderAmount: price,
          orderCurrency: 'INR',
        },
        {
          headers: {
            'x-client-id': '2545614baa29ee854d5d691d7a165452',
            'x-client-secret': 'd09af8932e770c900cd280fc27213310ab31bc6f',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({data}) => {
        cftoken = data.cftoken;
      })
      .catch(e => {
        ToastAndroid.show(e.message, 750);
      });
    var env = 'PROD';
    var map = {
      orderId: orderId,
      orderAmount: price,
      appId: '2545614baa29ee854d5d691d7a165452',
      tokenData: cftoken,
      orderCurrency: 'INR',
      orderNote: 'Cash added in wallet',
      notifyUrl: 'https://test.gocashfree.com/notify',
      customerName: userProfile?.name || null,
      customerPhone: userProfile?.mobile || null,
      customerEmail: 'support@opinionverse.live',
    };
    RNPgReactNativeSDK.startPaymentWEB(map, env, result => {
      JSON.parse(result, function (key, value) {
        // Do something with the result
        if (key === 'txStatus') {
          if (value === 'SUCCESS') {
            dispatch(
              setStore({
                toggleGenericModal: false,
                orderId: '',
                toggleAddMoneyGenericModal: false,
              }),
            );

            dispatch(
              updateDepositeOrder({
                addAmount: price,
                orderId: orderId,
                paymentStatus: 'Success',
                paymentResponse: JSON.stringify(result),
              }),
            );
            setTimeout(() => {
              dispatch(getWalletData({}));
            }, 2000);
            ToastAndroid.show('OV Coins Added in your Wallet', 500);
          } else if (value === 'CANCELLED') {
            ToastAndroid.show('Payment Cancelled', 500);
          } else {
            ToastAndroid.show('Some Error Occured', 500);
          }
        }
      });
    });
  };
  return (
    <>
      <View
        style={{
          minHeight: windowHeight * 0.3,
          maxHeight: windowHeight * 0.6,
          paddingHorizontal: 16,
          paddingTop: 16,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 24,
            marginBottom: 16,
          }}>
          {'Deposit Money'}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            style={{
              height: 40,
              paddingLeft: 12,
              borderColor: '#403838',
              borderWidth: 1,
              borderRadius: 4,
            }}
            keyboardType={'number-pad'}
            maxLength={15} //TODO: set max length
            noCharCount
            onChangeText={abc => {
              const aplha = abc.replace(/[^a-zA-Z0-9 ]/g, '');
              setPrice(aplha);
            }}
            placeholder={isEmpty(price) ? 'Enter Amount' : price}
            underlineColorAndroid={'transparent'}
            value={price}
          />
          <FlatList
            data={[100, 500, 1000, 2000, 5000]}
            horizontal
            contentContainerStyle={{marginTop: 20, marginBottom: 28}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View
                style={{
                  height: 36,
                  marginRight: 8,
                  paddingHorizontal: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#969696',
                  borderWidth: 0.5,
                  borderRadius: 100,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPrice(JSON.stringify(item));
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Token width={22} height={22} />
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {` ${item}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 24,
              marginBottom: 4,
            }}>
            {'Offers'}
          </Text>
          <FlatList
            data={addMoneyOffers}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 12, paddingBottom: 80}}
            renderItem={({item}) => (
              <View
                style={{
                  marginBottom: 8,
                  padding: 12,
                  alignItems: 'flex-start',
                  borderColor: 'rgba(217, 231, 240, 1)',
                  borderWidth: 1,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}>
                  {item?.title || ''}
                </Text>
                <Text
                  style={{textAlign: 'center', color: 'black', fontSize: 14}}>
                  {item?.subtitle || ''}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => addMoneyKeyGeneration()}
            style={{
              backgroundColor: 'rgba(255, 80, 80, 1)',
              width: windowWidth - 32,
              marginVertical: 16,
              paddingVertical: 12,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>Deposit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AddMoney;
