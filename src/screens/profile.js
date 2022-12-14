/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getProfileTradeData} from '../../redux/actionCreater';
import Token from '../assets/icons/token.svg';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(({apiReducer}) => apiReducer.userProfile);
  const userProfileTrades = useSelector(
    ({apiReducer}) => apiReducer.userProfileTrades,
  );
  useEffect(() => {
    dispatch(getProfileTradeData());
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() => navigation.navigate('ProfileEdit')}
          style={{color: 'red'}}>
          Edit
        </Text>
      ),
    });
  }, []);

  const progressCard = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginHorizontal: 20,
          justifyContent: 'space-between',
          marginTop: 20,
          paddingVertical: 15,
          paddingHorizontal: 25,
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: 'rgba(255, 80, 80, 1)',
              fontSize: 19,
              fontWeight: '700',
            }}>
            {userProfileTrades?.tradesDone || 0}
          </Text>
          <Text style={{color: 'rgba(150, 150, 150, 1)'}}>Opinions</Text>
        </View>
        <View
          style={{
            height: 30,
            width: 2,
            backgroundColor: 'rgba(230, 230, 230, 1)',
          }}
        />
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Token width={22} height={22} />
            <Text
              style={{
                color: 'rgba(255, 80, 80, 1)',
                fontSize: 19,
                fontWeight: '700',
              }}>
              {userProfileTrades?.winnings || 0}
            </Text>
          </View>
          <Text style={{color: 'rgba(150, 150, 150, 1)'}}>Winnings</Text>
        </View>
        <View
          style={{
            height: 30,
            width: 2,
            backgroundColor: 'rgba(230, 230, 230, 1)',
          }}
        />

        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: 'rgba(255, 80, 80, 1)',
              fontSize: 19,
              fontWeight: '700',
            }}>
            {userProfileTrades?.winRate || 0}
          </Text>
          <Text style={{color: 'rgba(150, 150, 150, 1)'}}>Win Rate %</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: 'white', // 'rgba(255, 80, 80, .6)',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            top: 130,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: userProfile?.image || '',
              // uri: 'https://opinionverse.s3.ap-south-1.amazonaws.com/all.png',
            }}
            style={{
              height: 155,
              width: 155,
              borderRadius: 100,
              marginRight: 12,
              borderWidth: 15,
              borderColor: 'white',
              marginBottom: 10,
            }}
          />
          <Text style={{color: 'rgba(255, 80, 80, 1)', fontSize: 18}}>
            {userProfile.username}
          </Text>
          <Text>{userProfile.mobile}</Text>
        </View>
      </View>
      <View style={{marginTop: 208}} />
      {progressCard()}
      {/* {editProfilePopUp()} */}
    </View>
  );
};

export default ProfileScreen;
