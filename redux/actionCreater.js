import axios from 'axios';
import callApi, {
  base_url_3x00,
  base_url_3x01,
  base_tournament_url,
  referral_url,
} from '../src/util/apiCaller';
import {
  fetchSuccess,
  fetchError,
  isUserLoggedIn,
  userAuthentation,
  setLiveEvents,
  setCategoryData,
  setOrderHistory,
  setStore,
  setAppPreference,
  setAppVersion,
  setOrderId,
  setTransactions,
  setWalletData,
  setWithdrawTransactions,
  setAdddMoneyOffers,
  setUserProfileTrades,
  setUserOfferData,
  setMyOpenions,
  setleaderboard,
  setLiveContests,
  setContestLobby,
  setContestCategoryData,
  setContestLeaderBoard,
  setContestLeaderBoardOthers,
  setHistoryContests,
  setLiveEventsPagedData,
  setReferralLink,
  postReferralLink,
  postRedeem,
  getRedeemTransaction,
} from './actions';
import {ToastAndroid, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {_navigate} from '../src/lib/navigation';

// `${resourceUrl}/engine/apis/agent/match`, apiParams, tempConfig
export const actionCreator = url => dispatch => {
  return new Promise(() => {
    axios
      .get(`${base_url_3x00}/${url}`)
      .then(response => {
        dispatch(fetchSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  });
};

export const sendAppVersion = version => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  const bodyParameters = {
    appVersion: version,
  };
  axios
    .put(`${base_url_3x00}/user/device_version`, bodyParameters, config)
    .then(async ({data}) => {
      await AsyncStorage.setItem('version', version);
    })
    .catch(e => {});
};

export const sendOSVersion = version => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  const bodyParameters = {
    osVersion: version,
  };
  axios
    .put(`${base_url_3x00}/user/os_version`, bodyParameters, config)
    .then(async ({data}) => {
      await AsyncStorage.setItem('osVersion', version);
    })
    .catch(e => {});
};
export const getorderId =
  ({addAmount = 500}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const bodyParameters = {
      amount: addAmount,
    };
    axios
      .post(`${base_url_3x00}/add_money/create_order`, bodyParameters, config)
      .then(({data}) => {
        dispatch(setOrderId(data));
      })
      .catch(e => {
        ToastAndroid.show(e.message, 750);
      });
  };

export const updateDepositeOrder =
  ({addAmount = 500, orderId = '', paymentStatus = '', paymentResponse = ''}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const bodyParameters = {
      amount: addAmount,
      paymentStatus: paymentStatus,
      paymentResponse: paymentResponse,
    };
    axios
      .put(
        `${base_url_3x00}/add_money/update_order/${orderId}`,
        bodyParameters,
        config,
      )
      .then(({data}) => {
        // dispatch(
        //   setStore({
        //     toggleGenericModal: false,
        //     orderId: '',
        //     toggleAddMoneyGenericModal: false,
        //   }),
        // );
      })
      .catch(e => {
        // dispatch(
        //   setStore({
        //     toggleGenericModal: false,
        //     orderId: '',
        //     toggleAddMoneyGenericModal: false,
        //   }),
        // );
      });
  };

export const getWithdrawRequest = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  axios
    .get(`${base_url_3x00}/withdraw_requests`, config)
    .then(({data}) => {
      dispatch(setWithdrawTransactions(data));
    })
    .catch(e => {});
};

export const getOffers = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  axios
    .get(`${base_url_3x00}/money_pack`, config)
    .then(({data}) => {
      if (data?.success || false) {
        dispatch(setAdddMoneyOffers(data));
      } else {
        ToastAndroid.show(data.message, 750);
      }
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });
};

export const getUserProfile = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  axios
    .get(`${base_url_3x00}/user`, config)
    .then(({data}) => {
      if (data?.success || false) {
        dispatch(setUserOfferData(data));
      }
    })
    .catch(e => {
      // ToastAndroid.show(e.message, 750);
    });
};

export const getWalletData = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  axios
    .get(`${base_url_3x00}/wallet`, config)
    .then(({data}) => {
      if (data?.success || false) {
        dispatch(setWalletData(data));
      } else {
        ToastAndroid.show(data.message, 750);
      }
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });
};

