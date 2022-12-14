import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Button,
  Linking,
  Platform,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, useDispatch} from 'react-redux';
import {
  default as FAQIcon,
  default as PrivacyIcon,
} from '../assets/icons/book-2.svg';
import WalletIcon from '../assets/icons/empty-wallet.svg';
import HelpIcon from '../assets/icons/helpAndSupport.svg';
import TnCIcon from '../assets/icons/task.svg';
import KYCIcon from '../assets/icons/user-tag.svg';
import Header from '../components/header/header';
import CategoryPollDetails from '../screens/CategoryPollDetails';
import ContestsPollDetails from '../screens/ContestsPollDetails';
import ContestsDetails from '../screens/ContestsDetails';
import Contests from '../screens/Contests';
import ContestsHistory from '../screens/ContestsHistory';
import HelpAndSupport from '../screens/HelpAndSupport';
import HomeScreen from '../screens/home';
import KYCVerification from '../screens/KYCVerification';
import LeaderBoard from '../screens/LeaderBoard';
import Login from '../screens/Login';
import Portfolio from '../screens/Portfolio';
import ProfileScreen from '../screens/profile';
import ProfileEdit from '../screens/ProfileEdit';
import ReferAndEarn from '../screens/ReferAndEarn';
import TransactionDetails from '../screens/TransactionDetails';
import TransactionHistory from '../screens/TransactionHistory';
import ReedemptionHistory from '../screens/ReedemptionHistory';
import ReedemSuccessful from '../screens/ReedemSuccessful';
import Wallet from '../screens/Wallet';
import WithdrawCash from '../screens/WithdrawCash';
import WithdrawTransaction from '../screens/WithdrawTransaction';
import {sendAppVersion, sendOSVersion} from '../../redux/actionCreater';
import {version} from '../../package.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReferralScreen from '../screens/ReferralScreen';
import {setTopLevelNavigator} from './navigation';

function DetailsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{'Comming Soon'}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
const ReferralStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const WalletStack = createNativeStackNavigator();

function WalletStackScreen() {
  return (
    <WalletStack.Navigator>
      <WalletStack.Screen
        options={{headerShown: false}}
        name="Wallet"
        component={Wallet}
      />
    </WalletStack.Navigator>
  );
}

function HomeStackScreen({navigation, route = ''}) {
  return (
    <>
      <HomeStack.Navigator initialRouteName="Homes">
        <HomeStack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}
        />
        <HomeStack.Screen name="Poll Details" component={CategoryPollDetails} />
      </HomeStack.Navigator>
    </>
  );
}

function ReferralStackScreen({navigation, route = ''}) {
  return (
    <>
      <ReferralStack.Navigator>
        <ReferralStack.Screen
          options={{headerShown: false}}
          name="ReferralScreen"
          component={ReferralScreen}
        />
      </ReferralStack.Navigator>
    </>
  );
}

const ContestsStack = createNativeStackNavigator();

function ContestsStackScreen({navigation, route = ''}) {
  return (
    <>
      <ContestsStack.Navigator>
        <ContestsStack.Screen
          options={{headerShown: false}}
          name="Contests"
          component={Contests}
        />
        <ContestsStack.Screen
          name="Tournament Listing"
          component={ContestsPollDetails}
        />
        <ContestsStack.Screen
          name="Contest Details"
          component={ContestsDetails}
        />
        <ContestsStack.Screen name="My History" component={ContestsHistory} />
      </ContestsStack.Navigator>
    </>
  );
}

const TournamentStack = createNativeStackNavigator();

function TournamentStackScreen() {
  return (
    <TournamentStack.Navigator>
      <TournamentStack.Screen name="Settings" component={SettingsScreen} />
      <TournamentStack.Screen name="Details" component={DetailsScreen} />
    </TournamentStack.Navigator>
  );
}

const LeaderboardStack = createNativeStackNavigator();

function LeaderboardStackScreen({navigation}) {
  return (
    <>
      <Header navigation={navigation} />
      <LeaderboardStack.Navigator>
        <LeaderboardStack.Screen
          name="Winnings Leaderboard"
          component={LeaderBoard}
        />
      </LeaderboardStack.Navigator>
    </>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Polls"
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 10,
          height: 60,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => (
            <Icon
              name="home"
              size={20}
              color={tabInfo.focused ? 'red' : 'black'}
            />
          ),
        }}
        name="Polls"
        component={HomeStackScreen}
      />
      {/* <Tab.Screen
        options={{
          headerShown: false,

          tabBarIcon: tabInfo => (
            <FIcon
              name="award"
              size={20}
              color={tabInfo.focused ? 'red' : 'black'}
            />
          ),
        }}
        name="Contests"
        component={ContestsStackScreen}
      /> */}
      <Tab.Screen
        options={{
          headerShown: false,

          tabBarIcon: tabInfo => (
            <FIcon
              name="pie-chart"
              size={20}
              color={tabInfo.focused ? 'red' : 'black'}
            />
          ),
        }}
        name="My Opinions"
        component={Portfolio}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => (
            <MIcon
              name="crown-outline"
              size={24}
              color={tabInfo.focused ? 'red' : 'black'}
            />
          ),
        }}
        name="Leaderboard"
        component={LeaderboardStackScreen}
      />
      {/* <Tab.Screen
        options={{
          headerShown: false,

          tabBarIcon: tabInfo => (
            <Image
              source={require('../assets/images/icInviteFriends24.webp')}
              style={{
                height: 20,
                width: 20,
                tintColor: tabInfo.focused ? 'red' : 'black',
              }}
              resizeMode={'contain'}
            />
          ),
        }}
        name="Refer & Earn"
        component={ReferralStackScreen}
      /> */}
    </Tab.Navigator>
  );
};

