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
import {postRedeemption} from '../../../redux/actionCreater';
import axios from 'axios';
import Token from '../../assets/icons/token.svg';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ReedemFlow = props => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('100');
  const walletData = useSelector(({apiReducer}) => apiReducer.walletData);
  const userProfile = useSelector(({apiReducer}) => apiReducer.userProfile);

  const coins_to_currency = useSelector(
    ({apiReducer}) => apiReducer.appPreference?.[0]?.coins_to_currency || 0,
  );
  const redeem_min = useSelector(
    ({apiReducer}) => apiReducer.appPreference?.[0]?.redeem_min || 0,
  );
  const redeem_max = useSelector(
    ({apiReducer}) => apiReducer.appPreference?.[0]?.redeem_max || 0,
  );
  const {
    Coins = 0,
    DepositCash = 0,
    WinningCash = 0,
    Bonus = 0,
    withdrawEnabled = false,
  } = walletData;

  const redeem = () => {
    dispatch(
      postRedeemption(
        userProfile?.id,
        parseInt(price),
        Math.round(parseInt(price) * parseFloat(coins_to_currency)),
      ),
    );
    dispatch(
      setStore({
        showReedemFlow: false,
      }),
    );
  };
  return (
    <View
      style={{
        minHeight: windowHeight * 0.3,
        maxHeight: windowHeight * 0.6,
        padding: 16,
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 24,
          marginBottom: 16,
        }}>
        {`Available OV Tokens : ${Coins}`}
      </Text>
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
      <Text style={{fontSize: 10, color: 'grey', textAlign: 'right'}}>
        Minimum Token Required : {redeem_min}
      </Text>
      <FlatList
        data={[100, 500, 1000, 2000, 5000]}
        horizontal
        contentContainerStyle={{marginVertical: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              height: 36,
              marginRight: 8,
              paddingHorizontal: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F5F5F5',
              borderRadius: 100,
            }}
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
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text
        style={{
          fontSize: 10,
          color: 'grey',
          textAlign: 'left',
          marginVertical: 10,
        }}>
        is Equal to:
      </Text>

      <Text style={{marginBottom: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 24,
          }}>
          Bonus Cash
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#FF5050',
            fontSize: 24,
          }}>{` ₹${Math.round(
          parseInt(price) * parseFloat(coins_to_currency),
        )}`}</Text>
      </Text>
      <TouchableOpacity
        onPress={redeem}
        disabled={
          !(
            parseInt(price) <= Coins &&
            parseInt(price) >= redeem_min &&
            parseInt(price) <= redeem_max
          )
        }
        style={{
          backgroundColor:
            parseInt(price) <= Coins &&
            parseInt(price) >= redeem_min &&
            parseInt(price) <= redeem_max
              ? 'rgba(255, 80, 80, 1)'
              : '#BFBFBF',
          width: windowWidth - 32,
          paddingVertical: 12,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
          Reedem Tokens
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReedemFlow;
