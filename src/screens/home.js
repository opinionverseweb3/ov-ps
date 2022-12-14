/* eslint-disable react-native/no-inline-styles */
// import EventCard from '../components/ui/EventCard';
import {useNavigation} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState, useRef} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  apiCall,
  getUserProfile,
  getWalletData,
} from '../../redux/actionCreater';
import {setStore} from '../../redux/actions';
import Header from '../components/header/header';
import CategoryOrderPopUp from '../components/ui/CategoryPopUp';
import Categories from './Categories';
import EventList from './EventList';
import Banner from './Banner';

const HomeScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isExpanded, setExpanded] = useState(false);
  const start = useRef(0);
  const showPopUp = useSelector(({apiReducer}) => apiReducer.showPopUp || null);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    dispatch(apiCall({isFirstCall: true}));
    dispatch(getUserProfile({}));
    dispatch(getWalletData({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setModalVisible = modalVisible => {
    dispatch(setStore({showPopUp: modalVisible}));
  };
  const addMoneyonLowBalance = () => {
    dispatch(setStore({isRechargeNeeded: true}));
    navigation.push('WalletScreen');
  };

  return (
    <>
      <Header navigation={navigation} screen={'home'} />
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: isExpanded ? tabBarHeight + 245 : tabBarHeight + 170,
          backgroundColor: '#F4F2F7',
        }}>
        <Categories
          start={start}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
        />
        <Banner />
        <EventList
          start={start}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
        />
        {showPopUp && (
          <CategoryOrderPopUp
            modalVisible={showPopUp}
            setModalVisible={setModalVisible}
            addMoneyonLowBalance={addMoneyonLowBalance}
          />
        )}
      </View>
    </>
  );
};

// HomeScreen.whyDidYouRender = true;
export default HomeScreen;
