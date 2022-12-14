/* eslint-disable */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Snackbar} from 'react-native-paper';

const SnackBar = ({showSnackBar, snackBarData, toggleSnackbar}) => {
  return (
    <View
      style={{
        height: 100,
      }}>
      <Snackbar
        visible={showSnackBar}
        onDismiss={toggleSnackbar}
        duration={100000}
        action={{
          label: snackBarData?.cta,
          onPress: () => {
            toggleSnackbar();
          },
        }}>
        {snackBarData?.title}
      </Snackbar>
    </View>
  );
};

export default SnackBar;
