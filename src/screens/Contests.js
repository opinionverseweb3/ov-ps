/* eslint-disable */
// import EventCard from '../components/ui/EventCard';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  Linking,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCatsContest,
  getLiveContests,
  getUserProfile,
} from '../../redux/actionCreater';
import {isEmpty} from 'lodash';
import {setStore} from '../../redux/actions';
import Header from '../components/header/header';
import AddMoney from '../components/ui/AddMoneyBs';
import ContestsEventCard from '../components/ui/ContestsEventCard';
import BidPopUp from '../components/ui/BidPopUp';
import GenericPopup from '../components/ui/GenericPopUp';
const {height, width} = Dimensions.get('window');

const Contests = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contCategories = useSelector(
    ({apiReducer}) => apiReducer.contCategories,
  );
  const liveEvents = useSelector(({apiReducer}) => apiReducer.liveEvents);
  const liveContests = useSelector(({apiReducer}) => apiReducer.liveContests);
  const showPopUp = useSelector(({apiReducer}) => apiReducer.showPopUp);
  const showContestPopUp = useSelector(
    ({apiReducer}) => apiReducer.showContestPopUp,
  );
  const selectedOptionContest = useSelector(
    ({apiReducer}) => apiReducer.selectedOptionContest,
  );
  const banners = useSelector(({apiReducer}) => apiReducer.banners);
  const selectedCategoryId = useSelector(
    ({apiReducer}) => apiReducer.selectedContestCategoryId,
  );

  useEffect(() => {
    dispatch(getCatsContest({isFirstCall: true}));
    dispatch(getUserProfile({}));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setStore({
          history: false,
        }),
      );
    }, [dispatch]),
  );

  const [isExpanded, setExpanded] = useState(false);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={{paddingRight: 12, height: 100}}>
        <TouchableOpacity
          onPress={() =>
            !isEmpty(item?.redirectTo)
              ? Linking.openURL(item?.redirectTo)
              : null
          }>
          <Image
            style={{
              height: 62,
              width: banners?.length === 1 ? width - 32 : 320,
              marginBottom: 10,
              borderRadius: 8,
            }}
            source={{
              uri: item?.image,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={{paddingTop: 12}}>
        {!isEmpty(banners) && (
          <FlatList
            data={banners}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 12,
              height: 76,

              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
            renderItem={renderItem}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            padding: 4,
            borderRadius: 4,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              marginTop: 12,
              fontWeight: 'bold',
            }}>
            Skill Prediction Contests
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              paddingVertical: 8,
              paddingHorizontal: 20,
              backgroundColor: '#FFEBEB',
              borderRadius: 100,
              marginTop: 5,
            }}
            onPress={() => {
              navigation.navigate('My History');
              dispatch(
                setStore({
                  history: true,
                }),
              );
            }}>
            <Text style={{fontSize: 14, color: '#FF5050'}}>My History</Text>
          </TouchableOpacity>
        </View>
        {/* <Text
            style={{
              fontSize: 18,
              color: 'black',
              marginTop: 12,
              fontWeight: 'bold',
            }}>
            Skill Prediction Contests
          </Text> */}
        {/* <Text style={{fontSize: 14, color: 'black', marginTop: 4}}>
            Give your Best Opinion & Win Prizes
          </Text> */}
      </View>
    );
  };
  const onRefresh = React.useCallback(
    ({selectedId}) => {
      isExpanded && setExpanded(false);
      dispatch(getCatsContest({}));
      dispatch(getLiveContests({contestId: selectedId}));
    },
    [dispatch],
  );

  const setModalVisible = () => {
    dispatch(setStore({showContestPopUp: false}));
  };

  const addMoneyonLowBalance = () => {
    dispatch(setStore({isRechargeNeeded: true}));
    navigation.push('WalletScreen');
  };

  const flProps = isExpanded
    ? {
        numColumns: 4,
      }
    : {};

  return (
    <>
      <Header navigation={navigation} screen={'home'} />
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: isExpanded ? 280 : 180,
          alignItems: 'flex-start',
          backgroundColor: '#F4F2F7',
        }}>
        <View
          style={{
            height: isExpanded ? (categories?.length / 4) * 100 : 100,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <FlatList
            data={contCategories}
            horizontal={!isExpanded}
            {...flProps}
            key={isExpanded ? 'v' : 'h'}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: width - 32,
              paddingVertical: 5,
            }}
            renderItem={({item}) =>
              item?.name === 'Expand' ? (
                <TouchableOpacity
                  onPress={() => {
                    setExpanded(!isExpanded);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                    width: (width - 32) / 4,
                  }}>
                  <View
                    style={{
                      height: 56,
                      width: 56,
                      borderColor: 'grey',
                      borderWidth: 2,
                      borderRadius: 28,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialIcons
                      name={isExpanded ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={40}
                      color={'black'}
                    />
                  </View>
                  <Text
                    style={{
                      color: selectedCategoryId === item?.id ? 'red' : 'black',
                      fontSize: 12,
                      fontWeight: '600',
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setStore({selectedContestCategoryId: item?.id}));
                    dispatch(getLiveContests({contestId: item?.id}));
                    isExpanded && setExpanded(false);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                    width: (width - 32) / 4,
                  }}>
                  <Image
                    style={{
                      height: 56,
                      width: 56,
                      borderRadius: 28,
                    }}
                    source={{
                      uri: item?.imageUrl,
                    }}
                  />
                  <Text
                    style={{
                      color: selectedCategoryId === item?.id ? 'red' : 'black',
                      fontSize: 12,
                      fontWeight: '600',
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <FlatList
          data={liveContests}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => onRefresh({selectedId: selectedCategoryId})}
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
                  {'No Contests Available'}
                </Text>
              </View>
            );
          }}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{width: width - 32}}
          renderItem={({item}) => (
            <View style={{marginTop: 16}}>
              <ContestsEventCard item={item} showBottomInfo />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {showContestPopUp && (
          <BidPopUp
            modalVisible={showContestPopUp}
            setModalVisible={setModalVisible}
            addMoneyonLowBalance={addMoneyonLowBalance}
            bidData={selectedOptionContest}
          />
        )}
      </View>
    </>
  );
};

export default Contests;
