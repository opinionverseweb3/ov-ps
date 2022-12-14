import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import AddMoney from '../components/ui/AddMoneyBs';
import CategoryEventCard from '../components/ui/CategoryEventCard';
import {setStore} from '../../redux/actions';
import {connect} from 'react-redux';
import {getLeaderBoradData, apiCall} from '../../redux/actionCreater';
import LinearGradient from 'react-native-linear-gradient';
import GenericPopup from '../components/ui/GenericPopUp';
import Token from '../assets/icons/token.svg';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.props.getLeaderBoradData();
  }
  onRefresh = () => {
    this.props.getLeaderBoradData();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }>
          <View>
            <View style={styles.top_row}>
              <View style={[styles.top_3, {alignItems: 'center'}]}>
                <Text style={styles.number}>2</Text>
                {/* <View style={styles.round_2} /> */}
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: '#8F814E',
                  }}
                  source={{
                    uri: this.props.leaderboardData[1]?.image || '',
                    //  'https://opinionverse.s3.ap-south-1.amazonaws.com/all.png',
                  }}
                />
                <View>
                  <Text style={styles.text}>
                    {this.props.leaderboardData[1]?.username || ''}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Token width={22} height={22} />
                    <Text style={styles.text_2}>
                      {` ${this.props.leaderboardData[1]?.winnings || ''}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.top_3, {alignItems: 'center'}]}>
                <Image
                  source={require('../assets/images/crown.png')}
                  style={styles.image}
                  resizeMode={'contain'}
                />
                {/* <View style={styles.round_3} /> */}
                <Image
                  style={{
                    height: 90,
                    width: 90,
                    borderRadius: 45,
                    borderWidth: 2,
                    borderColor: '#E6C16E',
                  }}
                  source={{
                    uri: this.props.leaderboardData[0]?.image || '',
                    //  'https://opinionverse.s3.ap-south-1.amazonaws.com/all.png',
                  }}
                />
                <View>
                  <Text style={styles.text}>
                    {this.props.leaderboardData[0]?.username || ''}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Token width={22} height={22} />
                    <Text style={styles.text_2}>
                      {` ${this.props.leaderboardData[0]?.winnings || ''}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.top_3, {alignItems: 'center'}]}>
                <Text style={styles.number}>3</Text>
                {/* <View style={styles.round_2} /> */}
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: '#969696',
                  }}
                  source={{
                    uri: this.props.leaderboardData[2]?.image || '',
                    //  'https://opinionverse.s3.ap-south-1.amazonaws.com/all.png',
                  }}
                />
                <View>
                  <Text style={styles.text}>
                    {this.props.leaderboardData[2]?.username || ''}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Token width={22} height={22} />
                    <Text style={styles.text_2}>
                      {` ${this.props.leaderboardData[2]?.winnings || ''}`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rank_title_row}>
              <View style={styles.row}>
                <Text style={styles.rank_title}>Rank</Text>
              </View>
              <View style={[styles.row_2, {marginLeft: 13}]}>
                <Text style={styles.rank_title}>User name</Text>
              </View>
              <View style={styles.row_3}>
                <Text style={styles.rank_title}>Winnings</Text>
              </View>
            </View>
            {/* <LinearGradient
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 0.5}}
              colors={['#e4e2e4', '#FFF']}
              style={{height: 8}}
            /> */}
            {this.props.leaderboardData.length > 0 && (
              <FlatList
                data={this.props.leaderboardData}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({item, index}) => (
                  <View style={styles.rank_details_row}>
                    <View style={styles.row}>
                      <Text style={{fontSize: 16, width: 44}}>
                        #{index + 1}{' '}
                      </Text>
                      <View>
                        {/* <View style={styles.round} /> */}
                        <Image
                          style={{
                            height: 32,
                            width: 32,
                            borderRadius: 16,
                          }}
                          source={{
                            uri: item?.image || '',
                            //  'https://opinionverse.s3.ap-south-1.amazonaws.com/all.png',
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.row_2}>
                      <Text style={styles.rank_details_text}>
                        {item.username}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Token width={22} height={22} />
                      <Text
                        style={[
                          styles.rank_details_text,
                          {color: 'rgba(255, 80, 80, 1)'},
                        ]}>
                        {' ' + item.winnings}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  number: {
    textAlign: 'center',
    right: 5,
    marginTop: 80,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  image: {height: 36},
  top_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 30,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },
  text_2: {
    color: '#FF5050',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    // marginTop: 6,
  },
  rank_title: {
    fontSize: 16,
    color: '#969696',
  },
  rank_title_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  rank_details_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  row_2: {
    flex: 2,
  },
  row_3: {},
  round: {
    width: 30,
    height: 30,
    borderRadius: 35,
    backgroundColor: '#F4F4F4',
    marginLeft: 30,
  },
  round_2: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: 'pink',
    marginBottom: 10,
  },
  round_3: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: 'pink',
    marginBottom: 10,
  },
});

const mapDispatchToProps = dispatch => ({
  apiCall: url => dispatch(apiCall(url)),
  getLeaderBoradData: () => dispatch(getLeaderBoradData()),
  setStore: data => dispatch(setStore(data)),
});

const mapStateToProps = state => ({
  data: state.apiReducer.data,
  error: state.apiReducer.error,
  leaderboardData: state.apiReducer.leaderboardData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
