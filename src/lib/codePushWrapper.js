import * as React from 'react';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import {setStore} from '../../redux/actions';
import GenericPopup from '../components/ui/GenericPopUp';
import AddMoney from '../components/ui/AddMoneyBs';

const CodePushWrapper = ({toggleGenericModal}) => {
  const dispatch = useDispatch();

  const toggleModel = () =>
    dispatch(setStore({toggleGenericModal: !toggleGenericModal}));

  return <></>;
};

const mapStateToProps = state => ({
  toggleGenericModal: state.apiReducer.toggleGenericModal,
});

export default connect(mapStateToProps, null)(CodePushWrapper);
