/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import callApi from '../util/apiCaller';
import {ToastAndroid} from 'react-native';

const KYCVerification = ({navigation}) => {
  const [kyc, setKyc] = useState({
    panCardName: '',
    panCardDob: '',
    panCardNumber: '',
    panCardImage: null,
    kycStatus: '',
    state: '',
    // statesList: [
    //   {label: 'Ap', value: 'Ap'},
    //   {label: 'Telangana', value: 'Telangana'},
    //   {label: 'Delhi', value: 'Delhi'},
    // ],
  });
  const [statesList, setStatesList] = useState();
  const [open_2, setOpen_2] = useState(false);
  const [value_2, setValue_2] = useState(null);
  const [items_2, setItems_2] = useState([
    {
      label: 'Andaman and Nicobar Islands',
      value: 'Andaman and Nicobar Islands',
      id: 0,
    },
    {
      label: 'Andhra Pradesh',
      value: 'Andhra Pradesh',
      id: 0,
    },
    {
      label: 'Arunachal Pradesh',
      value: 'Arunachal Pradesh',
      id: 0,
    },
    {
      label: 'Assam',
      value: 'Assam',
      id: 0,
    },
    {
      label: 'Bihar',
      value: 'Bihar',
      id: 0,
    },
    {
      label: 'Chandigarh',
      value: 'Chandigarh',
      id: 0,
    },
    {
      label: 'Chhattisgarh',
      value: 'Chhattisgarh',
      id: 0,
    },
    {
      label: 'Dadra and Nagar Haveli',
      value: 'Dadra and Nagar Haveli',
      id: 0,
    },
    {
      label: 'Daman and Diu',
      value: 'Daman and Diu',
      id: 0,
    },
    {
      label: 'Delhi',
      value: 'Delhi',
      id: 0,
    },
    {
      label: 'Goa',
      value: 'Goa',
      id: 0,
    },
    {
      label: 'Gujarat',
      value: 'Gujarat',
      id: 0,
    },
    {
      label: 'Haryana',
      value: 'Haryana',
      id: 0,
    },
    {
      label: 'Himachal Prades',
      value: 'Himachal Pradesh',
      id: 0,
    },
    {
      label: 'Jammu and Kashmir',
      value: 'Jammu and Kashmir',
      id: 0,
    },
    {
      label: 'Jharkhand',
      value: 'Jharkhand',
      id: 0,
    },
    {
      label: 'Karnataka',
      value: 'Karnataka',
      id: 0,
    },
    {
      label: 'Kerala',
      value: 'Kerala',
      id: 0,
    },
    {
      label: 'Lakshadweep',
      value: 'Lakshadweep',
      id: 0,
    },
    {
      label: 'Madhya Pradesh',
      value: 'Madhya Pradesh',
      id: 0,
    },
    {
      label: 'Maharashtra',
      value: 'Maharashtra',
      id: 0,
    },
    {
      label: 'Manipur',
      value: 'Manipur',
      id: 0,
    },
    {
      label: 'Meghalaya',
      value: 'Meghalaya',
      id: 0,
    },
    {
      label: 'Mizoram',
      value: 'Mizoram',
      id: 0,
    },
    {
      label: 'Nagaland',
      value: 'Nagaland',
      id: 0,
    },
    {
      label: 'Odisha',
      value: 'Odisha',
      id: 0,
    },
    {
      label: 'Puducherry',
      value: 'Puducherry',
      id: 0,
    },
    {
      label: 'Punjab',
      value: 'Punjab',
      id: 0,
    },
    {
      label: 'Rajasthan',
      value: 'Rajasthan',
      id: 0,
    },
    {
      label: 'Sikkim',
      value: 'Sikkim',
      id: 0,
    },
    {
      label: 'Tamil Nad',
      value: 'Tamil Nadu',
      id: 0,
    },
    {
      label: 'Telangana',
      value: 'Telangana',
      id: 0,
    },
    {
      label: 'Tripura',
      value: 'Tripura',
      id: 0,
    },
    {
      label: 'Uttar Pradesh',
      value: 'Uttar Pradesh',
      id: 0,
    },
    {
      label: 'Uttarakhand',
      value: 'Uttarakhand',
      id: 0,
    },
    {
      label: 'West Bengal',
      value: 'West Bengal',
      id: 0,
    },
  ]);

  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  useEffect(() => {
    setKyc({
      ...kyc,
      panCardDob: date,
    });
  }, [date]);

  useEffect(() => {
    callApi(`kyc_request`, 'get').then(res => {
      if (res.success && res.result !== null) {
        setKyc(res.result);
        // setStatesList(res.state);
        // setItems_2(res.state);
        setValue_2(res.result.state);
      }
    });
  }, []);

  const handleChange = (name, value) => {
    if (name === 'dob') {
      const years = moment().diff(value, 'years', false);
      if (years < 18) {
        alert('Age should be greater than 18');
        setDate(new Date().toLocaleDateString());
      } else {
        setKyc(prevState => ({
          ...prevState,
          [name]: moment(Date.parse(value)).format('DD/MM/YYYY'),
        }));
      }
    } else {
      setKyc(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSave = (setModalVisible = () => {}) => {
    const data = {
      panCardNumber: kyc.panCardNumber,
      panCardName: kyc.panCardName,
      panCardDob: kyc.panCardDob,
      state: value_2,
    };
    kyc.kycStatus === 'Declined'
      ? callApi(`kyc_request`, 'put', data).then(res => {
          if (!res.success) {
            ToastAndroid.show(res?.error?.message || 'api failed', 750);
            return;
          }
          setKyc({
            ...res.result,
            panCardDob: date,
          });
          // navigation.goBack();
        })
      : callApi(`kyc_request`, 'post', data).then(res => {
          if (!res.success) {
            ToastAndroid.show(res?.error?.message || 'api failed', 750);
            return;
          }
          setKyc({
            ...res.result,
            panCardDob: date,
          });
          // navigation.goBack();
        });
  };
  const disableKYC =
    kyc.panCardName === '' || kyc.panCardNumber === '' || value_2 === null;
  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={{paddingVertical: 10}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: 'black',
            marginBottom: 5,
          }}>
          Add Your PAN Details
        </Text>
        <Text style={{marginBottom: 10}}>
          Required for your personal identification, your PAN card helps us to
          get you on board smoothly
        </Text>
        {kyc.kycStatus === 'Declined' && (
          <Text style={{marginBottom: 5, fontWeight: '500', color: 'red'}}>
            Your Kyc was declined .Please validate your details and reapply
          </Text>
        )}
      </View>

      <View
        style={{
          width: '99%',
          paddingHorizontal: '5%',
          backgroundColor: 'white',
          paddingVertical: 25,
        }}>
        <Text style={{marginBottom: 5}}>PAN Number</Text>
        <TextInput
          placeholder="Enter your PAN number"
          style={{
            backgroundColor: 'rgba(249, 249, 249, 1)',
            marginBottom: 5,
          }}
          value={kyc.panCardNumber}
          onChangeText={text => handleChange('panCardNumber', text)}
        />

        <Text style={{marginBottom: 5}}>Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          style={{
            backgroundColor: 'rgba(249, 249, 249, 1)',
            marginBottom: 5,
          }}
          value={kyc.panCardName}
          onChangeText={text => handleChange('panCardName', text)}
        />

        <Text style={{marginBottom: 5}}>Date of birth</Text>
        <TouchableWithoutFeedback onPress={() => setDateOpen(true)}>
          <View
            placeholder="Enter date of birth"
            style={{
              backgroundColor: 'rgba(249, 249, 249, 1)',
              marginBottom: 5,
              height: 45,
              justifyContent: 'center',
              paddingLeft: 4,
            }}>
            <Text>{moment(kyc?.panCardDob || date).format('DD/MM/YYYY')}</Text>
          </View>
        </TouchableWithoutFeedback>
        <DatePicker
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
        />

        <Text style={{marginBottom: 5}}>State</Text>
        <DropDownPicker
          open={open_2}
          value={value_2}
          items={items_2}
          dropDownMaxHeight={300}
          setOpen={setOpen_2}
          setValue={setValue_2}
          setItems={setItems_2}
          style={{
            backgroundColor: 'rgba(249, 249, 249, 1)',
            borderWidth: 0,
            marginBottom: 5,
          }}
          containerStyle={{}}
          placeholder="Select state"
        />

        <TouchableOpacity
          style={{
            backgroundColor:
              kyc.kycStatus === 'New' || disableKYC
                ? '#CFCAC9'
                : kyc.kycStatus === 'Approved'
                ? 'green'
                : 'rgba(255, 80, 80, 1)',
            alignItems: 'center',
            paddingVertical: 16,
            borderRadius: 5,
            marginHorizontal: 30,
            marginTop: 40,
          }}
          disabled={
            kyc.kycStatus === 'New' ||
            kyc.kycStatus === 'Approved' ||
            disableKYC
          }
          onPress={() => handleSave()}>
          <Text style={{color: 'white'}}>
            {kyc.kycStatus === 'New'
              ? 'KYC Approval Pending'
              : kyc.kycStatus === 'Approved'
              ? 'KYC approved'
              : kyc.kycStatus === 'Declined'
              ? 'Reapply KYC'
              : 'Submit KYC'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default KYCVerification;
