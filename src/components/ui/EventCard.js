import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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

    // marginRight: 10,
  },
  pollDetails: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pollDetailsContainer: {
    flex: 0.5,
    marginTop: 70,
  },
  detailsBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
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
});

const tradeOptionConfig = {
  yes: 'yes',
  no: 'no',
};

const BuySellButton = props => {
  const {type, amount} = props;

  return (
    <View
      style={{
        height: 50,
        width: 131,
        backgroundColor: type == tradeOptionConfig.yes ? '#18BADA' : '#F2746E',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          textTransform: 'capitalize',
          fontSize: 16,
          color: '#FFFFFF',
        }}>
        {tradeOptionConfig[type]} {'🪙'}
        {amount}
      </Text>
    </View>
  );
};

const EventCard = props => {
  const {headerText = '', headerImage} = props;

  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        elevation: 7,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        borderColor: '#f6f6f6',
        shadowColor: '#808080',
      }}>
      <View
        style={{
          flexDirection: 'row',
          margin: 15,
          justifyContent: 'space-between',
        }}>
        <Image
          style={styles.headerImage}
          source={{
            uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
          }}
        />
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      <View style={styles.shadowBorder} />
      <View style={styles.detailsBody}>
        <View style={styles.pollDetailsContainer}>
          <View style={styles.pollDetails}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="clockcircleo" size={18} color="#000000" />
              <Text style={{fontSize: 13, marginLeft: 8, color: '#000000'}}>
                3 Days
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Icon name="user" size={18} color="#000000" />
              <Text style={{fontSize: 13, color: '#000000', marginLeft: 5}}>
                21, 500 Polls
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buySellContainer}>
          <BuySellButton type={tradeOptionConfig.yes} amount="7" />
          <View style={{marginVertical: 8}} />
          <BuySellButton type={tradeOptionConfig.no} amount="7" />
        </View>
      </View>
    </View>
  );
};

export default EventCard;
