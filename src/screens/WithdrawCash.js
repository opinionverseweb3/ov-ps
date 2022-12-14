import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {placeWithdrawalRequest} from '../../redux/actionCreater';
import RupeeCoin from '../assets/icons/rupee_coin.svg';
import Upi from '../assets/icons/upi.svg';
import Bank from '../assets/icons/bank.svg';
import {RadioButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class WithdrawCash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      checked: 0,
      price: '',
      upiId: '',
    };
  }

  render() {
    const minAmount = this.props.appPreference[0]?.min_withdraw_amount || 0;
    const maxAmount = this.props.appPreference[0]?.max_withdraw_amount || 0;
    const disabledButton =
      this.state.price.length === 0 ||
      this.state.upiId.length === 0 ||
      Number(this.state.price) < minAmount ||
      Number(this.state.price) > maxAmount;
    const {gatewayFee = 5} = this.props.walletData;

    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
            <View style={styles.withdraw_cash_container}>
              <View style={styles.balance_text}>
                <Text style={styles.balance_text_2}>Winning Coins</Text>
                <Text
                  style={
                    styles.balance_number
                  }>{`🪙 ${this.props.walletData.WinningCash}`}</Text>
              </View>
              <View>
                <Text
                  style={
                    styles.text_2
                  }>{`Amount to withdraw (Min 🪙 ${minAmount})  ( Max 🪙 ${maxAmount}) `}</Text>
                <View style={styles.input}>
                  <View style={styles.icon_con}>
                    <RupeeCoin
                      height={12}
                      width={12}
                      style={styles.rupee_svg}
                    />
                  </View>
                  <TextInput
                    style={{
                      height: 40,
                      width: '100%',
                    }}
                    keyboardType={'number-pad'}
                    maxLength={15} //TODO: set max length
                    noCharCount
                    onChangeText={abc => {
                      const aplha = abc.replace(/[^a-zA-Z0-9 ]/g, '');
                      this.setState({price: aplha});
                    }}
                    underlineColorAndroid={'transparent'}
                    value={this.state.price}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="information"
                    size={16}
                    color="#000000"
                    style={{marginRight: 8}}
                  />
                  <Text style={[styles.text_2, {fontWeight: 'bold'}]}>
                    {this.state.price && this.state.price > gatewayFee
                      ? `🪙${
                          this.state.price - gatewayFee
                        } will be deposited in you bank`
                      : `Gateway charges are flat 🪙${gatewayFee}`}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              {/*  <Text style={styles.text_3}>Select Withdraw Methods</Text> */}
              <Text style={styles.text_3}>Enter UPI ID</Text>
              <TouchableWithoutFeedback
                onPress={() => this.setState({checked: 0})}>
                <View
                  style={{
                    paddingHorizontal: 22,
                    paddingVertical: 12,
                    backgroundColor:
                      this.state.checked == 0 ? '#F9F9F9' : 'white',
                  }}>
                  <View style={styles.upi}>
                    <View style={styles.row}>
                      <View
                        style={[
                          styles.round,
                          {
                            backgroundColor:
                              this.state.checked == 0 ? 'white' : '#F9F9F9',
                          },
                        ]}>
                        <Upi height={40} width={40} style={{}} />
                      </View>
                      <View>
                        <Text style={styles.upi_text}>UPI</Text>
                      </View>
                    </View>
                    {/* <View>
                      <RadioButton
                        value="first"
                        status={
                          this.state.checked === 0 ? 'checked' : 'unchecked'
                        }
                        onPress={() => this.setState({checked: 0})}
                      />
                    </View> */}
                  </View>
                  {this.state.checked === 0 && (
                    <View>
                      <Text style={styles.text_4}>Enter Your UPI ID</Text>
                      <View style={styles.input_2}>
                        <TextInput
                          style={{
                            height: 40,
                            width: '100%',
                          }}
                          keyboardType={'alphaNumeric'}
                          maxLength={60} //TODO: set max length
                          noCharCount
                          onChangeText={abc => {
                            this.setState({upiId: abc});
                          }}
                          underlineColorAndroid={'transparent'}
                          value={this.state.upiId}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
              {/* <TouchableWithoutFeedback
                onPress={() => this.setState({checked: 1})}>
                <View
                  style={{
                    paddingHorizontal: 22,
                    paddingVertical: 12,
                    backgroundColor:
                      this.state.checked === 1 ? '#F9F9F9' : 'white',
                    marginBottom: 20,
                  }}>
                  <View style={styles.upi}>
                    <View style={styles.row}>
                      <View
                        style={[
                          styles.round,
                          {
                            backgroundColor:
                              this.state.checked === 1 ? 'white' : '#F9F9F9',
                          },
                        ]}>
                        <Bank height={20} width={20} style={{}} />
                      </View>
                      <View>
                        <Text style={styles.upi_text}>Bank</Text>
                      </View>
                    </View>
                    <View>
                      <RadioButton
                        value="first"
                        status={
                          this.state.checked === 1 ? 'checked' : 'unchecked'
                        }
                        onPress={() => this.setState({checked: 1})}
                      />
                    </View>
                  </View>
                  {this.state.checked === 1 && (
                    <View>
                      <View style={styles.name}>
                        <Text style={styles.text_4}>Enter Your Name *</Text>
                        <View style={styles.input_2}>
                          <TextInput
                            style={{flex: 1, marginLeft: 6, height: 45}}
                          />
                        </View>
                      </View>
                      <View style={styles.name}>
                        <Text style={styles.text_4}>
                          Enter Your Account Number *
                        </Text>
                        <View style={styles.input_2}>
                          <TextInput
                            style={{flex: 1, marginLeft: 6, height: 45}}
                          />
                        </View>
                      </View>
                      <View style={styles.name}>
                        <Text style={styles.text_4}>
                          Enter Bank IFSC code *
                        </Text>
                        <View style={styles.input_2}>
                          <TextInput
                            style={{flex: 1, marginLeft: 6, height: 45}}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback> */}
            </View>
            <View style={styles.button_cont}>
              <Text style={styles.text_6}>
                *Can Take 24-48 hrs to get reflected in you account
              </Text>
              <TouchableWithoutFeedback
                disabled={disabledButton}
                onPress={() => {
                  this.props.placeWithdrawalRequest({
                    requestAmount: this.state.price - gatewayFee,
                    upi: this.state.upiId,
                    navigation: this.props.navigation,
                  });
                }}>
                <View
                  style={[
                    styles.button_card,
                    {
                      backgroundColor: disabledButton ? 'grey' : '#FF5050',
                    },
                  ]}>
                  <Text style={styles.text_5}>
                    {this.state.price.length === 0
                      ? 'Invalid Amount'
                      : this.state.upiId.length === 0
                      ? 'Invalid UPI ID'
                      : Number(this.state.price) < minAmount
                      ? `Minimum Amount is 🪙${minAmount}`
                      : Number(this.state.price) > maxAmount
                      ? `Maximum Amount is 🪙${maxAmount}`
                      : 'Request Withdraw'}{' '}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  withdraw_cash_container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 18,
    borderRadius: 5,
  },
  balance_text: {
    alignItems: 'center',
    marginBottom: 14,
  },
  balance_text_2: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: 'black',
  },
  balance_number: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FF5050',
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#403838',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  input_2: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  rupee_svg: {},
  icon_con: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#F9F9F9',
  },
  text_2: {
    fontWeight: '400',
    fontSize: 12,
    color: '#969696',
  },
  text_3: {
    fontWeight: '700',
    fontSize: 14,
    color: '#FF5050',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  text_4: {
    fontSize: 12,
    color: '#403838',
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#F9F9F9',
  },
  upi: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upi_text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginTop: 8,
  },
  button_card: {
    paddingHorizontal: '20%',
    paddingVertical: 12,
    backgroundColor: '#FF5050',
    borderRadius: 5,
    marginTop: 16,
  },
  text_5: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  text_6: {
    fontSize: 10,
    textAlign: 'center',
    color: '#969696',
  },
  button_cont: {
    marginTop: 20,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },
});

const mapDispatchToProps = dispatch => ({
  placeWithdrawalRequest: data => dispatch(placeWithdrawalRequest(data)),
});

const mapStateToProps = state => ({
  data: state.apiReducer.data,
  error: state.apiReducer.error,
  walletData: state.apiReducer.walletData,
  appPreference: state.apiReducer.appPreference,
});

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawCash);
