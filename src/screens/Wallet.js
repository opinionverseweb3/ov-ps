import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';
import GenericPopup from '../components/ui/GenericPopUp';
import AddMoney from '../components/ui/AddMoneyBs';
import {setStore} from '../../redux/actions';
import {getWalletData} from '../../redux/actionCreater';
import Token from '../assets/icons/token.svg';
class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getWalletData();
    if (this.props.isRechargeNeeded) {
      // this.addMoney();
    }
  }

  addMoney = () => {
    this.props.setStore({
      toggleGenericModal: true,
      isRechargeNeeded: false,
    });
  };

  toggleModel = () => {
    this.props.setStore({toggleAddMoneyGenericModal: false});
  };

  render() {
    const {
      Coins = 0,
      DepositCash = 0,
      WinningCash = 0,
      Bonus = 0,
      withdrawEnabled = false,
    } = this.props.walletData;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        <ScrollView>
          <View style={styles.balance_card}>
            <View style={styles.balance_text}>
              <Text style={styles.balance_text_2}>OV Tokens</Text>
              <Text style={{fontSize: 10, color: 'lightgrey'}}>
                Tokens you earned
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Token width={22} height={22} />
                <Text style={styles.balance_number}>
                  {` ${
                    // Number(DepositCash) + Number(Bonus) + Number(WinningCash)
                    Coins
                  }`}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#FF5050',
                width: '30%',
                paddingVertical: 5,
                paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                alignSelf: 'center',
              }}
              onPress={() => this.props.setStore({showReedemFlow: true})}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Redeem
              </Text>
            </TouchableOpacity>
            {/* <View style={styles.row}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.deposit}>
                  <Text style={styles.text_3}>Deposit Coins</Text>
                  <Text
                    style={[
                      styles.text_2,
                      {color: 'red'},
                    ]}>{`🪙 ${DepositCash}`}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.addMoney()}>
                <View style={[styles.button_card]}>
                  <Text style={styles.text_4}>Add Cash</Text>
                </View>
              </TouchableOpacity>
            </View> */}
            {/* <View style={styles.row}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.deposit}>
                  <Text style={styles.text_3}>Winnings Coins</Text>
                  <Text style={[styles.text_2, {color: 'red'}]}>
                    {`🪙 ${WinningCash}`}
                  </Text>
                </View>
              </View>

              <TouchableWithoutFeedback
                onPress={() => {
                  if (!withdrawEnabled) {
                    ToastAndroid.show('Complete KYC to withdraw', 1000);
                    this.props.navigation.navigate('KYCVerification');
                  } else {
                    this.props.navigation.navigate('WithdrawCash');
                  }
                }}>
                <View style={[styles.button_card, {paddingHorizontal: 10}]}>
                  <Text style={[styles.text_4, {width: 80, paddingLeft: 18}]}>
                    Withdraw
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View> */}
            {/* <View style={styles.row}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.deposit}>
                  <Text style={styles.text_3}>Bonus Coins</Text>
                  <Text style={[styles.text_2, {color: 'red'}]}>
                    {`🪙 ${Bonus}`}
                  </Text>
                </View>
              </View>
            </View> */}
          </View>

          {/* <View style={styles.balance_card_2}>
            <View style={[styles.row, {marginBottom: 0}]}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.deposit}>
                  <Text style={styles.text_3}>Coins</Text>
                  <Text
                    style={[styles.text_2, {color: 'red'}]}>{`${Coins}`}</Text>
                </View>
              </View>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Refer & Earn')}>
                <View style={[styles.button_card, {paddingHorizontal: 32}]}>
                  <Text style={styles.text_4}>Redeem</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View> */}

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 4,
              margin: 16,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('KYCVerification');
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  paddingVertical: 16,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  justifyContent: 'space-between',
                  borderBottomColor: '#E6E6E6',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Complete Your KYC
                </Text>
                <Icon name="arrow-right" size={16} color={'black'} />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Withdrawal Requests');
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  paddingVertical: 16,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  justifyContent: 'space-between',
                  borderBottomColor: '#E6E6E6',
                }}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                  Withdrawal Requests
                </Text>
                <Icon name="arrow-right" size={16} color={'black'} />
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Transaction History');
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  paddingVertical: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E6E6E6',
                }}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                  Transaction History
                </Text>
                <Icon name="arrow-right" size={16} color={'black'} />
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Reedemption History');
              }}>
              <View
                style={{
                  marginHorizontal: 20,
                  paddingVertical: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                  Reedemption History
                </Text>
                <Icon name="arrow-right" size={16} color={'black'} />
              </View>
            </TouchableOpacity> */}
          </View>
          <View style={{height: 40}} />
        </ScrollView>
        {/* {this.props.toggleAddMoneyGenericModal && (
          <GenericPopup showCloseButton={true} closeModal={this.toggleModel}>
            <AddMoney />
          </GenericPopup>
        )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  balance_card: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 18,
    borderRadius: 5,
  },
  balance_card_2: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 18,
    borderRadius: 5,
  },
  balance_text: {
    alignItems: 'center',
    marginBottom: 14,
  },
  balance_text_2: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000000',
  },
  balance_number: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF5050',
  },
  small_card: {
    paddingHorizontal: 8,
    paddingVertical: 14,
    backgroundColor: '#FFEBEB',
    alignSelf: 'flex-start',
    borderRadius: 3,
  },
  button_card: {
    paddingHorizontal: 26,
    paddingVertical: 10,
    backgroundColor: '#FF5050',
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  deposit: {
    justifyContent: 'center',
    marginLeft: 6,
  },
  text: {
    fontSize: 11,
    color: '#969696',
  },
  text_2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_3: {
    fontSize: 12,
    color: '#000000',
  },
  text_4: {
    fontSize: 11,
    color: 'white',
    fontFamily: 'Roboto-Medium',
  },
  transaction_history: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
    paddingTop: 18,
    borderRadius: 5,
  },
  all_transaction_history_text: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF5050',
    textAlign: 'right',
  },
  history_details_card: {
    // paddingHorizontal: 7,
    borderRadius: 4,
  },
  history_details_list: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9F9F9',
    marginBottom: 2,
    justifyContent: 'space-between',
  },
  history_details_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapDispatchToProps = dispatch => ({
  setStore: params => dispatch(setStore(params)),
  getWalletData: () => dispatch(getWalletData()),
});

const mapStateToProps = state => ({
  data: state.apiReducer.data,
  error: state.apiReducer.error,
  orderId: state.apiReducer.orderId,
  walletData: state.apiReducer.walletData,
  autoDisplayAddMoney: state.apiReducer.autoDisplayAddMoney,
  toggleAddMoneyGenericModal: state.apiReducer.toggleAddMoneyGenericModal,
  isRechargeNeeded: state.apiReducer.isRechargeNeeded,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