function authStackScreen({isSignout}) {
  const Auth = createNativeStackNavigator();

  return (
    <Auth.Navigator>
      <Auth.Screen
        name="Login"
        component={Login}
        options={{
          title: '',
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: 'push',
        }}
      />
    </Auth.Navigator>
  );
}

function App({isUserLoggedIn = false, isSignout = false, appPreference = {}}) {
  const menuItems = [
    {
      name: 'balance',
      label: 'My Balance',
      icon: <WalletIcon />,
      webUrl: false,
      route: 'WalletScreen',
    },
    {
      name: 'kyc',
      label: 'KYC',
      icon: <KYCIcon />,
      route: 'KYCVerification',
      webUrl: false,
    },
    {
      name: 'howToTrade',
      label: 'How To Play',
      icon: <WalletIcon />,
      webUrl: true,
      keyName: 'howTrade',
    },
    {
      name: 'tnc',
      label: 'Terms & Conditions',
      webUrl: true,
      keyName: 'termCondition',
      icon: <TnCIcon />,
    },
    {
      name: 'privacy',
      label: 'Privacy Policy',
      webUrl: true,
      keyName: 'privacyPolicy',
      icon: <PrivacyIcon />,
    },
    {
      name: 'fqa',
      label: 'FAQ',
      webUrl: true,
      keyName: 'faq',
      icon: <FAQIcon />,
    },
    // {
    //   name: 'referral',
    //   label: 'Refer & Earn',
    //   webUrl: false,
    //   keyName: 'referral',
    //   route: 'Refer & Earn',
    //   icon: <AntDesign name={'addusergroup'} size={20} />,
    // },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchVersion = async () => {
      const storedVersion = await AsyncStorage.getItem('version');
      return storedVersion;
    };
    fetchVersion().then(storedVersion => {
      if (!storedVersion || storedVersion !== version) {
        dispatch(sendAppVersion(version));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchVersion = async () => {
      const storedVersion = await AsyncStorage.getItem('osVersion');
      return storedVersion;
    };
    fetchVersion().then(storedVersion => {
      if (!storedVersion) {
        dispatch(sendOSVersion(Platform.Version + ''));
      }
    });
  }, [dispatch]);

  const header = ({navigation}) => {
    return (
      <ScrollView>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingVertical: 5,
            paddingRight: 10,
          }}>
          <Icon
            name="close"
            size={24}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        </View>
        <View>
          {menuItems.map(({label, route, icon, webUrl, keyName = ''}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
                if (webUrl) {
                  Linking.openURL(
                    appPreference?.[0]?.[keyName] ||
                      'https://opinionverse.live/',
                  );
                } else {
                  navigation.navigate(route);
                }
              }}
              key={label}
              style={{
                paddingLeft: 15,
                paddingVertical: 15,
                borderBottomColor: 'rgba(240, 240, 240, .8)',
                borderBottomWidth: 1,
                flexDirection: 'row',
              }}>
              {icon}
              <Text style={{fontSize: 15, marginLeft: 10, color: 'black'}}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{padding: 18}}>
          <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
            Need Help?
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              numberOfLines={5}
              style={{width: '50%', fontSize: 10, color: 'black'}}>
              Contact our support team and get instant answers.
            </Text>
            <HelpIcon />
          </View>
          <Text
            onPress={() => navigation.navigate('HelpAndSupport')}
            style={{
              fontSize: 15,
              color: 'rgba(255, 80, 80, 1)',
              fontWeight: '700',
              textDecorationLine: 'underline',
            }}>
            Visit Now
          </Text>
        </View>
      </ScrollView>
    );
  };

  function drawer() {
    return (
      <Drawer.Navigator drawerContent={header} initialRouteName={'Home1'}>
        <Drawer.Screen
          options={{headerShown: false}}
          name="Home1"
          component={TabNavigator}
        />
      </Drawer.Navigator>
    );
  }

  const Auth = createNativeStackNavigator();

  return (
    <NavigationContainer
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef);
      }}>
      {!isUserLoggedIn ? (
        authStackScreen(isSignout)
      ) : (
        <Auth.Navigator>
          <Auth.Screen
            options={{headerShown: false}}
            name="Drawer"
            component={drawer}
          />
          <Auth.Screen name="WalletScreen" component={WalletStackScreen} />
          <Auth.Screen
            name="TransactionDetails"
            component={TransactionDetails}
          />
          <Auth.Screen
            name="Withdrawal Requests"
            component={WithdrawTransaction}
          />
          <Auth.Screen
            name="Transaction History"
            component={TransactionHistory}
          />
          <Auth.Screen
            options={{headerShown: false}}
            name="Reedem Success"
            component={ReedemSuccessful}
          />
          <Auth.Screen
            name="Reedemption History"
            component={ReedemptionHistory}
          />
          <Auth.Screen name="WithdrawCash" component={WithdrawCash} />
          <Auth.Screen name="ReferAndEarn" component={ReferAndEarn} />
          <Auth.Screen
            // options={{headerShown: false}}
            name="Profile"
            component={ProfileScreen}
          />
          <Auth.Screen name="HelpAndSupport" component={HelpAndSupport} />
          <Auth.Screen name="KYCVerification" component={KYCVerification} />
          <Auth.Screen name="ProfileEdit" component={ProfileEdit} />
        </Auth.Navigator>
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  isUserLoggedIn: state.apiReducer.isUserLoggedIn,
  appPreference: state.apiReducer.appPreference,
});

export default connect(mapStateToProps, null)(App);
