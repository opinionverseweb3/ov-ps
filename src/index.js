import React, {useEffect} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import Store from '../redux/store';

import AppNavigator from './lib/router';
import CodePush from 'react-native-code-push';
import Wrapper from './lib/wrapper';

// import {LeapEVMSdk, chainConfig} from '@leapwallet/leap-evm-js';

// const loginConfig = {
//   auth_service: 'web3auth', // either 'web3auth' or 'ramper'
//   config: {appName: 'opinionVerse'},
// };

// const leapCall = async () => {
//   let res = await LeapEVMSdk.init(chainConfig.ploygon.mainnet, loginConfig);
//   return res;
// };

if (process.env.NODE_ENV === 'development' && __DEV__ && false) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    // trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  });
}

// import messaging from '@react-native-firebase/messaging';

let CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: 'Download Available Update!',
  },
};

// const setUpCloudMessagingPermissionRequest = async () => {
//   //to be used only for IOS
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled && __DEV__) {
//     console.log('Authorization status:', authStatus);
//   }
// };

const AppIndex = AppNavigator;

const App = () => {
  useEffect(() => {
    CodePush.sync(CodePushOptions);
    // leapCall();
  }, []);

  return (
    <Provider store={Store}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <SafeAreaView style={{flex: 1}}>
        <AppIndex />
        <Wrapper />
      </SafeAreaView>
    </Provider>
  );
};

export default CodePush(CodePushOptions)(App);
