import {isArray, isEmpty} from 'lodash';
import moment from 'moment';
import React, {useState, useCallback, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Linking,
} from 'react-native';
import {setStore} from '../../redux/actions';
import {getOrderHistory, getTransaction} from '../../redux/actionCreater';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import Token from '../assets/icons/token.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: 91,
    height: 91,
    backgroundColor: 'red',
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
  },
  buySellContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  pollDetails: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  pollDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
  },
  detailsBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  shadowBorder: {
    borderColor: 'rgba(244, 244, 244, 1)',
    borderTopWidth: 1,
    marginHorizontal: 10,
  },
  headerText: {
    marginLeft: 15,
    width: '100%',
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  text_1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  small_card: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  round: {
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
    marginRight: 4,
  },
  round_2: {
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
    marginRight: 4,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
  },
  tips_card: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  time_card: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginTop: 12,
  },

  text_3: {
    fontSize: 14,
    marginLeft: 12,
  },
  text_4: {
    fontSize: 14,
    color: '#403838',
    fontWeight: '300',
    marginRight: 14,
  },
  text_5: {
    fontSize: 13,
    color: '#317508',
  },
  text_6: {
    fontSize: 12,
  },
  row_2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: '#E6E6E6',
  },
  row_3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginBottom: 10,
    alignItems: 'center',
  },
  small_card_2: {
    paddingHorizontal: 8,

    //backgroundColor: '#D8FFBF',
    alignSelf: 'flex-start',
    borderRadius: 3,
  },
  history_card: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
});

const EventCard = ({item}) => {
  const {image, name, hashtag} = item;
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          margin: 15,
        }}>
        <Image
          style={styles.headerImage}
          source={{
            uri: image,
          }}
        />
        <View style={{marginLeft: 12, flex: 1}}>
          <Text style={{fontSize: 16, color: '#000000'}}>{name}</Text>
          <Text
            style={{
              color: '#939393',
              fontSize: 12,
            }}>
            {hashtag}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ProbabilityTrend = () => {};

const PollTips = () => {};

const Footer = () => {
  const dispatch = useDispatch();
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: 'white',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 28,
      }}>
      <TouchableOpacity
        onPress={() =>
          dispatch(
            setStore({
              showPopUp: true,
              selectedOption: {},
            }),
          )
        }
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: 'rgba(255, 80, 80, 1)',
          width: '88%',
          paddingVertical: 16,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          Place your Opinion
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CategoryPollDetails = () => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(({apiReducer}) => apiReducer.selectedEvent);
  const orderHistory = useSelector(({apiReducer}) => apiReducer.orderHistory);
  const randomInteger = useSelector(({apiReducer}) => apiReducer.randomInteger);
  const {
    settlement_source,
    poolValue,
    coinPoolValue,
    unixEndTime,
    settlement_date_time,
    end_date_time,
    start_date_time,
    description = [],
    multiplier = 1,
  } = selectedEvent;
  // const endDateTime = Number(unixEndTime * 1000) - new Date().getTime();
  // const daysLeft = Math.floor(endDateTime / (1000 * 60 * 60 * 24));
  // var timeLeft = moment(endDateTime).format('hh:mm:ss');
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
  useEffect(() => {
    dispatch(getOrderHistory({contestId: selectedEvent?.id}));
    dispatch(getTransaction({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(settlement_source);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(settlement_source);
    }
  }, [settlement_source]);

  return (
    <>
      <View style={{backgroundColor: '#F4F2F7', flex: 1}}>
        <ScrollView>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 12,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}>
            <EventCard item={selectedEvent} />
            <View style={styles.shadowBorder} />
            <View
              style={[
                styles.detailsBody,
                {borderBottomLeftRadius: 4, borderBottomRightRadius: 4},
              ]}>
              <View style={styles.pollDetailsContainer}>
                <Text style={{color: '#939393', fontSize: 15, fontFamily: ''}}>
                  {}
                </Text>
                <View style={styles.pollDetails}>
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
                      style={{fontSize: 12, marginLeft: 8, color: '#000000'}}>
                      {/* {0 > 0 && (
                        <Text
                          style={{
                            fontSize: 12,
                            marginLeft: 8,
                            color: '#000000',
                          }}>
                          {`${0}d `}
                        </Text>
                      )} */}
                      <Text
                        style={{fontSize: 12, marginLeft: 8, color: '#000000'}}>
                        {time}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      alignItems: 'center',
                      backgroundColor: '#F9F9F9',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 4,
                    }}>
                    <Token width={22} height={22} />
                    <Text
                      style={{fontSize: 12, color: '#000000', marginLeft: 5}}>
                      {coinPoolValue * multiplier}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {isArray(description) && (
            <View style={{}}>
              <Text style={styles.text_1}>Tips</Text>
              <View style={styles.tips_card}>
                <View style={{}}>
                  {description.map(item => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignItems: 'center',
                          marginVertical: 8,
                        }}>
                        <View
                          style={[styles.round_2, {backgroundColor: '#F2746E'}]}
                        />
                        <Text>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          )}
          <View style={{}}>
            <View style={styles.time_card}>
              <View style={styles.row_2}>
                <Text style={styles.text_3}>Start date & time</Text>
                <Text style={styles.text_4}>
                  {moment(start_date_time).format('MMM Do, h:mm A')}
                </Text>
              </View>
              <View style={styles.row_2}>
                <Text style={styles.text_3}>Close date & time</Text>
                <Text style={styles.text_4}>
                  {moment(end_date_time).format('MMM Do, h:mm A')}
                </Text>
              </View>
              <View style={styles.row_2}>
                <Text style={styles.text_3}>Settlement date & time</Text>
                <Text style={styles.text_4}>
                  {moment(settlement_date_time).format('MMM Do, h:mm A')}
                </Text>
              </View>
              <View
                style={[
                  styles.row_2,
                  {borderBottomWidth: 0, alignItems: 'center'},
                ]}>
                <Text style={[styles.text_3, {width: '20%'}]}>Source</Text>
                <TouchableOpacity onPress={handlePress}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.text_4,
                      {color: '#3F22CB', alignItems: 'flex-end', width: '80%'},
                    ]}>
                    {settlement_source}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {isArray(orderHistory) && !isEmpty(orderHistory) && (
            <View style={{}}>
              <Text style={styles.text_1}>Poll History</Text>
              {orderHistory.map((item, index) => {
                const {name, amount, updatedAt} = item;
                return (
                  <View
                    key={index}
                    style={[styles.history_card, {marginBottom: 12}]}>
                    <View style={{}}>
                      <View style={styles.row_3}>
                        <View style={[styles.small_card_2, {flex: 1}]}>
                          <Text numberOfLines={1} style={styles.text_5}>
                            {name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 2,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}>
                          <Text style={styles.text_6}>
                            {moment(updatedAt).format('MMM Do, h:mm')}{' '}
                          </Text>
                          <TouchableWithoutFeedback>
                            <View style={[styles.button_card, {width: 70}]}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Token width={22} height={22} />
                                <Text style={styles.text_4}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                    }}>{`${amount}`}</Text>
                                </Text>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          <View style={{height: 120}} />
        </ScrollView>

        <Footer />
      </View>
    </>
  );
};

export default CategoryPollDetails;
