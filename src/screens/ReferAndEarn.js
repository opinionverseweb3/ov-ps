import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import apiCall from '../../redux/actionCreater';
import LinearGradient from 'react-native-linear-gradient';

class ReferAndEarn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#E5E5E5',
        }}>
        <ScrollView>
          <View style={styles.balance_card}>
            <View style={styles.balance_text}>
              <Text style={styles.balance_text_2}>Refer & Earn</Text>
              <Text style={styles.balance_number}>Up to 🪙5,000</Text>
              <Text style={styles.balance_text_2}>Per Friend</Text>
            </View>
          </View>

          <View style={styles.balance_card_3}>
            <Text style={styles.text_5}>Share Your Referral Code</Text>
            <View style={styles.refer_code}>
              <View style={styles.ref}>
                <Text style={styles.text_6}>ABCD78FD987</Text>
              </View>
              <TouchableWithoutFeedback>
                <LinearGradient
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0}}
                  colors={['rgba(255, 80, 80, 1)', 'rgba(255, 80, 80, 1)']}
                  style={styles.button}>
                  <Text style={styles.text_4}>COPY</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableWithoutFeedback>
                <View style={styles.round}>
                  <Image
                    source={require('../assets/images/ic_share_instagram.webp')}
                    style={styles.image}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <View style={styles.round}>
                  <Image
                    source={require('../assets/images/facebook.png')}
                    style={styles.image}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <View style={styles.round}>
                  <Image
                    source={require('../assets/images/whats.png')}
                    style={styles.image}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <View style={styles.round}>
                  <Image
                    source={require('../assets/images/telegram.png')}
                    style={styles.image}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.balance_card_2}>
            <View style={[styles.row]}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.small_card, {backgroundColor: '#D8FFBF'}]}>
                  <Text style={[styles.text_2, {color: '#D19D29'}]}>20</Text>
                </View>
                <View style={styles.deposit}>
                  <Text style={styles.text_3}>Affiliation</Text>
                  <Text style={styles.text}>Money you earned</Text>
                </View>
              </View>
              <TouchableWithoutFeedback>
                <View style={[styles.button_card, {}]}>
                  <Text style={styles.text_4}>Share and Earn More</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.balance_card_3}>
            <Text style={styles.text_5}>How Referral Works</Text>
          </View>

          <View style={{height: 40}} />
        </ScrollView>
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
    marginTop: 10,
    paddingVertical: 18,
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
    lineHeight: 18,
    color: '#000000',
  },
  balance_number: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF5050',
    lineHeight: 26,
  },
  small_card: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#FFEBEB',
    alignSelf: 'flex-start',
    borderRadius: 3,
  },
  button_card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF5050',
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 13,
    fontWeight: 'bold',
  },
  text_3: {
    fontSize: 13,
    color: '#000000',
  },
  text_4: {
    fontSize: 11,
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
    fontSize: 13,
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
    height: 24,
    width: 24,
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

const mapDispatchToProps = dispatch => ({
  apiCall: url => dispatch(apiCall(url)),
});

const mapStateToProps = state => ({
  data: state.apiReducer.data,
  error: state.apiReducer.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferAndEarn);
