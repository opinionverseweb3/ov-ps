/* eslint-disable react-native/no-inline-styles */
// import EventCard from '../components/ui/EventCard';

import React from 'react';
import {
  FlatList,
  Image,
  Linking,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import {isEmpty} from 'lodash';
const {width} = Dimensions.get('window');

const Banner = props => {
  const banners = useSelector(({apiReducer}) => apiReducer.banners || null);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={{paddingRight: 12}}>
        <TouchableOpacity
          onPress={() =>
            !isEmpty(item?.redirectTo)
              ? Linking.openURL(item?.redirectTo)
              : null
          }>
          <Image
            style={{
              height: 62,
              width: banners.length === 1 ? width - 32 : 320,
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

  return (
    <View
      style={
        !isEmpty(banners)
          ? {
              height: 62,
              marginVertical: 8,
            }
          : {height: 0}
      }>
      <FlatList
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

// Banner.whyDidYouRender = true;
export default Banner;
