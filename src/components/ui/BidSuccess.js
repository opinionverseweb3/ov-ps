/* eslint-disable */
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {setStore} from '../../../redux/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
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
    flex: 0.5,
  },
  detailsBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  shadowBorder: {
    borderColor: 'rgba(244, 244, 244, 1)',
    borderTopWidth: 1,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    color: '#000000',
  },
});

const BidSuccess = ({}) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <MaterialIcons name="check-circle" size={40} color={'green'} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          marginVertical: 10,
        }}>
        You have successfully placed your Opinion.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(255, 80, 80, 1)',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 5,
        }}
        onPress={() => {
          dispatch(
            setStore({
              showSucess: false,
            }),
          );
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Continue Bidding
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BidSuccess;
