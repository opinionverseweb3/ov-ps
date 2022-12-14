import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import OrderPopUp from '../components/ui/CategoryPopUp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: 91,
    height: 91,
    backgroundColor: 'red',
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
  },
  buySellContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  pollDetails: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  pollDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
  },
  detailsBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  shadowBorder: {
    borderColor: 'rgba(244, 244, 244, 1)',
    borderTopWidth: 1,
    marginHorizontal: 10,
  },
  headerText: {
    marginLeft: 15,
    width: '100%',
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
});

const EventCard = ({headerText}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 15,
        justifyContent: 'space-between',
      }}>
      <Image
        style={styles.headerImage}
        source={{
          uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
        }}
      />
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
};

const ProbabilityTrend = () => {};

const PollTips = () => {};

const Footer = ({setModalVisible = () => {}}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 28,
      }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: 'rgba(112, 164, 255, 1)',
          paddingHorizontal: '18%',
          paddingVertical: 16,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>Yes 🪙7</Text>
      </TouchableOpacity>
      <View style={{paddingHorizontal: 10}} />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: 'rgba(242, 116, 110, 1)',
          paddingHorizontal: '18%',
          paddingVertical: 16,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>No 🪙3</Text>
      </TouchableOpacity>
    </View>
  );
};

const PollDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const header =
    'Whether Mahendra Singh Dhoni will make more than 30 runs & Indiawill win the match?';

  return (
    <TouchableOpacity
      style={{backgroundColor: 'white', flex: 1}}
      onPress={() => setModalVisible(false)}>
      <EventCard headerText={header} />
      <View style={styles.shadowBorder} />
      <View style={styles.detailsBody}>
        <View style={styles.pollDetailsContainer}>
          <View style={styles.pollDetails}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="clockcircleo" size={18} color="#000000" />
              <Text style={{fontSize: 13, marginLeft: 8, color: '#000000'}}>
                3 Days
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              <Icon name="user" size={18} color="#000000" />
              <Text style={{fontSize: 13, color: '#000000', marginLeft: 5}}>
                21, 500 Polls
              </Text>
            </View>
          </View>
        </View>
      </View>
      <OrderPopUp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Footer setModalVisible={setModalVisible} />
    </TouchableOpacity>
  );
};

export default PollDetails;
