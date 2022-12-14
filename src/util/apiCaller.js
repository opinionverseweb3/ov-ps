import AsyncStorage from '@react-native-async-storage/async-storage';
const DEV_API_URL_1 = 'http://3.6.176.41:50003/v1/app';
const DEV_API_URL_2 = 'http://3.6.176.41:50002/v1/app';
const DEV_API_URL_3 = 'http://3.6.176.41:8080/tournament';
const DEV_API_URL_4 = 'http://3.6.176.41:8080/poll';
const DEV_API_URL_5 = 'http://3.6.176.41:8080/app/v1';
const PROD_API_URL_1 = 'https://opinionverse.live:3700/v1/app';
const PROD_API_URL_2 = 'https://opinionverse.live:3701/v1/app';
const PROD_API_URL_3 =
  'http://tournament-elb-650083836.ap-south-1.elb.amazonaws.com/tournament';
const PROD_API_URL_4 =
  'http://tournament-elb-650083836.ap-south-1.elb.amazonaws.com/poll';
const PROD_API_URL_5 =
  'http://tournament-elb-650083836.ap-south-1.elb.amazonaws.com/app/v1';
const isDebugMode = false;
export const referral_url = isDebugMode ? DEV_API_URL_5 : PROD_API_URL_5;
// use __DEV__ for auto check the mode;
export const pollBaseUrl = isDebugMode ? DEV_API_URL_4 : PROD_API_URL_4;
export const base_url_3x00 = isDebugMode ? DEV_API_URL_1 : PROD_API_URL_1;
export const base_url_3x01 = isDebugMode ? DEV_API_URL_2 : PROD_API_URL_2;
export const base_tournament_url = isDebugMode ? DEV_API_URL_3 : PROD_API_URL_3;

const fetch = window.fetch;

export default async function callApi(endpoint, method = 'get', body) {
  let token = '';

  const getData = async key => {
    try {
      const value = await AsyncStorage.getItem('@coinUserToken');

      if (value !== null) {
        // value previously stored
        token = value;
      }
    } catch (e) {
      // error reading value
    }
  };
  await getData();
  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${base_url_3x00}/${endpoint}`, options);
    const response_1 = await response.json();
    return response_1;
  } catch (err) {}
}
