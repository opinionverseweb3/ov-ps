/* eslint-disable */
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ScrollView,
} from 'react-native';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import CategoryEventCard from './CategoryEventCard';
import {useSelector, useDispatch} from 'react-redux';
import {onPlaceBid} from '../../../redux/actionCreater';
import Slider from '@react-native-community/slider';
import Token from '../../assets/icons/token.svg';
const {height, width} = Dimensions.get('window');

const CategoryOrderPopUp = ({
  modalVisible,
  setModalVisible,
  addMoneyonLowBalance = () => {},
}) => {
  const [showImage, setShowImage] = useState(false);
  const [numOfbids, setNumOfbids] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedEvent = useSelector(({apiReducer}) => apiReducer.selectedEvent);
  const walletData = useSelector(({apiReducer}) => apiReducer.walletData);
  const disableBidBtn = useSelector(({apiReducer}) => apiReducer.disableBidBtn);
  const selectedOption = useSelector(
    ({apiReducer}) => apiReducer.selectedOption,
  );
  const {Coins = 0} = walletData;
  const availableRealBalance = Coins;
  const totalRealAmount =
    Number(selectedEvent?.coinBidDetails?.realCoins || 0) * numOfbids;

  const totalAmount = Number(selectedEvent?.coinBidDetails?.realCoins || 0);

  let potentialWinning = isEmpty(selectedOption)
    ? null
    : Math.round(
        totalAmount /
          ((selectedOption.total_invested_coin + totalAmount) /
            (selectedEvent.coinPoolValue + totalAmount)),
      );
  potentialWinning = Number(potentialWinning) || 0;

  const potentialWinningTotal =
    potentialWinning !== null ? numOfbids * potentialWinning : 0;

  const entryFee = (numOfbids * totalAmount).toFixed(2);
  const totalEntryFee = (totalAmount * numOfbids).toFixed(2);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginBottom: 8,
              marginRight: 8,
            }}
            onPress={() => setModalVisible(false)}>
            <Icon name="closecircle" color={'white'} size={20} />
          </TouchableOpacity>
          <View style={styles.modalView}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <CategoryEventCard
                item={selectedEvent}
                showpercentage={true}
                showShadow={false}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  // paddingHorizontal: 30,
                  alignItems: 'center',
                  paddingVertical: 10,
                  marginTop: 0,
                  marginBottom: 16,
                  elevation: 1,
                  // borderWidth: 1,
                  shadowColor: '#E0E5E9',
                }}>
                <View style={{alignItems: 'center', flex: 1}}>
                  <Text style={{fontSize: 16}}>Entry Fee</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Token width={22} height={22} />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'rgba(255, 80, 80, 1)',
                        // fontWeight: 'bold',
                      }}>
                      {` ${entryFee}`}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: 1,
                    height: 20,
                    backgroundColor: 'rgba(175, 175, 175, 1)',
                    marginRight: -0,
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => setShowImage(!showImage)}>
                    <Text style={{fontSize: 16, marginRight: 8}}>
                      Potential Winnings
                    </Text>
                    <SIcon
                      name={!showImage ? 'arrow-down' : 'arrow-up'}
                      size={12}
                      color={'black'}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Token width={22} height={22} />
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'rgba(255, 80, 80, 1)',
                        fontWeight: 'bold',
                      }}>
                      {` ${potentialWinningTotal}`}
                    </Text>
                  </View>
                </View>
              </View>
              {showImage && (
                <Image
                  style={{
                    height: 600,
                    width: width - 36,
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: 'red',
                    marginBottom: 12,
                  }}
                  source={{
                    //item?.image || '',
                    uri: 'https://opinionverse.s3.ap-south-1.amazonaws.com/win+calculation.png',
                  }}
                />
              )}
              {/* <View
                rw
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16}}>Real Coins</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'rgba(255, 80, 80, 1)',
                  }}>
                  {`🪙 ${
                    (selectedEvent?.bidDetails?.realCash || 0) * numOfbids
                  }`}
                </Text>
              </View> */}
              {/* <View
                rw
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16}}>Bonus Coins</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'rgba(255, 80, 80, 1)',
                  }}>
                  {`🪙 ${(selectedEvent?.bidDetails?.bonus || 0) * numOfbids}`}
                </Text>
              </View> */}
              <View
                rw
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16}}>Total Entry Fee</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Token width={22} height={22} />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'rgba(255, 80, 80, 1)',
                    }}>
                    {` ${totalEntryFee}`}
                  </Text>
                </View>
              </View>
              <View style={styles.balance_text}>
                <Text
                  style={[
                    styles.balance_text_2,
                    {fontWeight: 'bold', fontSize: 16},
                  ]}>
                  Number of Opinions:
                </Text>
                <Text
                  style={[
                    styles.balance_number,
                    {fontWeight: 'bold', fontSize: 16},
                  ]}>{` ${numOfbids}`}</Text>
              </View>
              <Slider
                style={{
                  width: width - 32,
                }}
                value={numOfbids}
                minimumValue={1}
                maximumValue={50}
                minimumTrackTintColor="#FF5050"
                maximumTrackTintColor="grey"
                thumbTintColor="#FF5050"
                step={1}
                onSlidingComplete={arg => {
                  setNumOfbids(arg);
                }}
              />

              <View style={styles.balance_text}>
                <Text style={styles.balance_text_2}>
                  {availableRealBalance >= totalRealAmount
                    ? 'Available OV Coins: '
                    : 'Insufficient balance, Please add money to place your opinion.'}
                </Text>
                {availableRealBalance >= totalRealAmount && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Token width={22} height={22} />
                    <Text
                      style={
                        styles.balance_number
                      }>{`${availableRealBalance.toFixed(2)}`}</Text>
                  </View>
                )}
              </View>
              <View style={{alignItems: 'center', marginTop: 12}}>
                {availableRealBalance >= totalRealAmount ? (
                  <TouchableOpacity
                    disabled={disableBidBtn || isEmpty(selectedOption)}
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      backgroundColor: isEmpty(selectedOption)
                        ? '#E2C4C4'
                        : '#FF5050',
                      paddingHorizontal: 52,
                      borderRadius: 4,
                      paddingVertical: 8,
                    }}
                    onPress={() => {
                      dispatch(
                        onPlaceBid({
                          optionId: selectedOption.id,
                          navigation: navigation,
                          numOfbids: numOfbids,
                          pollId: selectedEvent?.id,
                          potentialWinnigPerBid:
                            potentialWinning !== null ? potentialWinning : 0,
                          potentialWinningTotal: potentialWinningTotal,
                        }),
                      );
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      {'Confirm with'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Token width={22} height={22} />
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        {` ${totalAmount * numOfbids}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      backgroundColor: isEmpty(selectedOption)
                        ? '#E2C4C4'
                        : '#FF5050',
                      paddingHorizontal: 52,
                      borderRadius: 4,
                      paddingVertical: 8,
                    }}
                    disabled={isEmpty(selectedOption)}
                    onPress={() => {
                      setModalVisible(false);
                      addMoneyonLowBalance();
                    }}>
                    <View
                      style={
                        !isEmpty(selectedOption)
                          ? {
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }
                          : null
                      }>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        {isEmpty(selectedOption)
                          ? 'Select a poll'
                          : `Confirm with`}
                      </Text>
                      {!isEmpty(selectedOption) && (
                        <Token width={22} height={22} />
                      )}
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        {isEmpty(selectedOption)
                          ? ''
                          : `${totalAmount * numOfbids}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                <View
                  rw
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 24,
                  }}>
                  <Icon
                    name="infocirlceo"
                    size={12}
                    color="#939393"
                    style={{marginRight: 4}}
                  />
                  <Text
                    style={{
                      color: '#939393',
                      fontSize: 12,
                    }}>
                    {`${selectedEvent.commission}% Commissions will be charged on your Net Winnings`}
                  </Text>
                </View>
                {/* <View
                  rw
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 24,
                  }}>
                  <Icon
                    name="infocirlceo"
                    size={12}
                    color="#939393"
                    style={{marginRight: 4}}
                  />
                  <Text
                    style={{
                      color: '#939393',
                      fontSize: 12,
                    }}>
                    {`More number of bids will increasu your chances of winning.`}
                  </Text>
                </View> */}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: 91,
    height: 91,
    backgroundColor: 'red',
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5) ',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: height * 0.9,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  headerText: {
    width: '100%',
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  balance_text: {
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  balance_text_2: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000000',
  },
  balance_number: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF5050',
  },
});

export default CategoryOrderPopUp;
