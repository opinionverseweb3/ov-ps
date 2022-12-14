import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import callApi from '../util/apiCaller';
import {onEditProfile} from '../../redux/actionCreater';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
const windowWidth = Dimensions.get('window').width;

const ProfileEdit = ({navigation}) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(({apiReducer}) => apiReducer.userProfile);
  const [user, setUser] = useState({
    email: userProfile?.email || '',
    dob: userProfile?.dob || '',
    username: userProfile?.username || '',
    gender: userProfile?.gender || '',
    state: userProfile?.state || '',
    name: userProfile?.name || '',
  });
  const [nameError, setNameError] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(userProfile?.gender) || '';
  const [items, setItems] = useState([
    {label: 'male', value: 'male'},
    {label: 'female', value: 'female'},
  ]);

  const [open_2, setOpen_2] = useState(false);
  const [value_2, setValue_2] = useState('');
  const [items_2, setItems_2] = useState([
    {label: 'ap', value: 'ap'},
    {label: 'telangana', value: 'telangana'},
  ]);

  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);

  useEffect(() => {
    setUser({...user, gender: value, state: value_2});
  }, [value, value_2]);
  const handleChange = (name, valued) => {
    if (name === 'dob') {
      const years = moment().diff(valued, 'years', false);
      if (years < 18) {
        alert('Age should be greater than 18');
      } else {
        setUser(prevState => ({
          ...prevState,
          [name]: valued,
        }));
      }
    } else {
      if (name === 'username') {
        callApi(`user/username/${name}`, 'get').then(res => {
          if (res.success) {
            if (res.available === 'yes') {
              setNameError(false);
            }
          } else {
          }
        });
      }
      setUser(prevState => ({
        ...prevState,
        [name]: valued,
      }));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 40,
        paddingHorizontal: '5%',
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}>
      <Text style={{marginBottom: 15}}>User Name *</Text>
      <TextInput
        placeholder="Enter your full name"
        style={{
          backgroundColor: 'rgba(249, 249, 249, 1)',
        }}
        value={user.username}
        onChangeText={text => handleChange('username', text)}
      />
      {nameError && (
        <View style={{}}>
          <Text style={{color: '#FF5050'}}>name should be unique</Text>
        </View>
      )}
      <Text style={{marginBottom: 15, marginTop: 15}}>{`Email `}</Text>
      <TextInput
        placeholder="Enter your full email"
        style={{
          backgroundColor: 'rgba(249, 249, 249, 1)',
          marginBottom: 15,
        }}
        value={user.email}
        onChangeText={text => handleChange('email', text)}
      />
      {/* <Text style={{marginBottom: 15}}>Gender</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        // setValue={setValue}
        setValue={setValue}
        setItems={setItems}
        style={{
          backgroundColor: 'rgba(249, 249, 249, 1)',
          borderWidth: 0,
          marginBottom: 15,
        }}
        containerStyle={{}}
        placeholder="Select gender"
      /> */}
      {/* <Text style={{marginBottom: 15}}>Date of birth</Text>
      <TouchableWithoutFeedback onPress={() => setDateOpen(true)}>
        <View
          placeholder="Enter date of birth"
          style={{
            backgroundColor: 'rgba(249, 249, 249, 1)',
            marginBottom: 15,
            height: 45,
            justifyContent: 'center',
            paddingLeft: 4,
          }}>
          <Text>{moment(user.dob).format('DD/MM/YYYY')}</Text>
        </View>
      </TouchableWithoutFeedback> */}
      {/* <DatePicker
        modal
        open={dateOpen}
        date={date}
        onConfirm={date => {
          setDateOpen(false);
          setDate(date);
          handleChange('dob', date);
        }}
        onCancel={() => {
          setDateOpen(false);
        }}
        mode="date"
      /> */}
      {/* <Text style={{marginBottom: 15}}>State</Text>
      <DropDownPicker
        open={open_2}
        value={value_2}
        items={items_2}
        setOpen={setOpen_2}
        setValue={setValue_2}
        setItems={setItems_2}
        style={{
          backgroundColor: 'rgba(249, 249, 249, 1)',
          borderWidth: 0,
          marginBottom: 15,
        }}
        containerStyle={{}}
        placeholder="Select state"
      /> */}
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
          marginTop: 32,
        }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              onEditProfile({paramenters: user, navigation: navigation}),
            );
          }}
          style={{
            backgroundColor: 'red',
            width: windowWidth - 32,

            paddingVertical: 12,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Save Details
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileEdit;
