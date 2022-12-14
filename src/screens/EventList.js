/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, RefreshControl, Text, Dimensions, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {apiCall, getLiveEvents} from '../../redux/actionCreater';
import CategoryEventCard from '../components/ui/CategoryEventCard';
const {height, width} = Dimensions.get('window');

const EventList = ({start, isExpanded, setExpanded}) => {
  const dispatch = useDispatch();
  const liveEvents = useSelector(
    ({apiReducer}) => apiReducer.liveEvents || null,
  );
  const selectedCategoryId = useSelector(
    ({apiReducer}) => apiReducer.selectedEventCategoryId || null,
  );

  const onRefresh = ({selectedId}) => {
    isExpanded && setExpanded(false);
    dispatch(apiCall({}));
    dispatch(getLiveEvents({contestId: selectedId, offset: 0, count: 5}));
    start.current = 0;
  };

  const onEnd = ({selectedId}) => {
    dispatch(
      getLiveEvents({
        contestId: selectedId,
        offset: start.current + 5,
        count: 5,
      }),
    );
    start.current = start.current + 5;
  };

  return (
    <FlatList
      data={liveEvents}
      onEndReached={() => onEnd({selectedId: selectedCategoryId})}
      onEndReachedThreshold={0.1}
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
              {'No Polls Available'}
            </Text>
          </View>
        );
      }}
      ListHeaderComponent={() => (
        <>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              marginTop: 8,
              fontWeight: 'bold',
            }}>
            Skill Polls
          </Text>
          <Text style={{fontSize: 14, color: 'black', marginTop: 4}}>
            Give your Best Opinion & Win Prizes
          </Text>
        </>
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View style={{marginTop: 8}} key={index}>
          <CategoryEventCard item={item} index={index} showBottomInfo />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

// EventList.whyDidYouRender = true;
export default EventList;
