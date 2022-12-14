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
  TextInput,
} from 'react-native';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import CategoryEventCard from './CategoryEventCard';
import {useSelector, useDispatch} from 'react-redux';
import {onPlaceBid, placeBid} from '../../../redux/actionCreater';
const {height, width} = Dimensions.get('window');

const BidPopUp = ({
  modalVisible,
  setModalVisible,
  addMoneyonLowBalance = () => {},
  bidData,
}) => {
  const [showImage, setShowImage] = useState(false);
  const [opinion, setOpinion] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedEvent = useSelector(({apiReducer}) => apiReducer.selectedEvent);
  const walletData = useSelector(({apiReducer}) => apiReducer.walletData);
  const disableBidBtn = useSelector(({apiReducer}) => apiReducer.disableBidBtn);
  const selectedOption = useSelector(
    ({apiReducer}) => apiReducer.selectedOption,
  );
  const {Coins = 0, DepositCash = 0, WinningCash = 0, Bonus = 0} = walletData;
  const availableBalance = Coins;
  // Number(DepositCash) + Number(Bonus) + Number(WinningCash);
  const totalAmount =
    Number(selectedEvent?.bidDetails?.realCash || 0) +
    Number(selectedEvent?.bidDetails?.bonus || 0);

  const potentialWinning = isEmpty(selectedOption)
    ? '--'
    : Math.round(
        totalAmount /
          ((selectedOption.total_invested + totalAmount) /
            (selectedEvent.coinPoolValue + totalAmount)),
      );
  const test = e => {};

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ScrollView
          style={styles.centeredView_2}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 12,
              marginBottom: 14,
              marginTop: 200,
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon
                name="closecircle"
                color={'rgba(255, 255, 255, 1)'}
                size={50}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 25,
                  color: 'rgba(255, 80, 80, 1)',
                }}>
                Place Your Opinion
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Your Opinion"
                keyboardType="numeric"
                style={{
                  height: 50,
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  width: 250,
                  borderRadius: 5,
                }}
                onChangeText={text => {
                  setOpinion(text);
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                // position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                // paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    placeBid(
                      bidData.lobbyID,
                      opinion,
                      bidData.contestID,
                      navigation,
                    ),
                  )
                }
                disabled={disableBidBtn}
                style={{
                  backgroundColor: 'rgba(255, 80, 80, 1)',
                  width: '88%',
                  paddingVertical: 16,
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
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
    marginTop: 50,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: 22,
  },
  centeredView_2: {
    flex: 1,
    // backgroundColor: 'red',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 20,
    paddingTop: 40,
    width: '100%',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});

export default BidPopUp;