export const getTransaction = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  axios
    .get(`${base_url_3x00}/user/transactions`, config)
    .then(({data}) => {
      if (data?.success || false) {
        dispatch(setTransactions(data));
      } else {
        ToastAndroid.show(data.message, 750);
      }
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });
};

export const getAppPreferences = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  axios
    .get(`${base_url_3x00}/app_preferences`, config)
    .then(({data}) => {
      dispatch(setAppPreference(data));
    })
    .catch(e => {});
};

export const placeWithdrawalRequest =
  ({
    requestAmount = 0,
    withdrawMethod = 'upi',
    upi = '',
    bankName = '',
    bankAccountNumber = '',
    accountHolderName = '',
    ifscCode = '',
    navigation,
  }) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const bodyParameters = {
      requestAmount: Number(requestAmount),
      withdrawMethod: withdrawMethod,
      upi: upi,
      bankName: bankName,
      bankAccountNumber: bankAccountNumber,
      accountHolderName: accountHolderName,
      ifscCode: ifscCode,
    };

    axios
      .post(`${base_url_3x00}/withdraw_requests`, bodyParameters, config)
      .then(({data}) => {
        navigation.pop();
        dispatch(
          setStore({
            showPopUp: false,
          }),
        );
        dispatch(getWalletData({}));
      })
      .catch(e => {
        // navigation.pop();
        // dispatch(
        //   setStore({
        //     showPopUp: false,
        //   }),
        // );
        // alert(JSON.stringify(e));
        ToastAndroid.show(e.message, 750);
      });
  };

export const apiCall =
  ({contestId = null, isFirstCall = false}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .get(`${base_url_3x01}/category`, config)
      .then(({data}) => {
        dispatch(setCategoryData(data));
        if (isFirstCall) {
          dispatch(setStore({selectedEventCategoryId: data?.result?.[0].id}));
          dispatch(getLiveEvents({contestId: data?.result?.[0].id}));
        }
      })
      .catch(e => {});
  };

export const getCatsContest =
  ({contestId = null, isFirstCall = false}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .get(`${base_tournament_url}/category/`, config)
      .then(({data}) => {
        dispatch(setContestCategoryData(data.response.category));
        if (isFirstCall) {
          dispatch(
            setStore({
              selectedContestCategoryId: data?.response?.category?.[0]?.id,
            }),
          );
          dispatch(
            getLiveContests({contestId: data?.response?.category?.[0]?.id}),
          );
        }
      })
      .catch(e => {});
  };

export const getOrderHistory =
  ({contestId = null}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .get(`${base_url_3x01}/bid/${contestId}`, config)
      .then(({data}) => {
        if (data?.success || false) {
          dispatch(setOrderHistory(data));
        } else {
          ToastAndroid.show(data.message, 750);
        }
      })
      .catch(e => {
        ToastAndroid.show(e.message, 750);
      });
  };

