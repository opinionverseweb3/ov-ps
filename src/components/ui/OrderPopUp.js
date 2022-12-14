import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableOpacityBase,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Token from '../../assets/icons/token.svg';

const EventCard = ({headerText}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
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

const OrderPopUp = ({
  option = 'Yes',
  amount = 7,
  modalVisible,
  setModalVisible,
}) => {
  //   const [isModalVisible, setModalVisible] = useState(modalVisible);
  const header =
    'Whether Mahendra Singh Dhoni will make more than 30 runs & Indiawill win the match?';
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
                marginBottom: 14,
              }}>
              <Text>Poll</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  name="closecircle"
                  color={'rgba(0, 0, 0, .8)'}
                  size={15}
                />
              </TouchableOpacity>
            </View>
            <EventCard headerText={header} />
            <View
              style={{
                paddingHorizontal: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="clockcircleo" size={10} color="#000000" />
                <Text style={{fontSize: 10, marginLeft: 8, color: '#000000'}}>
                  3 Days
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 25,
                  borderRadius: 5,
                  paddingVertical: 10,
                  backgroundColor: 'rgba(112, 164, 255, 1)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>{option}</Text>
                  <Token width={22} height={22} />
                  <Text style={{color: 'white'}}>{amount}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 30,
                paddingVertical: 10,
                backgroundColor: 'rgba(242, 242, 242, 1)',
                marginTop: 20,
              }}>
              <Text>Investment: 🪙20</Text>
              <View
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: 'rgba(175, 175, 175, 1)',
                }}
              />
              <Text>Winnings: 🪙20</Text>
            </View>

            <View
              style={{alignItems: 'center', marginTop: 35, marginBottom: 15}}>
              <Text>Select Number of Contest and Price</Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 12,
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    Select Price
                  </Text>
                  <Text style={{fontSize: 9, color: 'black'}}>
                    You can also Poll with a different Price
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: 'rgba(243, 243, 243, 1)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 3,
                    }}>
                    <Text style={{fontSize: 20, color: 'black'}}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={{
                      width: 80,
                      textAlign: 'center',
                      color: 'rgba(0, 118, 226, 1)',
                      fontSize: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(0, 118, 226, 1)',
                      borderRadius: 3,
                      marginHorizontal: 3,
                    }}
                    value={'🪙7.00'}
                  />
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: 'rgba(222, 239, 255, 1)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 3,
                    }}>
                    <Text style={{fontSize: 15, color: 'black'}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 12,
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <View>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    Select Price
                  </Text>
                  <Text style={{fontSize: 9, color: 'black'}}>
                    You can also Poll with a different Price
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: 'rgba(243, 243, 243, 1)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 3,
                    }}>
                    <Text style={{fontSize: 20, color: 'black'}}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={{
                      width: 80,
                      textAlign: 'center',
                      color: 'rgba(0, 118, 226, 1)',
                      fontSize: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(0, 118, 226, 1)',
                      borderRadius: 3,
                      marginHorizontal: 3,
                    }}
                    value={'🪙7.00'}
                  />
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: 'rgba(222, 239, 255, 1)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 3,
                    }}>
                    <Text style={{fontSize: 15, color: 'black'}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 35}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(16, 120, 227, 1)',
                  paddingHorizontal: 100,
                  borderRadius: 5,
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{fontSize: 10, color: 'black', marginVertical: 10}}>
                  Change your opinion to No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 10,
    paddingTop: 20,
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
    marginLeft: 15,
    width: '100%',
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
});

export default OrderPopUp;

// const OrderPopUp = ({option = 'Yes', amount = 7}) => {
//     const header =
//       'Whether Mahendra Singh Dhoni will make more than 30 runs & Indiawill win the match?';
//     return (
//       <View>
//         <View>
//           <EventCard headerText={header} />
//         </View>
//         <View
//           style={{
//             paddingHorizontal: 12,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Icon name="clockcircleo" size={10} color="#000000" />
//             <Text style={{fontSize: 10, marginLeft: 8, color: '#000000'}}>
//               3 Days
//             </Text>
//           </View>
//           <TouchableOpacity
//             style={{
//               paddingHorizontal: 25,
//               borderRadius: 5,
//               paddingVertical: 10,
//               backgroundColor: 'rgba(112, 164, 255, 1)',
//             }}>
//             <Text style={{color: 'white'}}>
//               {option} 🪙{amount}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             paddingHorizontal: 30,
//             paddingVertical: 10,
//             backgroundColor: 'rgba(242, 242, 242, 1)',
//             marginTop: 20,
//           }}>
//           <Text>Investment: 🪙20</Text>
//           <View
//             style={{
//               width: 1,
//               height: 20,
//               backgroundColor: 'rgba(175, 175, 175, 1)',
//             }}
//           />
//           <Text>Winnings: 🪙20</Text>
//         </View>

//         <View style={{alignItems: 'center', marginTop: 35, marginBottom: 15}}>
//           <Text>Select Number of Contest and Price</Text>
//         </View>

//         <View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginHorizontal: 12,
//               alignItems: 'center',
//             }}>
//             <View>
//               <Text style={{fontSize: 12, color: 'black'}}>Select Price</Text>
//               <Text style={{fontSize: 9, color: 'black'}}>
//                 You can also Poll with a different Price
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   width: 50,
//                   height: 50,
//                   backgroundColor: 'rgba(243, 243, 243, 1)',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: 3,
//                 }}>
//                 <Text style={{fontSize: 20, color: 'black'}}>-</Text>
//               </TouchableOpacity>
//               <TextInput
//                 style={{
//                   width: 80,
//                   textAlign: 'center',
//                   color: 'rgba(0, 118, 226, 1)',
//                   fontSize: 12,
//                   borderWidth: 1,
//                   borderColor: 'rgba(0, 118, 226, 1)',
//                   borderRadius: 3,
//                   marginHorizontal: 3,
//                 }}
//                 value={'🪙7.00'}
//               />
//               <TouchableOpacity
//                 style={{
//                   width: 50,
//                   height: 50,
//                   backgroundColor: 'rgba(222, 239, 255, 1)',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: 3,
//                 }}>
//                 <Text style={{fontSize: 15, color: 'black'}}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginHorizontal: 12,
//               alignItems: 'center',
//               marginTop: 12,
//             }}>
//             <View>
//               <Text style={{fontSize: 12, color: 'black'}}>Select Price</Text>
//               <Text style={{fontSize: 9, color: 'black'}}>
//                 You can also Poll with a different Price
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   width: 50,
//                   height: 50,
//                   backgroundColor: 'rgba(243, 243, 243, 1)',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: 3,
//                 }}>
//                 <Text style={{fontSize: 20, color: 'black'}}>-</Text>
//               </TouchableOpacity>
//               <TextInput
//                 style={{
//                   width: 80,
//                   textAlign: 'center',
//                   color: 'rgba(0, 118, 226, 1)',
//                   fontSize: 12,
//                   borderWidth: 1,
//                   borderColor: 'rgba(0, 118, 226, 1)',
//                   borderRadius: 3,
//                   marginHorizontal: 3,
//                 }}
//                 value={'🪙7.00'}
//               />
//               <TouchableOpacity
//                 style={{
//                   width: 50,
//                   height: 50,
//                   backgroundColor: 'rgba(222, 239, 255, 1)',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderRadius: 3,
//                 }}>
//                 <Text style={{fontSize: 15, color: 'black'}}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };
