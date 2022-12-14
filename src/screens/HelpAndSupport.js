import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {ToastAndroid} from 'react-native';

const HelpAndSupport = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <Text style={{marginBottom: 15, fontSize: 36, fontWeight: 'bold'}}>
        Contact Us
      </Text>
      <Text>
        <Text style={{marginBottom: 15, fontSize: 16, fontWeight: 'bold'}}>
          {`Reach out us on `}
        </Text>
        <Text
          style={{
            marginBottom: 15,
            fontSize: 16,
            color: 'red',
            fontWeight: 'bold',
          }}>
          {`support@opinionverse.live`}
        </Text>
        <Text style={{marginBottom: 15, fontSize: 16, fontWeight: 'bold'}}>
          {` & we will get back to you as soon as possible.`}
        </Text>
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString('support@opinionverse.live');
            ToastAndroid.show('Email Copied Successfully', 750);
          }}
          style={{
            backgroundColor: 'rgba(255, 80, 80, 1)',
            width: '100%',
            marginVertical: 16,
            paddingVertical: 12,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Copy Email Address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // <View style={{marginHorizontal: 20}}>
    //   <View style={{marginVertical: 20}}>
    //     <Text
    //       style={{
    //         fontSize: 16,
    //         fontWeight: '700',
    //         color: 'black',
    //         marginBottom: 15,
    //       }}>
    //       Contact Us
    //     </Text>
    //     <Text style={{marginBottom: 20}}>
    //       Reach out us on Support@opinionverse.live & we will get back to you as
    //       soon as possible.
    //     </Text>
    //   </View>
    //   <View>
    //     <View
    //       style={{
    //         width: '99%',
    //         paddingHorizontal: '5%',
    //         backgroundColor: 'white',
    //         paddingVertical: 25,
    //       }}>
    //       <Text style={{marginBottom: 15}}>Full Name *</Text>
    //       <TextInput
    //         placeholder="Enter your full name"
    //         style={{
    //           backgroundColor: 'rgba(249, 249, 249, 1)',
    //           marginBottom: 15,
    //         }}
    //       />

    //       <Text style={{marginBottom: 15}}>Email</Text>
    //       <TextInput
    //         placeholder="Enter your full email"
    //         style={{
    //           backgroundColor: 'rgba(249, 249, 249, 1)',
    //           marginBottom: 15,
    //         }}
    //       />

    //       <Text style={{marginBottom: 15}}>Gender</Text>
    //       <TextInput
    //         placeholder="Select Gender"
    //         style={{
    //           backgroundColor: 'rgba(249, 249, 249, 1)',
    //           marginBottom: 15,
    //         }}
    //       />

    //       <Text style={{marginBottom: 15}}>Date of birth</Text>
    //       <TextInput
    //         placeholder="Enter your full name"
    //         style={{
    //           backgroundColor: 'rgba(249, 249, 249, 1)',
    //           marginBottom: 15,
    //         }}
    //       />

    //       <Text style={{marginBottom: 15}}>State</Text>
    //       <TextInput
    //         placeholder="Select state"
    //         style={{
    //           backgroundColor: 'rgba(249, 249, 249, 1)',
    //           marginBottom: 15,
    //         }}
    //       />
    //       <TouchableOpacity
    //         style={{
    //           backgroundColor: 'rgba(255, 80, 80, 1)',
    //           alignItems: 'center',
    //           paddingVertical: 16,
    //           borderRadius: 5,
    //           marginHorizontal: 30,
    //           marginTop: 40,
    //         }}>
    //         <Text style={{color: 'white'}}>Submit</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
  );
};

export default HelpAndSupport;
