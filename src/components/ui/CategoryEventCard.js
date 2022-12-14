/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {isArray} from 'lodash';
import {setStore} from '../../../redux/actions';
import Token from '../../assets/icons/token.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buySellContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  pollDetails: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pollDetailsContainer: {
    flex: 0.5,
  },
  headerText: {
    fontSize: 16,
    color: '#000000',
  },
});

const renderOptions = ({
  item,
  dispatch,
  showpercentage,
  selectedOption,
  disbaleOptionOnPress,
}) => {
  const investmentOfUser = Number(item?.entry_fee_coins);
  return (
    <>
      {isArray(item?.Options) &&
        item?.Options.map((obj, index) => {
          let displayPercentage =
            selectedOption?.id === obj?.id
              ? Math.round(
                  ((obj?.total_invested_coin + investmentOfUser) /
                    (item?.coinPoolValue + investmentOfUser)) *
                    100,
                )
              : Math.round(
                  (obj?.total_invested_coin /
                    (item?.coinPoolValue + investmentOfUser)) *
                    100,
                );
          if (!displayPercentage) {
            displayPercentage = 0;
          }
          return (
            <TouchableOpacity
              key={index}
              disabled={disbaleOptionOnPress}
              onPress={() => {
                dispatch(
                  setStore({
                    selectedEvent: item,
                    showPopUp: true,
                    selectedOption: obj,
                  }),
                );
              }}
              style={{
                borderWidth: 2,
                borderRadius: 5,
                marginBottom: 8,
                flexDirection: 'row',
                borderColor: 'rgba(201, 198, 195, 1)',
                backgroundColor: 'white',
                height: 30,
              }}>
              <View
                style={{
                  backgroundColor:
                    showpercentage && selectedOption?.id === obj?.id
                      ? '#BFD9FF'
                      : 'white',
                  width: `${displayPercentage}%`,
                  height: '100%',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '100%',
                  paddingHorizontal: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {selectedOption?.id === obj?.id && showpercentage && (
                    <Icon
                      name="checkcircle"
                      size={18}
                      color={'#FF5050'}
                      style={{marginRight: 8}}
                    />
                  )}
                  <Text
                    style={[
                      {color: 'rgba(0, 0, 0, 1)'},
                      selectedOption?.id === obj?.id && showpercentage
                        ? {fontWeight: 'bold'}
                        : {},
                    ]}>
                    {obj?.name}
                  </Text>
                </View>
                {showpercentage && (
                  <Text
                    style={{
                      color: '#85B6FF',
                    }}>{`${displayPercentage}%`}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
    </>
  );
};

const CategoryEventCard = ({
  item,
  showBottomInfo = false,
  showpercentage = false,
  disbaleOptionOnPress = false,
  showShadow = true,
  index,
}) => {
  const {
    name = '',
    image,
    hashtag,
    coinPoolValue,
    id,
    Options = [],
    end_date_time,
    userTotalWinning = 0,
    totalBids,
    multiplier: multiplerValue = 1,
  } = item;
  let multiplier = multiplerValue || 1;
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    ({apiReducer}) => apiReducer.selectedOption,
  );
  // const randomInteger = useSelector(({apiReducer}) => apiReducer.randomInteger);
  let totalInvestmnt = 0;
  Options.map(item => {
    return (totalInvestmnt += Number(item?.user_total_invested_amount || 0));
  });
  const endTime = moment(end_date_time).unix() * 1000;
  const differenceTime = moment.duration(
    moment(endTime).diff(moment(new Date().getTime())),
  );
  const getTimer = differenceTime => {
    let time = '';
    const days = differenceTime.days();
    const hours = differenceTime.hours();
    const minutes = differenceTime.minutes();
    const seconds = differenceTime.seconds();

    const daysRemaining = days > 0 ? `${days}d ` : '';
    const hoursRemaining = `${hours > 0 ? `${hours}h` : '00h'}`;
    const minutesRemaining = `${minutes > 0 ? `:${minutes}m` : ':00m'}`;
    const secondsRemaining =
      minutes > 0 || hours > 0 ? `:${seconds}s ` : `${seconds}s `;
    const timeLeft = ' left';

    if (days > 0) {
      time = `${daysRemaining}${hoursRemaining}${minutesRemaining}${timeLeft}`;
    } else if (hours > 0 || minutes > 0) {
      time = `${hoursRemaining}${minutesRemaining}${
        true ? secondsRemaining : ''
      }${timeLeft}`;
    } else if (seconds > 0) {
      time = `${secondsRemaining}${timeLeft}`;
    } else {
      time = 'Ended';
    }
    return time;
  };
  const time = getTimer(differenceTime);

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={showpercentage || disbaleOptionOnPress}
      onPress={() => {
        dispatch(
          setStore({
            selectedEvent: item,
          }),
        );
        navigation.navigate('Poll Details');
      }}>
      <View
        key={id}
        style={[
          showShadow ? {elevation: 4, shadowColor: '#E0E5E9'} : {},
          {
            backgroundColor: 'white',
            borderRadius: 4,
            paddingBottom: 12,
            paddingTop:
              item?.bonus_percentage && item?.bonus_percentage > 0 ? 26 : 12,
            paddingHorizontal: 16,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginBottom: 4,
          }}>
          <Image
            style={styles.headerImage}
            source={{
              uri: image,
            }}
            resizeMethod={'scale'}
            resizeMode={'stretch'}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 20,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.headerText}>{name}</Text>
            <Text
              style={{
                color: '#939393',
                fontSize: 12,
              }}>
              {hashtag}
            </Text>
          </View>
        </View>
        {renderOptions({
          item,
          dispatch,
          disbaleOptionOnPress: disbaleOptionOnPress,
          showpercentage: showpercentage,
          selectedOption: selectedOption,
        })}

        {showBottomInfo && (
          <View style={styles.pollDetails}>
            {!disbaleOptionOnPress && (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#FFEBEB',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 4,
                }}>
                <Icon name="clockcircleo" size={16} color="#FF5050" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    marginLeft: 8,
                    color: '#000000',
                  }}>
                  {time}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#F9F9F9',
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 4,
                alignItems: 'center',
              }}>
              <Token width={22} height={22} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#000000',
                  marginLeft: 5,
                }}>
                {disbaleOptionOnPress
                  ? totalInvestmnt
                  : coinPoolValue * multiplier}
              </Text>
            </View>
            {disbaleOptionOnPress ? (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F9F9F9',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 4,
                  alignItems: 'center',
                }}>
                <Token width={22} height={22} />
                <Text style={{fontSize: 12, color: '#000000', marginLeft: 5}}>
                  {`${userTotalWinning} Won`}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F9F9F9',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 4,
                }}>
                <IconIonicons
                  name="md-person-outline"
                  size={14}
                  color="#000000"
                />
                <Text style={{fontSize: 12, color: '#000000', marginLeft: 5}}>
                  {totalBids * multiplier}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      {false && item?.bonus_percentage && item?.bonus_percentage > 0 ? (
        <View
          style={{
            backgroundColor: 'rgba(255, 235, 235, 1)',
            padding: 4,
            borderRadius: 4,
            position: 'absolute',
            zIndex: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              marginLeft: 5,
            }}>
            {`Use ${item?.bonus_percentage}% Bonus Coins`}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default CategoryEventCard;
