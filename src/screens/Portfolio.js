import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  RefreshControl,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {getMyOpenion} from '../../redux/actionCreater';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from '../components/header/header';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import GenericPopup from '../components/ui/GenericPopUp';
import AddMoney from '../components/ui/AddMoneyBs';
import CategoryEventCard from '../components/ui/CategoryEventCard';
import FinishedEventCard from '../components/ui/CompletedCategoryEventyCard';
import {setStore} from '../../redux/actions';
import Token from '../assets/icons/token.svg';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  tabBarIndicatorStyle: {
    width: 100,
    marginLeft: 68,
    backgroundColor: 'rgba(255, 80, 80, 1)',
    padding: 2,
    borderRadius: 10,
  },
  tabBarStyle: {
    backgroundColor: 'white',
    shadowColor: 'white',
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
    borderBottomWidth: 1,
  },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
  },
  concludedStyle: {
    borderWidth: 1,
    borderColor: 'rgba(255, 80, 80, 1)',
    backgroundColor: 'transparent',
    color: 'rgba(255, 80, 80, 1)',
  },
});

function Portfolio({navigation}) {
  const dispatch = useDispatch();
  const tradingPortfolio = useSelector(
    ({apiReducer}) => apiReducer.tradingPortfolio,
  );

  const myOpinion = useSelector(({apiReducer}) => apiReducer.myOpinion);
  const Tab = createMaterialTopTabNavigator();
  const [isConcluded, setIsConcluded] = useState(false);

  const pollsScreen = () => {
    const data = {
      headerText:
        'Whether Mahendra Singh Dhoni will make more than 30 runs & India will win the match?',
    };

    const onRefresh = () => {
      dispatch(
        getMyOpenion({
          eventType: isConcluded ? 'concluded' : 'ongoing',
        }),
      );
    };
    const tradeCard = () => {
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
            <Text style={{color: 'rgba(150, 150, 150, 1)'}}>Opinions</Text>
            <Text
              style={{
                color: 'rgba(255, 80, 80, 1)',
                fontSize: 19,
                fontWeight: '700',
              }}>
              {tradingPortfolio?.trades || 0}
            </Text>
          </View>
          <View
            style={{
              height: 30,
              width: 2,
              backgroundColor: 'rgba(230, 230, 230, 1)',
            }}
          />
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'rgba(150, 150, 150, 1)'}}>Investment</Text>
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
                {` ${tradingPortfolio?.investment || 0}`}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 30,
              width: 2,
              backgroundColor: 'rgba(230, 230, 230, 1)',
            }}
          />

          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'rgba(150, 150, 150, 1)'}}>Winnings</Text>
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
                {` ${tradingPortfolio?.returns || 0}`}
              </Text>
            </View>
          </View>
        </View>
      );
    };

    return (
      <View style={{paddingBottom: 160, backgroundColor: '#F4F2F7'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 25,
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(
                getMyOpenion({
                  eventType: !isConcluded ? 'concluded' : 'ongoing',
                }),
              );
              setIsConcluded(!isConcluded);
            }}>
            <View
              style={[
                {
                  backgroundColor: 'rgba(255, 80, 80, 1)',
                  flexDirection: 'row',
                  flex: 1,
                  marginRight: 16,
                  justifyContent: 'center',
                  height: 44,
                  alignItems: 'center',
                  borderRadius: 25,
                },
                isConcluded && styles.concludedStyle,
              ]}>
              <Text
                style={
                  !isConcluded
                    ? {color: 'white', marginRight: 10}
                    : {color: 'rgba(255, 80, 80, 1)', marginRight: 10}
                }>
                {'Ongoing'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {/* <Text
            style={{
              fontWeight: '700',
              color: 'black',
              fontSize: 18,
            }}>
            Portfolio
          </Text> */}
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(
                getMyOpenion({
                  eventType: !isConcluded ? 'concluded' : 'ongoing',
                }),
              );
              setIsConcluded(!isConcluded);
            }}>
            <View
              style={[
                {
                  backgroundColor: 'rgba(255, 80, 80, 1)',
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  height: 44,
                  alignItems: 'center',
                  borderRadius: 25,
                },
                !isConcluded && styles.concludedStyle,
              ]}>
              <Text
                style={
                  isConcluded
                    ? {color: 'white', marginRight: 10}
                    : {color: 'rgba(255, 80, 80, 1)', marginRight: 10}
                }>
                {'Finished'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {tradeCard()}
        {
          <FlatList
            data={myOpinion}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    top: height / 3,
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',

                      paddingHorizontal: 16,
                      alignSelf: 'center',
                    }}>
                    {'No Opinions Available'}
                  </Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 400}}
            renderItem={({item}) => (
              <View style={{marginTop: 15}}>
                {isConcluded ? (
                  <FinishedEventCard
                    item={item}
                    disbaleOptionOnPress={isConcluded}
                    showBottomInfo
                  />
                ) : (
                  <CategoryEventCard
                    item={item}
                    disbaleOptionOnPress={isConcluded}
                    showBottomInfo
                  />
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    );
  };
  useEffect(() => {
    dispatch(
      getMyOpenion({
        eventType: isConcluded ? 'concluded' : 'ongoing',
      }),
    );
  }, []);
  return (
    <View style={{backgroundColor: '#F4F2F7'}}>
      <Header navigation={navigation} screen={'portfolio'} />

      {pollsScreen()}
    </View>
  );
}

export default Portfolio;
