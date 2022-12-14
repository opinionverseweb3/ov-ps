/* eslint-disable */
import {isArray, isEmpty} from 'lodash';
import moment from 'moment';
import React, {useState, useCallback, useEffect} from 'react';
import {priceInWords} from '../util/common';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Linking,
  Alert,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {setStore} from '../../redux/actions';
import {getContestLobby} from '../../redux/actionCreater';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: 60,
    height: 60,
    // backgroundColor: 'red',
    borderRadius: 6,
    // borderColor: 'black',
    // borderWidth: 1,
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
    fontSize: 25,
    fontWeight: '700',
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
    paddingTop: 15,
    paddingBottom: 10,
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
  const {
    image = item?.imageUrl,
    name = item?.title,
    hashtag = item?.tags || [],
  } = item;
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
            {hashtag.map(item => {
              return '#' + item + ', ';
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ContestsPollDetails = () => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(({apiReducer}) => apiReducer.selectedEvent);
  const userOpinios = useSelector(({apiReducer}) => apiReducer.userOpinios);
  const contestLobby = useSelector(({apiReducer}) => apiReducer.contestLobby);
  const history = useSelector(({apiReducer}) => apiReducer.history);
  const randomInteger = useSelector(({apiReducer}) => apiReducer.randomInteger);
  const {
    poolValue = selectedEvent.totalWinning,
    end_date_time = Number(selectedEvent.endTime),
    contestOpinions,
  } = selectedEvent;
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
  useEffect(() => {
    dispatch(getContestLobby({contestId: selectedEvent?.id, history: history}));
  }, [dispatch]);

  const onRefresh = React.useCallback(
    ({selectedId}) => {
      dispatch(getContestLobby({contestId: selectedId, history: history}));
    },
    [dispatch],
  );
  const navigation = useNavigation();
  return (
    <>
      <View style={{backgroundColor: '#F4F2F7', flex: 1}}>
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
                  <Text style={{fontSize: 12, marginLeft: 8, color: '#000000'}}>
                    <Text
                      style={{fontSize: 12, marginLeft: 8, color: '#000000'}}>
                      {time}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgba(255, 235, 235, 1)',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRadius: 4,
                  }}>
                  <Text style={{fontSize: 12, color: '#000000', marginLeft: 5}}>
                    {' 🪙'}
                  </Text>
                  <Text style={{fontSize: 12, color: '#000000', marginLeft: 5}}>
                    {priceInWords(poolValue)} Winnings
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgba(255, 235, 235, 1)',
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
                </View>
              </View>
            </View>
          </View>
        </View>

        {isArray(contestLobby) && contestLobby.length > 0 && (
          <View style={{marginVertical: 20, marginBottom: 250}}>
            <View
              style={{
                flexDirection: 'row',
                padding: 4,
                borderRadius: 4,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text_1}>Contests</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  width: 135,
                  height: 40,
                  backgroundColor: '#FFEBEB',
                  borderRadius: 100,
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 18, color: '#FF5050'}}>
                  {userOpinios} Opinions
                </Text>
              </View>
            </View>
            <FlatList
              data={contestLobby}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => onRefresh({selectedId: selectedEvent?.id})}
                />
              }
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      width: width,
                      paddingRight: 12,
                      top: height / 3,
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',

                        paddingHorizontal: 16,
                        alignSelf: 'center',
                      }}>
                      {'No Polls Available'}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flex: 1,
                width: width,
                paddingBottom: contestLobby.length === 1 ? 120 : 40,
              }}
              renderItem={({item}) => (
                <View style={{marginTop: 16}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Contest Details');
                      dispatch(
                        setStore({
                          selectedLobby: item,
                        }),
                      );
                    }}>
                    <View style={styles.tips_card}>
                      <View style={{}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingHorizontal: 4,
                            borderRadius: 4,
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 25,
                              color: 'rgba(58, 58, 58, 1)',
                              fontWeight: '700',
                            }}>
                            🪙{item?.lobbyWinning}
                          </Text>
                          <TouchableOpacity
                            style={{
                              width: 100,
                              height: 35,
                              backgroundColor: '#FF5050',
                              borderRadius: 5,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() =>
                              dispatch(
                                setStore({
                                  showContestPopUp: true,
                                  selectedOptionContest: {
                                    lobbyID: item?.id,
                                    contestID: selectedEvent?.id,
                                  },
                                }),
                              )
                            }
                            disabled={history}>
                            <Text
                              style={{
                                fontSize: 15,
                                color: '#fff',
                                fontWeight: '700',
                              }}>
                              🪙{item?.entryFee}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            padding: 4,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              borderRadius: 4,
                              padding: 4,
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#3A3A3A',
                                fontWeight: '700',
                              }}>
                              {item?.lobbyOpinions}/
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                color: '#969696',
                                fontWeight: '600',
                                top: 5,
                              }}>
                              {item?.maxOpinions}
                            </Text>
                          </View>
                          <Progress.Bar
                            progress={
                              (item?.lobbyOpinions * 100) /
                              item?.maxOpinions /
                              100
                            }
                            width={320}
                            color={'#FF5050'}
                          />
                        </View>
                        <View>
                          <View style={styles.pollDetailsContainer}>
                            <View style={styles.pollDetails}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'rgba(255, 235, 235, 1)',
                                  padding: 4,
                                  borderRadius: 4,
                                }}>
                                <MaterialCommunityIcons
                                  name="numeric-1-circle-outline"
                                  size={14}
                                  color="#000000"
                                />
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#000000',
                                    marginLeft: 5,
                                  }}>
                                  {'🪙' + item?.firstPrize}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'rgba(255, 235, 235, 1)',
                                  borderRadius: 4,
                                  padding: 4,
                                }}>
                                <IconIonicons
                                  name="md-trophy-outline"
                                  size={14}
                                  color="#000000"
                                />
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#000000',
                                    marginLeft: 4,
                                  }}>
                                  {item?.totalWinners} Winners
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'rgba(255, 235, 235, 1)',
                                  borderRadius: 4,
                                  padding: 4,
                                }}>
                                <IconIonicons
                                  name="md-person-outline"
                                  size={14}
                                  color="#000000"
                                />
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#000000',
                                    marginLeft: 4,
                                  }}>
                                  {item?.lobbyUserOpinions}/
                                  {
                                    JSON.parse(item?.metaData)
                                      .maxPerUserOpinions
                                  }{' '}
                                  Opinions
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {false && item?.bonusCash && item?.bonusCash > 0 ? (
                    <View
                      style={{
                        backgroundColor: 'rgba(255, 235, 235, 1)',
                        padding: 4,
                        borderRadius: 4,
                        position: 'absolute',
                        zIndex: 5,
                        left: 0,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#000000',
                          marginLeft: 5,
                        }}>
                        {`Use ${item?.bonusCash}% Bonus Coins`}
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ContestsPollDetails;
