import ACTION_TYPES from './actionTypes.js';

export const fetchData = () => ({
  type: ACTION_TYPES.API_PENDING,
});

export const fetchSuccess = data => ({
  type: ACTION_TYPES.API_SUCCESS,
  payload: data,
});

export const fetchError = error => ({
  type: ACTION_TYPES.API_ERROR,
  payload: error,
});

export const verifyOTPSMS = otp => ({
  type: ACTION_TYPES.VERIFY_OTP_SMS,
  payload: otp,
});
export const setWithdrawTransactions = data => {
  return {
    type: ACTION_TYPES.WITHDRAW_TRANSACTIONS,
    payload: data,
  };
};
export const setUserOfferData = data => {
  return {
    type: ACTION_TYPES.USER_PROFILE,
    payload: data,
  };
};
export const setUserProfileTrades = data => {
  return {
    type: ACTION_TYPES.SET_USER_TRADES,
    payload: data,
  };
};
export const setleaderboard = data => {
  return {
    type: ACTION_TYPES.SET_LEADERBOARD,
    payload: data,
  };
};
export const setContestLeaderBoard = data => {
  return {
    type: ACTION_TYPES.SET_LEADERBOARD_CONTEST,
    payload: data,
  };
};
export const setContestLeaderBoardOthers = data => {
  return {
    type: ACTION_TYPES.SET_LEADERBOARD_CONTEST_OTHERS,
    payload: data,
  };
};
export const setAdddMoneyOffers = data => {
  return {
    type: ACTION_TYPES.ADDMONEY_OFFERS,
    payload: data,
  };
};
export const setMyOpenions = data => {
  return {
    type: ACTION_TYPES.SET_MY_OPENION,
    payload: data,
  };
};
export const setWalletData = data => ({
  type: ACTION_TYPES.SET_WALLET_DATA,
  payload: data,
});
export const setOrderId = data => ({
  type: ACTION_TYPES.SET_ORDER_ID,
  payload: data,
});
export const setTransactions = data => ({
  type: ACTION_TYPES.SET_TRANSACTIONS,
  payload: data,
});
export const setCategoryData = data => ({
  type: ACTION_TYPES.CATEGORY_DATA,
  payload: data,
});
export const setContestCategoryData = data => ({
  type: ACTION_TYPES.CONTEST_CATEGORY_DATA,
  payload: data,
});
export const setLiveEvents = data => ({
  type: ACTION_TYPES.LIVE_EVENTS,
  payload: data,
});

export const setLiveEventsPagedData = data => ({
  type: ACTION_TYPES.LIVE_EVENTS_PAGINATED,
  payload: data,
});

export const setLiveContests = data => ({
  type: ACTION_TYPES.LIVE_CONTESTS,
  payload: data,
});

export const setHistoryContests = data => ({
  type: ACTION_TYPES.LIVE_CONTESTS_HISTORY,
  payload: data,
});

export const setAppPreference = data => ({
  type: ACTION_TYPES.APP_PREFERENCE,
  payload: data,
});

export const setAppVersion = data => ({
  type: ACTION_TYPES.APP_VERSION,
  payload: data,
});

export const setOrderHistory = data => ({
  type: ACTION_TYPES.ORDER_HISTORY,
  payload: data,
});
export const setContestLobby = data => ({
  type: ACTION_TYPES.CONTEST_LOBBY,
  payload: data,
});
export const setStore = data => ({
  type: ACTION_TYPES.SET_STORE,
  payload: data,
});
export const isUserLoggedIn = status => ({
  type: ACTION_TYPES.VERIFY_OTP_SMS,
  payload: status,
});

export const userAuthentation = userData => ({
  type: ACTION_TYPES.USER_AUTH,
  payload: userData,
});

export const setReferralLink = data => ({
  type: ACTION_TYPES.GET_REFERRAL_LINK,
  payload: data,
});

export const postReferralLink = (data, referral_code) => ({
  type: ACTION_TYPES.POST_REFERRAL_CODE,
  payload: data,
  referralCode: referral_code,
});

export const postRedeem = data => ({
  type: ACTION_TYPES.POST_REDEEMPTION_REQUEST,
  payload: data,
});

export const getRedeemTransaction = data => ({
  type: ACTION_TYPES.GET_REDEEMPTION_DETAILS,
  payload: data,
});
