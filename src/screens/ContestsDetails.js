/* eslint-disable */
import {isArray, isEmpty} from 'lodash';
import moment from 'moment';
import React, {useState, useCallback, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  useWindowDimensions,
} from 'react-native';
import {setStore} from '../../redux/actions';
import {
  getOrderHistory,
  getTransaction,
  getContestLeaderBoardData,
} from '../../redux/actionCreater';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import * as Progress from 'react-native-progress';
import {DataTable} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    paddingVertical: 10,
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
  container2: {
    padding: 15,
    backgroundColor: '#fff',
  },
  containerLeaderBoard: {
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor: '#fff',
    paddingLeft: 20,
  },
  containerLeaderBoard2: {
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
    paddingLeft: 20,
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

const Footer = ({lobbyID, contestID}) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() =>
          dispatch(
            setStore({
              showContestPopUp: true,
              selectedOptionContest: {lobbyID: lobbyID, contestID: contestID},
            }),
          )
        }
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

const PrizeBreakup = () => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(({apiReducer}) => apiReducer.selectedEvent);
  const selectedLobby = useSelector(({apiReducer}) => apiReducer.selectedLobby);
  const history = useSelector(({apiReducer}) => apiReducer.history);

  const {
    id,
    lobbyWinning,
    entryFee,
    firstPrize,
    totalWinners,
    metaData,
    lobbyOpinions,
    maxOpinions,
    lobbyUserOpinions,
  } = selectedLobby;
  const prizePool = JSON.parse(metaData)?.prizePool;
  const maxPerUserOpinions = JSON.parse(metaData)?.maxPerUserOpinions;

  useEffect(() => {
    dispatch(getOrderHistory({contestId: selectedEvent?.id}));
    dispatch(getTransaction({}));
  }, [dispatch]);

  return (
    <>
      <View style={{backgroundColor: '#F4F2F7', flex: 1}}>
        <ScrollView>
          <View style={{marginVertical: 20}}>
            <View style={styles.tips_card}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 4,
                    borderRadius: 4,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: 'rgba(58, 58, 58, 1)',
                      fontWeight: '700',
                    }}>
                    🪙{lobbyWinning}
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
                    disabled={history}
                    onPress={() =>
                      dispatch(
                        setStore({
                          showContestPopUp: true,
                          selectedOptionContest: {
                            lobbyID: id,
                            contestID: selectedEvent?.id,
                          },
                        }),
                      )
                    }>
                    <Text
                      style={{fontSize: 15, color: '#fff', fontWeight: '700'}}>
                      🪙{entryFee}
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
                      {lobbyOpinions}/
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#969696',
                        fontWeight: '600',
                        top: 5,
                      }}>
                      {maxOpinions}
                    </Text>
                  </View>
                  <Progress.Bar
                    progress={(lobbyOpinions * 100) / maxOpinions / 100}
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
                          {'🪙' + firstPrize}
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
                        <Text style={{fontSize: 12, color: '#000000'}}>
                          {' 🪙'}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#000000',
                            marginLeft: 4,
                          }}>
                          {totalWinners} Winners
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
                          {lobbyUserOpinions}/{maxPerUserOpinions} Opinions
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <DataTable style={styles.container2}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                marginBottom: 20,
              }}>
              <Text style={{fontSize: 25, fontWeight: '700', color: '#403838'}}>
                Prizepool Breakup
              </Text>
            </View>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>RANK</DataTable.Title>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title>PRIZE</DataTable.Title>
            </DataTable.Header>

            {Object.keys(prizePool).map(item => {
              return (
                <DataTable.Row>
                  <DataTable.Cell>{item}</DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                  <DataTable.Cell>
                    {' 🪙'}
                    {prizePool[item]}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
          <View style={{height: 120}} />
        </ScrollView>
        {!history && <Footer lobbyID={id} contestID={selectedEvent?.id} />}
      </View>
    </>
  );
};

const Leaderboard = () => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();

  const selectedLobby = useSelector(({apiReducer}) => apiReducer.selectedLobby);

  const leaderBoardContestData = useSelector(
    ({apiReducer}) => apiReducer.leaderBoardContestData,
  );
  const leaderBoardContestDataOthers = useSelector(
    ({apiReducer}) => apiReducer.leaderBoardContestDataOthers,
  );

  const isDataAvailable =
    leaderBoardContestDataOthers?.length > 0 &&
    leaderBoardContestData?.length > 0;

  useEffect(() => {
    dispatch(getContestLeaderBoardData(selectedLobby.id));
  }, [dispatch]);
  return !isDataAvailable ? (
    <View
      style={{
        flex: 1,
        width: layout.width,
        paddingRight: 12,
        top: layout.height / 3,
      }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          paddingHorizontal: 16,
          alignSelf: 'center',
        }}>
        {'Leaderboard not generated!'}
      </Text>
    </View>
  ) : (
    <ScrollView>
      {leaderBoardContestData?.length > 0 && (
        <>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              Your Predictions
            </Text>
          </View>
          <DataTable style={styles.containerLeaderBoard}>
            <DataTable.Header style={{borderBottomWidth: 0}}>
              <DataTable.Title>Rank #</DataTable.Title>
              <DataTable.Title>Username</DataTable.Title>
              <DataTable.Title>Prediction</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {leaderBoardContestData.map(items => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell>{items.rank}</DataTable.Cell>
                    <DataTable.Cell>{items.name}</DataTable.Cell>
                    <DataTable.Cell>{items.opinion}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        </>
      )}
      {leaderBoardContestDataOthers?.length > 0 && (
        <>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              Predictions Leaderboard
            </Text>
          </View>
          <DataTable style={styles.containerLeaderBoard}>
            <DataTable.Header style={{borderBottomWidth: 0}}>
              <DataTable.Title>Rank #</DataTable.Title>
              <DataTable.Title>Username</DataTable.Title>
              <DataTable.Title>Prediction</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {leaderBoardContestDataOthers.map(items => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell>{items.rank}</DataTable.Cell>
                    <DataTable.Cell>{items.name}</DataTable.Cell>
                    <DataTable.Cell>{items.opinion}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
        </>
      )}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  first: PrizeBreakup,
  second: Leaderboard,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#FF5050'}}
    style={{backgroundColor: '#fff', color: '#000'}}
    renderLabel={({route, focused, color}) => (
      <Text style={{color: '#000', margin: 8}}>{route.title}</Text>
    )}
  />
);

function ContestsDetails() {
  const history = useSelector(({apiReducer}) => apiReducer.history);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(history ? 1 : 0);
  const [routes] = React.useState([
    {key: 'first', title: 'Prize Breakup'},
    {key: 'second', title: 'Leaderboard'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{width: layout.width}}
    />
  );
}

export default ContestsDetails;
