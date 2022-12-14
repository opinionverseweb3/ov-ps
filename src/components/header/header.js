import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {setStore} from '../../../redux/actions';
import {DrawerActions} from '@react-navigation/native';
import Wallet from '../../assets/icons/empty-wallet.svg';
import {useDispatch, useSelector} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 18,
  },
  profileContainer: {flexDirection: 'row', alignItems: 'center'},
  profilePic: {
    width: 52,
    height: 52,
    borderRadius: 40,
    backgroundColor: 'lightgrey',
    marginRight: 10,
  },
  profileName: {fontSize: 16, color: 'black', fontFamily: 'Roboto-Medium'},
  utilContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: 'rgba(240, 240, 240, 1)',
    borderRadius: 18,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  addMoneyContainer: {
    backgroundColor: 'rgba(147, 193, 255, 1)',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  addMoneyText: {color: 'white', fontSize: 11, fontFamily: 'Roboto-Medium'},
});

const Header = ({navigation, screen = 'leaderboard'}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(({apiReducer}) => apiReducer.userProfile);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          style={{marginRight: 12}}>
          <Icon name="menu" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
            // navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          style={styles.profileContainer}>
          <Image
            style={{
              height: 48,
              width: 48,
              borderRadius: 24,
              marginRight: 12,
              // borderWidth: 2,
              // borderColor: 'red',
            }}
            source={{
              uri: userProfile?.image || '',
              //  'https://opinionverse.s3.ap-south-1.amazonaws.com/all.png',
            }}
          />
          {/* <Image style={styles.profilePic} /> */}
          {/* <Text style={styles.profileName}>{userProfile?.username || ''}</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.utilContainer}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('WalletScreen', {navigation: navigation})
            }>
            <Wallet />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            dispatch(setStore({toggleGenericModal: true}));
          }}>
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            colors={['rgba(255, 80, 80, 1)', 'rgba(255, 80, 80, 1)']}
            style={styles.addMoneyContainer}>
            <Text style={styles.addMoneyText}>Add Money</Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;
