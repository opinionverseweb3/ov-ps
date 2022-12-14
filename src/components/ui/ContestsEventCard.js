/* eslint-disable */
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {isArray} from 'lodash';
import {setStore} from '../../../redux/actions';
import {priceInWords} from '../../util/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  buySellContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  pollDetails: {
    flexDirection: 'row',
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pollDetailsContainer: {
    flex: 0.5,
  },
  detailsBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  shadowBorder: {
    borderColor: 'rgba(244, 244, 244, 1)',
    borderTopWidth: 1,
    marginHorizontal: 10,
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
  const investmentOfUser =
    Number(item?.entry_fee_cash) + Number(item?.entry_fee_coins);
  return (
    <View
      style={{marginVertical: 18, marginHorizontal: showpercentage ? 0 : 16}}>
      {isArray(item?.Options) &&
        item?.Options.map(obj => {
          const displayPercentage =
            selectedOption?.id === obj?.id
              ? Math.round(
                  ((obj?.total_invested + investmentOfUser) /
                    (item?.poolValue + investmentOfUser)) *
                    100,
                )
              : Math.round(
                  (obj?.total_invested / (item?.poolValue + investmentOfUser)) *
                    100,
                );
          return (
            <TouchableOpacity
              disabled={disbaleOptionOnPress}
              onPress={() => {
                dispatch(
                  setStore({
                    selectedEvent: item,
                    showPopUp: true,
                    selectedOption: obj,
                  }),
                );
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 2,
                  marginBottom: 8,
                  flexDirection: 'row',
                  borderColor: 'rgba(133, 182, 255, 1)',
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    backgroundColor:
                      showpercentage && selectedOption?.id === obj?.id
                        ? '#BFD9FF'
                        : 'white',
                    width: `${displayPercentage}%`,
                    height: 40,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    margin: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    {selectedOption?.id === obj?.id && showpercentage && (
                      <Icon
                        name="checkcircle"
                        size={18}
                        color={'white'}
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
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const ContestsEventCard = ({
  item,
  showBottomInfo = false,
  showpercentage = false,
  disbaleOptionOnPress = false,
  showShadow = true,
}) => {
  const {
    name = item?.title,
    image = item?.imageUrl,
    hashtag = item?.tags || [],
    poolValue = item?.totalWinning,
    id,
    Options = [],
    end_date_time = Number(item?.endTime),
    contestOpinions,
  } = item;
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    ({apiReducer}) => apiReducer.selectedOption,
  );
  const randomInteger = useSelector(({apiReducer}) => apiReducer.randomInteger);
  let totalInvestmnt = 0;
  Options.map(item => {
    return (totalInvestmnt += Number(item?.user_total_invested_amount || 0));
  });
  const differenceTime = moment.duration(
    moment(end_date_time).diff(moment(new Date().getTime())),
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
      time = `${hoursRemaining}${minutesRemaining}${timeLeft}`;
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
      key={id}
      onPress={() => {
        dispatch(
          setStore({
            selectedEvent: item,
          }),
        );
        navigation.navigate('Tournament Listing');
      }}>
      <View
        key={id}
        style={[
          showShadow ? {elevation: 4, shadowColor: '#E0E5E9'} : {},
          {backgroundColor: 'white', borderRadius: 4},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            margin: 16,
            justifyContent: 'space-between',
          }}>
          <Image
            style={styles.headerImage}
            source={{
              uri: image,
            }}
          />

          <View style={{flex: 1, marginHorizontal: 20}}>
            <Text style={styles.headerText}>{name}</Text>
            <Text
              style={{
                color: '#939393',
                fontSize: 12,
                fontStyle: 'italic',
              }}>
              {hashtag.map(item => {
                return '#' + item + ', ';
              })}
            </Text>
          </View>
        </View>

        <View style={styles.shadowBorder} />
        {/* {renderOptions({
          item,
          dispatch,
          disbaleOptionOnPress: disbaleOptionOnPress,
          showpercentage: showpercentage,
          selectedOption: selectedOption,
        })} */}

        {showBottomInfo && (
          <View style={styles.detailsBody}>
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
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        marginLeft: 8,
                        color: '#000000',
                      }}>
                      {time}
                    </Text>
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgba(255, 235, 235, 1)  ',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 4,
                }}>
                <IconIonicons
                  name="md-trophy-outline"
                  size={14}
                  color="#000000"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
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
                    {priceInWords(poolValue)} Winnings
                  </Text>
                </View>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgba(255, 235, 235, 1)  ',
                  padding: 4,
                  borderRadius: 4,
                }}>
                <IconIonicons
                  name="md-person-outline"
                  size={14}
                  color="#000000"
                />
                <Text style={{fontSize: 12, color: '#000000', marginLeft: 5}}>
                  {contestOpinions} Opinions
                </Text>
              </View> */}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ContestsEventCard;
