import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTransaction} from '../../redux/actionCreater';

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(({apiReducer}) => apiReducer.transactions);
  useEffect(() => {
    dispatch(getTransaction({}));
  }, [dispatch]);

  return (
    <View style={styles.box}>
      <FlatList
        data={transactions}
        scrollEnabled={false}
        //contentContainerStyle={{paddingHorizontal: 16}}
        renderItem={({item}) => (
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={[styles.text_3, {color: '#403838'}]}>
                {item.transactionType}
              </Text>
              <Text
                style={[
                  styles.text_3,
                  {color: item.credit !== null ? '#317508' : '#FF5050'},
                ]}>
                {item.credit === null ? item.debit : item.credit}
              </Text>
            </View>
            <View style={[styles.title, styles.mb]}>
              <Text style={styles.text}>{item.remark}</Text>
              <Text style={styles.text}>
                {moment(item.updatedAt).format('MMM Do')}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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

export default TransactionHistory;
