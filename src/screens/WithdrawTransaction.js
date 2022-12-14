/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GenericPopup from '../components/ui/GenericPopUp';
import {getWithdrawRequest} from '../../redux/actionCreater';

const WithdrawTransaction = () => {
  const dispatch = useDispatch();
  const withdrawalArray = useSelector(
    ({apiReducer}) => apiReducer.withdrawalArray,
  );
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selecteditem, setSelectedItem] = useState({});
  useEffect(() => {
    dispatch(getWithdrawRequest({}));
  }, [dispatch]);

  return (
    <View style={styles.box}>
      <FlatList
        data={withdrawalArray}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(true);
              setSelectedItem(item);
            }}>
            <View style={styles.container}>
              <View style={styles.title}>
                <Text style={[styles.text_3, {color: '#403838'}]}>
                  {`Withdraw 🪙 ${item.requestAmount}`}
                </Text>
                <Text
                  style={[
                    styles.text_3,
                    {
                      color:
                        item.isApproved === 'Pending'
                          ? '#85B6FF'
                          : item.isApproved === 'Approved'
                          ? '#317508'
                          : '#FF5050',
                    },
                  ]}>
                  {item.isApproved}
                </Text>
              </View>
              <View style={[styles.title, styles.mb]}>
                <Text style={styles.text}>{item.withdrawMethod}</Text>
                <Text style={styles.text}>
                  {moment(item.updatedAt).format('MMM Do')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                paddingTop: 100,
                paddingHorizontal: 16,
                alignSelf: 'center',
              }}>
              {'No Withdrawals Request Available'}
            </Text>
          );
        }}
      />
      {showBottomSheet && (
        <GenericPopup
          showCloseButton={true}
          closeModal={() => {
            setShowBottomSheet(false);
          }}>
          <View style={{padding: 16}}>
            <Text
              style={[
                {fontSize: 30, fontWeight: '500'},
                {
                  color:
                    selecteditem.isApproved === 'Pending'
                      ? '#85B6FF'
                      : selecteditem.isApproved === 'Success'
                      ? '#317508'
                      : '#FF5050',
                },
              ]}>
              {selecteditem.isApproved}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
              }}>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '700'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'Type'}
              </Text>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '200'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'Debit'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
              }}>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '700'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'Date & Time'}
              </Text>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '200'},
                  {
                    color: '#403838',
                  },
                ]}>
                {moment(selecteditem.updatedAt).format('YYYY MMM Do, h:mm')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
              }}>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '700'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'From'}
              </Text>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '200'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'Winnings'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '700'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'To'}
              </Text>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '200'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'UPI'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
              }}>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '700'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'Amount'}
              </Text>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '200'},
                  {
                    color: '#403838',
                  },
                ]}>
                {selecteditem.requestAmount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E6E6E6',
                marginBottom: 24,
              }}>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '700'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'Description'}
              </Text>
              <Text
                style={[
                  {fontSize: 20, fontWeight: '200'},
                  {
                    color: '#403838',
                  },
                ]}>
                {'UPI Withdrawal'}
              </Text>
            </View>
          </View>
        </GenericPopup>
      )}
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  container: {padding: 12, backgroundColor: 'white', marginBottom: 1},
  title: {flexDirection: 'row', justifyContent: 'space-between'},
  box: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  text: {
    fontSize: 16,
    color: '#969696',
    fontWeight: '300',
  },
  text_3: {
    fontSize: 20,
    fontWeight: '500',
  },
  mb: {marginTop: 4},
});

export default WithdrawTransaction;
