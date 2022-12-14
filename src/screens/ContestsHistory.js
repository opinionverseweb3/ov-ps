/* eslint-disable */
// import EventCard from '../components/ui/EventCard';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import {getHistoryContests, getUserProfile} from '../../redux/actionCreater';
import {isEmpty} from 'lodash';
import {setStore} from '../../redux/actions';
import Header from '../components/header/header';
import AddMoney from '../components/ui/AddMoneyBs';
import ContestsEventCardHistory from '../components/ui/ContestsEventCardHistory';
import BidPopUp from '../components/ui/BidPopUp';
import GenericPopup from '../components/ui/GenericPopUp';
const {height, width} = Dimensions.get('window');

const ContestsHistory = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const historyContests = useSelector(
    ({apiReducer}) => apiReducer.historyContests,
  );
  const showContestPopUp = useSelector(
    ({apiReducer}) => apiReducer.showContestPopUp,
  );
  const selectedOptionContest = useSelector(
    ({apiReducer}) => apiReducer.selectedOptionContest,
  );
  const banners = useSelector(({apiReducer}) => apiReducer.banners);

  useEffect(() => {
    dispatch(getHistoryContests({}));
    dispatch(getUserProfile({}));
  }, [dispatch]);
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={{paddingRight: 12, height: 100}}>
        <TouchableOpacity
          onPress={() =>
            !isEmpty(item.redirectTo) ? Linking.openURL(item.redirectTo) : null
          }>
          <Image
            style={{
              height: 62,
              width: banners.length === 1 ? width - 32 : 320,
              marginBottom: 10,
              borderRadius: 8,
            }}
            source={{
              uri: item.image,
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
      </View>
    );
  };
  const onRefresh = React.useCallback(
    ({selectedId}) => {
      dispatch(getHistoryContests({}));
    },
    [dispatch],
  );

  const addMoneyonLowBalance = () => {
    dispatch(setStore({isRechargeNeeded: true}));
    navigation.push('WalletScreen');
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          alignItems: 'flex-start',
          backgroundColor: '#F4F2F7',
        }}>
        {
          <FlatList
            data={historyContests}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => onRefresh({})}
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
            ListHeaderComponent={
              historyContests.length === 0 ? null : renderHeader
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
              width: width - 32,
              paddingBottom: historyContests.length === 1 ? 120 : 40,
            }}
            renderItem={({item}) => (
              <View style={{marginTop: 16}}>
                <ContestsEventCardHistory item={item} showBottomInfo />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        }
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

ContestsHistory.navigationOptions = {
  tabBarLabel: <Text style={{color: 'black'}}>Live Polls</Text>,
};
export default ContestsHistory;
