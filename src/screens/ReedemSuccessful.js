import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Token from '../assets/icons/token.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ReedemSuccessful = ({route, navigation}) => {
  const {bonusCash = 0} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: height * 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign
          name="checkcircle"
          color={'#3BB656'}
          size={71}
          style={{alignSelf: 'center'}}
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000000',
            fontSize: 36,
            textAlign: 'center',
            marginTop: 28,
          }}>
          Redemption Successful
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 24,
            textAlign: 'center',
            marginTop: 16,
          }}>
          <Text>You’ve Earned</Text>
          <Text style={{color: '#FF5050'}}> ₹{bonusCash} Bonus</Text>
          <Text> Cash</Text>
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://opinionverse.live/');
        }}>
        <Image
          source={require('../assets/images/redeemBanner.png')}
          style={{height: height * 0.6, width: windowWidth}}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReedemSuccessful;
