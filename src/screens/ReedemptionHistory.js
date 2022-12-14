import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, Dimensions, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTransaction} from '../../redux/actionCreater';
import Token from '../assets/icons/token.svg';
const windowWidth = Dimensions.get('window').width;
const ReedemptionHistory = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(({apiReducer}) => apiReducer.transactions);
  useEffect(() => {
    dispatch(getTransaction({}));
  }, [dispatch]);
  return (
    <View style={styles.box}>
      <FlatList
        data={transactions}
        //contentContainerStyle={{paddingHorizontal: 16}}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <View style={styles.title}>
                <Text style={[styles.text_3, {color: '#403838'}]}>
                  {item.transactionType}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.text_3,
                      {color: item.credit !== null ? '#317508' : '#FF5050'},
                    ]}>
                    {item.credit === null ? ` - ` : `+ `}
                  </Text>

                  <Token width={22} height={22} />
                  <Text
                    style={[
                      styles.text_3,
                      {color: item.credit !== null ? '#317508' : '#FF5050'},
                    ]}>
                    {item.credit === null
                      ? ` ${item.debit}`
                      : ` ${item.credit}`}
                  </Text>
                </View>
              </View>
              <View style={[styles.title, styles.mb, {alignItems: 'center'}]}>
                <Text
                  style={[
                    {fontSize: 14, color: '#969696', fontWeight: '300'},
                    {width: windowWidth - 164},
                  ]}>
                  {item.remark}
                </Text>
                <Text style={styles.text}>
                  {moment(item.updatedAt).format('MMM Do, h:mm A')}
                </Text>
              </View>
            </View>
          );
        }}
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

export default ReedemptionHistory;
