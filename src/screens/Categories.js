/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLiveEvents} from '../../redux/actionCreater';
import {setStore} from '../../redux/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('window');

const Categories = ({isExpanded, setExpanded, start}) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    ({apiReducer}) => apiReducer.categories || null,
  );
  const selectedCategoryId = useSelector(
    ({apiReducer}) => apiReducer.selectedEventCategoryId || null,
  );

  const flProps = isExpanded
    ? {
        numColumns: 4,
      }
    : {};
  return (
    <View
      style={{
        height: isExpanded ? (categories?.length / 4) * 125 : 80,
        paddingTop: 4,
      }}>
      <FlatList
        data={categories}
        contentContainerStyle={{flex: 1}}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
          item?.topic !== 'Expand' ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(setStore({selectedEventCategoryId: item?.id}));
                dispatch(
                  getLiveEvents({contestId: item?.id, offset: 0, count: 5}),
                );
                start.current = 0;
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
                  uri: item?.image,
                }}
              />
              <Text
                style={{
                  color: selectedCategoryId === item?.id ? 'red' : 'black',
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                {item?.topic}
              </Text>
            </TouchableOpacity>
          ) : (
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
          )
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// Categories.whyDidYouRender = true;
export default Categories;
