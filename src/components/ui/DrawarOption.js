import React from 'react';
import {TouchableOpacity, Icon, View, Text} from 'react-native';
import HelpIcon from '../../assets/icons/helpAndSupport.svg';
const DrawerOption = ({navigation, menuItems}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home1')}
        style={{alignItems: 'flex-end', marginTop: 30, marginRight: 30}}>
        <Icon name="close" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{
          marginHorizontal: 20,
          marginTop: 23,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: 'rgba(255, 80, 80, .4)',
            borderRadius: 50,
            marginRight: 15,
          }}
        />
        <View>
          <Text
            style={{
              color: 'rgba(64, 56, 56, 1)',
              fontSize: 14,
            }}>
            Annu007
          </Text>
          <Text style={{color: 'rgba(255, 80, 80, 1)', fontSize: 12}}>
            +91 9718190486
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        {menuItems.map(({label, route, icon}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(route)}
            style={{
              paddingLeft: 25,
              paddingVertical: 18,
              borderBottomColor: 'rgba(240, 240, 240, .8)',
              borderBottomWidth: 1,
              // justifyContent: 'center',
              flexDirection: 'row',
            }}>
            {icon}
            <Text style={{fontSize: 15, marginLeft: 10, color: 'black'}}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{padding: 18}}>
        <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
          Need Help?
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text
            numberOfLines={5}
            style={{width: '50%', fontSize: 10, color: 'black'}}>
            Contact our support team and get instant answers.
          </Text>
          <HelpIcon />
        </View>
        <Text
          onPress={() => navigation.navigate('HelpAndSupport')}
          style={{
            fontSize: 15,
            color: 'rgba(255, 80, 80, 1)',
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}>
          Visit Now
        </Text>
      </View>
    </View>
  );
};

export default DrawerOption;
