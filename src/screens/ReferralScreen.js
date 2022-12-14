/* eslint-disable react-native/no-inline-styles */
// import EventCard from '../components/ui/EventCard';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Clipboard,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getReferralCode} from '../../redux/actionCreater';
import Header from '../components/header/header';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';

const ReferralScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const referral = useSelector(
    ({apiReducer}) => apiReducer.referralLink || null,
  );

  const {
    howItWorks = [],
    isInfluencer = false,
    inActiveProgram = null,
    referralConfig = {},
    referralLink = '',
    referralBonusAnalytics = {},
    referralCode = '',
  } = referral || {};

  const {configData = ''} = referralConfig;
  const parsedData = configData ? JSON.parse(configData) : {};

  const {referee = {}, referrer = {}} = parsedData;
  const {SIGN_UP_BONUS = {}} = referrer;
  const {
    amount = 0,
    max_referrals_allowed = 0,
    text = '',
    type = '',
  } = SIGN_UP_BONUS;
  const {
    totReferralCashBonus = 0,
    totReferralCoins = 0,
    totReferralDepositCash = 0,
    totalCashEarned = 0,
    totalUsersReferred = 0,
  } = referralBonusAnalytics;
  // const referralCode = referralLink?.split('=')[1];

  const url = '';
  const title = '';
  const message = `Earning Opportunity from home by doing simple predictions. 💸\nWin OV Coins by Playing on OpinionVerse app.\nOV Coins Polls and Tournaments 🏆.\nUse my referral code link to signup and Earn signup OV Coins upto Rs 500.\nReferral Code : ${referralCode}\nReferral Link : ${referralLink}`;

  // `Check out Opinionverse, only place where you earn Money from playing Prediction Polls and Tournaments Use my referral code to sign up and get bonus upto 🪙 ${
  //   max_referrals_allowed * amount
  // }.  Referral code : ${referralCode}`;

  const options = {
    title,
    url,
    message,
  };

  const singleShare = async socialApp => {
    try {
      await Share.shareSingle({
        title: title,
        message: message,
        url: referralLink,
        social: socialApp,
      });
    } catch (err) {}
  };

  const onShare = async () => {
    try {
      await Share.open(options);
    } catch (err) {}
  };

  useEffect(() => {
    dispatch(getReferralCode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipBoard = data => {
    Clipboard.setString(data);
    ToastAndroid.show('Code is copied successfully', 1000);
  };

  return (
    <>
      <Header navigation={navigation} screen={'home'} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.balance_card}>
          <>
            <Text>
              <Text style={styles.balance_text_2}>Refer & Earn</Text>
              <Text style={styles.balance_number}>
                {` Up to ${max_referrals_allowed * amount} `}
              </Text>
              <Text style={styles.balance_text_2}>per friend</Text>
            </Text>
          </>
        </View>

        <View style={styles.balance_card_3}>
          <Text style={styles.text_5}>Share Your Referral Code</Text>
          <View style={styles.refer_code}>
            <View style={styles.ref}>
              <Text style={styles.text_6}>{referralCode}</Text>
            </View>
            <TouchableOpacity onPress={() => copyToClipBoard(referralCode)}>
              <LinearGradient
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                colors={['rgba(255, 80, 80, 1)', 'rgba(255, 80, 80, 1)']}
                style={styles.button}>
                <Text style={styles.text_4}>COPY</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={async () => {
                await singleShare(Share.Social.INSTAGRAM);
              }}>
              <View style={styles.round}>
                <Image
                  source={require('../assets/images/ic_share_instagram.webp')}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                await singleShare(Share.Social.FACEBOOK);
              }}>
              <View style={styles.round}>
                <Image
                  source={require('../assets/images/facebook.png')}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                await singleShare(Share.Social.WHATSAPP);
              }}>
              <View style={[styles.round, {backgroundColor: '#43DC1E'}]}>
                <Image
                  source={require('../assets/images/whatsapp.webp')}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                await singleShare(Share.Social.TELEGRAM);
              }}>
              <View style={styles.round}>
                <Image
                  source={require('../assets/images/telegram.png')}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.balance_card_2}>
          <View style={styles.row}>
            <View style={styles.deposit}>
              <Text style={styles.text_3}>Earnings</Text>
            </View>
            <View style={styles.small_card}>
              <Text style={[styles.text_2]}>{totalCashEarned}</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'grey',
            }}
          />
          <View style={styles.row}>
            <View style={styles.deposit}>
              <Text style={styles.text_3}>Number of Invitees</Text>
            </View>
            <View style={styles.small_card}>
              <Text style={[styles.text_2]}>{totalUsersReferred}</Text>
            </View>
          </View>
        </View> */}

        {howItWorks?.length > 0 && (
          <View style={[styles.balance_card_3]}>
            <Text style={styles.text_5}>How Referral Works</Text>
            {howItWorks.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  marginBottom: 2,
                }}>
                <Image
                  source={{
                    uri: item?.url
                      ? item.url
                      : 'https://img.icons8.com/flat-round/344/info.png',
                  }}
                  style={{
                    height: 16,
                    width: 16,
                    borderRadius: 3,
                    // alignSelf: 'center',
                  }}
                  resizeMode={'contain'}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginLeft: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 14,
                      color: 'black',
                      marginBottom: 12,
                      marginLeft: 5,
                    }}>
                    {item?.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={async () => {
            await onShare();
          }}
          style={styles.button_card}>
          <Text style={styles.text_4}>Invite and Earn More</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

// ReferralScreen.whyDidYouRender = true;
export default ReferralScreen;

const styles = StyleSheet.create({
  balance_card: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 18,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balance_card_2: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 5,
  },
  balance_card_3: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 18,
    borderRadius: 5,
  },
  refer_code: {
    height: 45,
    borderRadius: 5,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderColor: '#403838',
    alignItems: 'center',
  },
  ref: {
    flex: 1,
  },
  refer_text: {
    fontSize: 13,
    color: '#000',
  },
  balance_text: {},
  balance_text_2: {
    fontSize: 14,
    color: '#000000',
  },
  balance_number: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5050',
  },
  small_card: {
    // paddingHorizontal: 18,
    // paddingVertical: 8,
    // alignSelf: 'flex-start',
    // borderRadius: 3,
  },
  button_card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF5050',
    borderRadius: 5,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  deposit: {
    justifyContent: 'center',
    // marginLeft: 6,
  },
  text: {
    fontSize: 11,
    color: '#969696',
  },
  text_2: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  text_3: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  text_4: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  text_5: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
  },
  text_6: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 20,
  },
  button: {
    width: 90,
    zIndex: 999,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
  },
  image: {
    height: 36,
    width: 36,
  },
  round: {
    marginTop: 20,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
