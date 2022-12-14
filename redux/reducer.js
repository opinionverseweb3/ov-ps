import {ToastAndroid} from 'react-native';
import {randomInteger} from '../src/util/common';
import ACTION_TYPES from './actionTypes';

const initialState = {
  data: {},
  error: '',
  categories: [],
  liveEvents: [],
  liveContests: [],
  historyContests: [],
  banners: [],
  selectedCategoryId: null,
  selectedContestCategoryId: null,
  selectedEventCategoryId: null,
  isUserLoggedIn: false,
  userData: {},
  selectedEvent: {},
  selectedLobby: {},
  showPopUp: false,
  history: false,
  disableBidBtn: false,
  contestOpinios: 0,
  userOpinios: 0,
  showContestPopUp: false,
  selectedOption: {},
  selectedOptionContest: {},
  appPreference: [],
  orderId: '',
  transactions: [],
  withdrawalArray: [],
  addMoneyOffers: [],
  walletData: {},
  toggleGenericModal: false,
  toggleAddMoneyGenericModal: false,
  isRechargeNeeded: false,
  appVersion: {},
  userProfile: {},
  orderHistory: [],
  contestLobby: [],
  userProfileTrades: {},
  tradingPortfolio: {},
  myOpinion: [],
  leaderboardData: [],
  leaderBoardContestData: [],
  leaderBoardContestDataOthers: [],
  randomInteger: randomInteger(20, 100),
  referralLink: null,
  showSucess: false,
  validCode: false,
  showReferral: false,
  showSnackBar: false,
  snackBarData: null,
  phoneNo: '',
  referralCode: '',
  code: '',
  showReedemFlow: false,
  redeeemTransacton: null,
  postRedeemption: null,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.API_PENDING:
      return {
        ...state,
      };
    case ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case ACTION_TYPES.SET_WALLET_DATA:
      return {
        ...state,
        walletData: action.payload?.result || {},
      };
    case ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ACTION_TYPES.SET_USER_TRADES:
      return {
        ...state,
        userProfileTrades: action.payload?.userTrades || {},
      };
    case ACTION_TYPES.SET_LEADERBOARD:
      return {
        ...state,
        leaderboardData: action.payload?.leaderboard || [],
      };
    case ACTION_TYPES.SET_LEADERBOARD_CONTEST:
      return {
        ...state,
        leaderBoardContestData: action.payload || [],
      };
    case ACTION_TYPES.SET_LEADERBOARD_CONTEST_OTHERS:
      return {
        ...state,
        leaderBoardContestDataOthers: action.payload || [],
      };

    case ACTION_TYPES.SET_MY_OPENION:
      return {
        ...state,
        tradingPortfolio: action.payload?.tradingPortfolio || {},
        myOpinion: action.payload?.result || [],
      };
    case ACTION_TYPES.APP_PREFERENCE:
      return {
        ...state,
        appPreference: action.payload?.result || [],
      };

    case ACTION_TYPES.APP_VERSION:
      return {
        ...state,
        appVersion: action.payload?.result || {},
      };

    case ACTION_TYPES.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload?.result || [],
      };

    case ACTION_TYPES.WITHDRAW_TRANSACTIONS:
      return {
        ...state,
        withdrawalArray: action.payload?.result || [],
      };

    case ACTION_TYPES.CATEGORY_DATA:
      let eventCategories = action.payload?.result || [];
      if (eventCategories.length > 3) {
        eventCategories.splice(3, 0, {
          id: null,
          topic: 'Expand',
          subtitle: null,
          image: null,
          status: true,
          createdAt: null,
          updatedAt: null,
        });
      }
      return {
        ...state,
        categories: eventCategories,
        banners: action.payload?.banners || [],
      };
    case ACTION_TYPES.CONTEST_CATEGORY_DATA:
      let contCategories = action?.payload || [];
      if (contCategories.length > 3) {
        contCategories.splice(3, 0, {
          id: null,
          name: 'Expand',
          imageUrl: null,
          description: false,
        });
      }
      return {
        ...state,
        contCategories: contCategories,
      };
    case ACTION_TYPES.ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload?.result || [],
      };
    case ACTION_TYPES.CONTEST_LOBBY:
      return {
        ...state,
        contestLobby: action.payload || [],
      };
    case ACTION_TYPES.ADDMONEY_OFFERS:
      return {
        ...state,
        addMoneyOffers: action.payload?.result || [],
      };
    case ACTION_TYPES.USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload?.result || {},
      };
    case ACTION_TYPES.LIVE_EVENTS:
      return {
        ...state,
        liveEvents: action.payload?.result || [],
      };

    case ACTION_TYPES.LIVE_EVENTS_PAGINATED:
      return {
        ...state,
        liveEvents: [...state.liveEvents, ...action.payload?.result] || [],
      };

    case ACTION_TYPES.LIVE_CONTESTS:
      return {
        ...state,
        liveContests: action.payload || [],
      };
    case ACTION_TYPES.LIVE_CONTESTS_HISTORY:
      return {
        ...state,
        historyContests: action.payload || [],
      };
    case ACTION_TYPES.SET_STORE:
      return {
        ...state,
        ...action.payload,
      };

    case ACTION_TYPES.VERIFY_OTP_SMS:
      return {
        ...state,
        isUserLoggedIn: action.payload,
      };
    case ACTION_TYPES.SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload?.orderId || '',
      };

    case ACTION_TYPES.USER_AUTH:
      return {
        ...state,
        userData: action.payload,
      };
    case ACTION_TYPES.GET_REFERRAL_LINK:
      return {
        ...state,
        referralLink: action.payload,
      };

    case ACTION_TYPES.POST_REDEEMPTION_REQUEST:
      return {
        ...state,
        postRedeemption: action.payload,
      };
    case ACTION_TYPES.GET_REDEEMPTION_DETAILS:
      return {
        ...state,
        redeeemTransacton: action.payload,
      };

    case ACTION_TYPES.POST_REFERRAL_CODE:
      if (action.payload.isValid) {
        // ToastAndroid.show('Code Verified. Proceed.', 1000);
        return {
          ...state,
          validCode: action.payload.isValid,
          referralCode: action.referralCode,
          showReferral: false,
          showSnackBar: true,
          snackBarData: {
            title: 'Code Verified Successfully.',
            cta: 'Okay',
            success: true,
          },
        };
      } else {
        // ToastAndroid.show('Enter a valid code.', 1000);
        return {
          ...state,
          validCode: action.payload.isValid,
          referralCode: action.referralCode,
          // showReferral: false,
          showSnackBar: true,
          snackBarData: {
            title: 'Enter a valid referral code.',
            cta: 'Okay',
            success: false,
          },
        };
      }

    default:
      return state;
  }
};

export default apiReducer;
