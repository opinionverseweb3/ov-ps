import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {connect} from 'react-redux';
import {setStore} from '../../redux/actions';
import GenericPopup from '../components/ui/GenericPopUp';
import AddMoney from '../components/ui/AddMoneyBs';
import BidSuccess from '../components/ui/BidSuccess';
import ApplyReferral from '../components/ui/ApplyReferral';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import SnackBar from '../components/ui/SnackBar';
import ReedemFlow from '../components/ui/RedeemFlow';

const Wrapper = ({
  toggleGenericModal,
  showSucess,
  showReferral,
  showSnackBar,
  code,
  snackBarData,
  showReedemFlow,
}) => {
  const phoneNo = useSelector(({apiReducer}) => apiReducer.phoneNo);
  const dispatch = useDispatch();
  const toggleModel = () =>
    dispatch(setStore({toggleGenericModal: !toggleGenericModal}));
  const toggleSuccessModel = () =>
    dispatch(setStore({showSucess: !showSucess}));
  const toggleRedeemModel = () =>
    dispatch(setStore({showReedemFlow: !showReedemFlow}));
  const toggleReferral = () =>
    dispatch(setStore({showReferral: !showReferral}));
  const toggleSnackbar = () =>
    dispatch(setStore({showSnackBar: !showSnackBar, snackBarData: null}));

  const handleDynamicLink = link => {
    const deepLinkobj = link;
    const {
      utmParameters = {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
      },
      minimumAppVersion = null,
      url = 'https://opinionverse.live?referralCode=""',
    } = deepLinkobj;

    const referralCode = url?.split('=')?.[1];

    if (referralCode)
      dispatch(
        setStore({
          code: referralCode,
        }),
      );
  };

  useEffect(() => {
    //background handling
    dynamicLinks()
      .getInitialLink()
      .then(link => handleDynamicLink(link));

    // foreground handling
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phoneNo?.length === 10 && !showReferral && !!code) {
      toggleReferral();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNo, code, showReferral]);

  return (
    <>
      {toggleGenericModal && (
        <GenericPopup showCloseButton={true} closeModal={toggleModel}>
          <AddMoney />
        </GenericPopup>
      )}
      {showSucess && (
        <GenericPopup showCloseButton={false} closeModal={toggleSuccessModel}>
          <BidSuccess />
        </GenericPopup>
      )}

      {showReedemFlow && (
        <GenericPopup showCloseButton={false} closeModal={toggleRedeemModel}>
          <ReedemFlow />
        </GenericPopup>
      )}

      {showReferral && (
        <GenericPopup showCloseButton={true} closeModal={toggleReferral}>
          <ApplyReferral code={code} phoneNo={phoneNo} />
        </GenericPopup>
      )}
      {showSnackBar && (
        <GenericPopup
          backgroundColor={'transparent'}
          showCloseButton={false}
          closeModal={toggleSnackbar}>
          <SnackBar
            showSnackBar={showSnackBar}
            snackBarData={snackBarData}
            toggleSnackbar={toggleSnackbar}
          />
        </GenericPopup>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  toggleGenericModal: state.apiReducer.toggleGenericModal,
  showSucess: state.apiReducer.showSucess,
  showReedemFlow: state.apiReducer.showReedemFlow,
  showReferral: state.apiReducer.showReferral,
  code: state.apiReducer.code,
  showSnackBar: state.apiReducer.showSnackBar,
  snackBarData: state.apiReducer.snackBarData,
});

export default connect(mapStateToProps, null)(Wrapper);
