import {CommonActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {last} from 'lodash';

let _navigator;

export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

export const _navigate = (routeName, params) => {
  _navigator?.navigate(routeName, params);
};

// Add routeName to ROUTES_WITH_PUSH_N=>AVIGATION array in src/app/constants.js to navigate to same screen
export const push = (routeName, params) => {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  );
};

export const replace = (routeName, params) => {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params,
    }),
  );
};

export const pop = (n = 1) => {
  _navigator.dispatch(StackActions.pop({n}));
};

export const dispatch = payload => {
  _navigator.dispatch(payload);
};

export const popToTop = () => {
  _navigator.dispatch(StackActions.popToTop());
};
