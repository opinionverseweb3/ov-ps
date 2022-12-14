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
    width: 92,
    height: 92,
    backgroundColor: 'red',
    borderRadius: 4,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  buySellContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    // marginRight: 10,
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
    paddingBottom: 15,
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

// const tradeOptionConfig = {
//   yes: 'yes',
//   no: 'no',
// };

const renderOptions = ({
  item,
  dispatch,
  showpercentage,
  selectedOption,
  disbaleOptionOnPress,
}) => {
  const investmentOfUser =
    Number(item.entry_fee_cash) + Number(item.entry_fee_coins);
  return (
    <View
      style={{marginVertical: 18, marginHorizontal: showpercentage ? 0 : 16}}>
      {isArray(item.Options) &&
        item?.Options.map(obj => {
          const displayPercentage =
            selectedOption.id === obj.id
              ? Math.round(
                  ((obj.total_invested + investmentOfUser) /
                    (item.coinPoolValue + investmentOfUser)) *
                    100,
                )
              : Math.round(
                  (obj.total_invested /
                    (item.coinPoolValue + investmentOfUser)) *
                    100,
                );
          return (
            <TouchableOpacity
              disabled={true}
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
                  marginBottom: 8,
                  height: 40,
                  flexDirection: 'row',
                  backgroundColor: '#F9F9F9',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    margin: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      {fontWeight: 'bold', color: 'black', fontSize: 14},
                    ]}>
                    {obj.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Token width={22} height={22} />
                    <Text
                      style={[
                        {fontWeight: 'bold', color: 'black', fontSize: 14},
                      ]}>
                      {` ${obj?.user_total_invested_amount || 0}`}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const FinishedEventCard = ({
  item,
  showBottomInfo = false,
  showpercentage = false,
  disbaleOptionOnPress = false,
  showShadow = true,
}) => {
  const {
    name = '',
    image,
    hashtag,
    poolValue,
    coinPoolValue,
    id,
    Options = [],
    activeUsers,
    end_date_time,
    userTotalWinning = 0,
    unixEndTime,
    totalBids,
    multiplier = 1,
  } = item;
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    ({apiReducer}) => apiReducer.selectedOption,
  );
  let totalInvestmnt = 0;
  Options.map(item => {
    return (totalInvestmnt += Number(item?.user_total_invested_amount || 0));
  });
  const endDateTime = Number(unixEndTime * 1000) - new Date().getTime();
  const daysLeft = Math.floor(endDateTime / (1000 * 60 * 60 * 24));
  var timeLeft = moment(endDateTime).format('hh:mm:ss');
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={id}
      disabled={true}
      onPress={() => {
        //Todo  add onpress if required
        // dispatch(
        //   setStore({
        //     selectedEvent: item,
        //   }),
        // );
        // navigation.navigate('Poll Details');
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
            {/* <Text
              style={{
                color: '#939393',
                fontSize: 12,
              }}>
              {hashtag}
            </Text> */}
          </View>
        </View>

        <View style={styles.shadowBorder} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 24,
            marginTop: 12,
          }}>
          <Text style={{fontSize: 14, fontWeight: '500'}}>My Opinions</Text>
          <Text style={{fontSize: 14, fontWeight: '500'}}>Invested</Text>
        </View>
        {renderOptions({
          item,
          dispatch,
          disbaleOptionOnPress: disbaleOptionOnPress,
          showpercentage: showpercentage,
          selectedOption: selectedOption,
        })}

        <View style={{marginBottom: 12}}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginBottom: 8,
                color: '#403838',
              }}>
              Right Opinion
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
              flex: 1,
              padding: 8,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#317508'}}>
              {item.correctOptionId}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 28,
              marginTop: 12,
              alignItems: 'center',
              paddingHorizontal: 24,
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Token width={22} height={22} />
              <Text style={{fontSize: 12, fontWeight: '500', color: '#000000'}}>
                {` ${item.userTotalInvested} Invested`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Token width={22} height={22} />
              <Text style={{fontSize: 12, fontWeight: '500', color: '#317508'}}>
                {` ${item?.totalWinning || 0} Winning`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FinishedEventCard;