export const getContestLobby =
  ({contestId = null, history = false}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    let url = '';
    if (!history) {
      url = `${base_tournament_url}/lobby?contestId=${contestId}`;
    } else {
      url = `${base_tournament_url}/lobby/history/me?contestId=${contestId}`;
    }
    axios
      .get(url, config)
      .then(async ({data}) => {
        if (data?.response || false) {
          let newData = data?.response?.contestLobby || [];
          for (let i = 0; i < newData.length; i++) {
            newData[i].lobbyOpinions = await getLobbyOpinions(newData[i].id);
            newData[i].lobbyUserOpinions = await getLobbyUserOpinions(
              newData[i].id,
            );
          }
          dispatch(setContestLobby(newData));
        } else {
          ToastAndroid.show(data.message, 750);
        }
      })
      .catch(e => {
        ToastAndroid.show(e.message, 750);
      });

    axios({
      method: 'get',
      url: `${base_tournament_url}/opinion/contest/${contestId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({data}) => {
        dispatch(
          setStore({
            contestOpinios: data.response.totalOpinions,
          }),
        );
      })
      .catch(e => {
        ToastAndroid.show(e.message, 750);
      });

    axios({
      method: 'get',
      url: `${base_tournament_url}/opinion/contest/${contestId}/user/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({data}) => {
        dispatch(
          setStore({
            userOpinios: data.response.totalOpinions,
          }),
        );
      })
      .catch(e => {
        ToastAndroid.show(e.message, 750);
      });
  };

const getLobbyOpinions = async lobbyID => {
  let count = 0;

  const token = await AsyncStorage.getItem('@coinUserToken');
  await axios({
    method: 'get',
    url: `${base_tournament_url}/opinion/lobby/${lobbyID}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      count = data.response.totalOpinions;
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });

  return count;
};

const getLobbyUserOpinions = async lobbyID => {
  let count = 0;

  const token = await AsyncStorage.getItem('@coinUserToken');
  await axios({
    method: 'get',
    url: `${base_tournament_url}/opinion/lobby/${lobbyID}/user/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      count = data.response.totalOpinions;
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });

  return count;
};

const getContestOpinions = async conID => {
  let count = 0;

  const token = await AsyncStorage.getItem('@coinUserToken');
  await axios({
    method: 'get',
    url: `${base_tournament_url}/opinion/contest/${conID}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      count = data.response.totalOpinions;
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });

  return count;
};

export const onPlaceBid =
  ({
    optionId,
    navigation,
    numOfbids,
    potentialWinnigPerBid,
    potentialWinningTotal,
    pollId,
  }) =>
  async dispatch => {
    dispatch(
      setStore({
        disableBidBtn: true,
      }),
    );
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const bodyParameters = {
      categorical_event_option_id: optionId,
      count: numOfbids,
    };

    axios
      .post(`${base_url_3x01}/bid`, bodyParameters, config)
      .then(({data}) => {
        if (!data?.success || false) {
          dispatch(
            setStore({
              showPopUp: false,
              disableBidBtn: false,
              isRechargeNeeded: true,
            }),
          );
          navigation.navigate('WalletScreen');
          ToastAndroid.show(data.message, 750);
        } else {
          navigation.pop();
          dispatch(
            setStore({
              showPopUp: false,
              disableBidBtn: false,
              showSucess: true,
            }),
          );
          dispatch(getWalletData({}));
          // dispatch(apiCall({}));
          // dispatch(getLiveEvents({}));
          // ToastAndroid.show('Your Opinion Was Successfully Placed', 750);
        }
      })
      .catch(e => {
        dispatch(
          setStore({
            disableBidBtn: false,
          }),
        );

        ToastAndroid.show(e.message, 750);
      });
  };

export const onEditProfile =
  ({paramenters, navigation}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const bodyParameters = {
      ...paramenters,
    };

    axios
      .put(`${base_url_3x00}/user/profile`, bodyParameters, config)
      .then(({data}) => {
        navigation.pop();
        if (data?.success) {
          dispatch(getUserProfile({}));
        } else {
          ToastAndroid.show(data.message, 750);
        }
      })
      .catch(e => {
        ToastAndroid.show(e.message, 750);
      });
  };

export const getProfileTradeData = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  axios
    .get(`${base_url_3x01}/trade`, config)
    .then(({data}) => {
      if (data?.success || false) {
        dispatch(setUserProfileTrades(data));
      } else {
        ToastAndroid.show(data.message, 750);
      }
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });
};

export const getLiveEvents =
  ({contestId = null, offset = 0, count = 5}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    if (contestId === null) {
      axios
        .get(
          `${base_url_3x01}/categorical?eventType=${'active'}&offset=${offset}&count=${count}`,
          config,
        )

        .then(({data}) => {
          if (data?.success || false) {
            if (offset > 0) {
              dispatch(setLiveEventsPagedData(data));
            } else {
              dispatch(setLiveEvents(data));
            }
          } else {
            ToastAndroid.show(data.message, 750);
          }
        })
        .catch(e => {
          // ToastAndroid.show(e.message, 750);
        });
    } else {
      axios
        .get(
          `${base_url_3x01}/categorical?eventType=${'active'}&category=${contestId}&offset=${offset}&count=${count}`,
          config,
        )
        .then(({data}) => {
          if (data?.success || false) {
            if (offset > 0) {
              dispatch(setLiveEventsPagedData(data));
            } else {
              dispatch(setLiveEvents(data));
            }
          } else {
            ToastAndroid.show(data.message, 750);
          }
        })
        .catch(e => {
          ToastAndroid.show(e.message, 750);
        });
    }
  };

export const getLiveContests =
  ({contestId = null}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    if (contestId === null) {
      axios
        .get(
          `${base_tournament_url}/contest/?startDate=29-04-2022&endDate=29-04-2022&offset=0&count=100`,
          config,
        )

        .then(async ({data}) => {
          if (data?.response?.skillContests || false) {
            let newData = data.response.skillContests;
            for (let i = 0; i < newData.length; i++) {
              newData[i].contestOpinions = await getContestOpinions(
                newData[i].id,
              );
            }

            dispatch(setLiveContests(newData));
          } else {
            ToastAndroid.show(data.message, 750);
          }
        })
        .catch(e => {
          ToastAndroid.show(e.message, 750);
        });
    } else {
      axios
        .get(
          `${base_tournament_url}/contest/${contestId}?startDate=29-04-2022&endDate=29-04-2022&offset=0&count=20`,
          config,
        )
        .then(async ({data}) => {
          if (data?.response?.skillContests || false) {
            let newData = data.response.skillContests;
            for (let i = 0; i < newData.length; i++) {
              newData[i].contestOpinions = await getContestOpinions(
                newData[i].id,
              );
            }
            dispatch(setLiveContests(newData));
          } else {
            ToastAndroid.show(data.message, 750);
          }
        })
        .catch(e => {
          ToastAndroid.show(e.message, 750);
        });
    }
  };

export const getHistoryContests =
  ({contestId = null}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    if (contestId === null) {
      axios
        .get(
          `${base_tournament_url}/contest/history/me?offset=0&count=100`,
          config,
        )
        .then(async ({data}) => {
          if (data?.response?.skillContests || false) {
            let newData = data?.response?.skillContests || [];
            for (let i = 0; i < newData.length; i++) {
              newData[i].contestOpinions = await getContestOpinions(
                newData[i].id,
              );
            }

            dispatch(setHistoryContests(newData));
          } else {
            ToastAndroid.show(data.message, 750);
          }
        })
        .catch(e => {
          ToastAndroid.show(e.message, 750);
        });
    } else {
      axios
        .get(
          `${base_tournament_url}/contest/${contestId}?startDate=29-04-2022&endDate=29-04-2022&offset=0&count=20`,
          config,
        )
        .then(async ({data}) => {
          if (data?.response?.skillContests || false) {
            let newData = data.response.skillContests;
            for (let i = 0; i < newData.length; i++) {
              newData[i].contestOpinions = await getContestOpinions(
                newData[i].id,
              );
            }
            dispatch(setHistoryContests(newData));
          } else {
            ToastAndroid.show(data.message, 750);
          }
        })
        .catch(e => {
          ToastAndroid.show(e.message, 750);
        });
    }
  };

export const getMyOpenion =
  ({eventType = null}) =>
  async dispatch => {
    const token = await AsyncStorage.getItem('@coinUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    axios
      .get(`${base_url_3x01}/categorical?eventType=${eventType}`, config)
      .then(({data}) => {
        if (data?.success || false) {
          dispatch(setMyOpenions(data));
        } else {
          ToastAndroid.show(data.message, 750);
        }

        // dispatch(setLiveEvents(data));
      })
      .catch(e => {
        ToastAndroid.show(e.message, 750);
      });
  };

export const getLeaderBoradData = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  axios
    .get(`${base_url_3x01}/leaderboard`, config)
    .then(({data}) => {
      if (data?.success || false) {
        dispatch(setleaderboard(data));
      } else {
        ToastAndroid.show(data.message, 750);
      }

      // dispatch(setLiveEvents(data));
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });
};

export const getContestLeaderBoardData = lobbyID => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // headers: {Authorization: `Bearer ${token}`},
  };

  axios
    .get(
      `${base_tournament_url}/opinion/leaderboard?lobbyId=${lobbyID}&offset=0&count=100`,
      config,
    )
    .then(({data}) => {
      if (data?.response) {
        dispatch(setContestLeaderBoard(data?.response?.userRanks));
        dispatch(setContestLeaderBoardOthers(data?.response?.ranks));
      } else {
        ToastAndroid.show(data.message, 750);
      }
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });
};

export const getOTP = mobile => dispatch => {
  axios
    .post(`${base_url_3x00}/auth/send_otp`, {
      mobile: mobile,
      currencyType: 'coin',
    })
    .then(({data}) => {
      ToastAndroid.show('OTP Sent Successfully', 750);
      // storeData('@coinUserToken', data.token);
      // dispatch(userAuthentation(data));
    });
  // dispatch(verifyOTPSMS(true));
};

export const checkUserLoggedIn = () => async dispatch => {
  getData('@coinUserToken').then(value => {
    dispatch(isUserLoggedIn(value));
  });
  getData('mobile').then(value => {
    dispatch(isUserLoggedIn(value));
  });
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

const storeData = async (key, value, mobile) => {
  try {
    await AsyncStorage.setItem(key, value);
    await AsyncStorage.setItem('mobile', mobile);
  } catch (e) {
    // saving error
  }
};

export const authenticateUser =
  (mobile, otp, referral_code = '') =>
  (dispatch, getState) => {
    const store = getState();
    const validCode = store?.apiReducer?.validCode;
    callApi(
      `auth/login?referralCode=${validCode ? referral_code : ''}`,
      'post',
      {
        mobile: mobile,
        otp: otp,
        currencyType: 'coin',
      },
    ).then(res => {
      storeData('@coinUserToken', res.token, mobile);
      dispatch(isUserLoggedIn(res.success));
      dispatch(userAuthentation(res));
    });
  };
export const placeBid =
  (lobbyID, opinion, contestID, navigation) => async dispatch => {
    dispatch(
      setStore({
        disableBidBtn: true,
      }),
    );
    // const navigation = useNavigation();
    const token = await AsyncStorage.getItem('@coinUserToken');

    // headers: {Authorization: `Bearer ${token}`},

    const bodyParameters = {
      lobbyId: lobbyID,
      opinion: opinion,
    };
    axios({
      method: 'post',
      url: `${base_tournament_url}/opinion/bid`,
      data: bodyParameters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // validateStatus: status => {
      //   return true;
      // },
    })
      .then(({data}) => {
        if (data?.error) {
          dispatch(
            setStore({
              disableBidBtn: false,
            }),
          );
          ToastAndroid.show(data.error.details, 750);
        } else {
          dispatch(
            setStore({
              showContestPopUp: false,
              selectedOptionContest: {},
              disableBidBtn: false,
            }),
          );

          dispatch(getContestLobby({contestId: contestID}));
          navigation.navigate('Tournament Listing');
          ToastAndroid.show('Your Opinion Placed Successfully', 750);
        }
      })
      .catch(e => {
        dispatch(
          setStore({
            disableBidBtn: false,
          }),
        );
        ToastAndroid.show(e.response.data.error.details, 750);
      });
  };
export const getReferralCode = () => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  axios
    .get(`${referral_url}/referral/user`, config)
    .then(({data}) => {
      dispatch(setReferralLink(data.response));
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });
};

export const postReferralCode = (referral_code, mobile) => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  const bodyParameters = {
    referralCode: referral_code,
    mobileNumber: mobile,
  };
  axios
    .post(`${referral_url}/referral/user/valid`, bodyParameters, config)
    .then(({data}) => {
      if (data) {
        dispatch(postReferralLink(data.response, referral_code));
      }
    })
    .catch(e => {
      ToastAndroid.show(e.message, 750);
    });
};

export const postRedeemption = (userId, coins, bonusCash) => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  const bodyParameters = {
    userId: userId,
    coinsToRedeem: coins,
  };
  axios
    .post(`${base_url_3x00}/redeem`, bodyParameters, config)
    .then(({data}) => {
      if (data) {
        _navigate('Reedem Success', {bonusCash});
        dispatch(postRedeem(data.response));
        dispatch(getWalletData());
      }
    })
    .catch(e => {
      Alert.alert(
        'Redeem Failed',
        e?.response?.data?.error?.message || 'Error Occurred',
      );
      // ToastAndroid.show(
      //   e?.response?.data?.error?.message || 'Error Occurred',
      //   750,
      // );
    });
};

export const getRedeemptionDetails = userId => async dispatch => {
  const token = await AsyncStorage.getItem('@coinUserToken');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };
  axios
    .get(`${base_url_3x00}/redeem?userId=${userId}`, config)
    .then(({data}) => {
      dispatch(getRedeemTransaction(data.response));
    })
    .catch(e => {
      // ToastAndroid.show(e, 750);
    });
};
