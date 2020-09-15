import React from 'react';
import * as RN from 'react-native';

import {connect, ConnectedProps} from 'react-redux';

import Modal from 'react-native-modal';

import {IInitialState} from '../redux/store';

import {clearErrorAction} from '../actions/App.actions';

import CommonButtonComponent from '../components/Common/CommonButton.component';
import CommonTextComponent from '../components/Common/CommonText.component';

import {convertAppErrorToString} from '../utils/methods';

import {AppErrorTypes} from '../enums/App.enums';

import styles from './AppModal.styles';

const AppModalScreen: React.FC<ConnectedProps<typeof connector>> = ({
  app,
  clearAppError,
}) => {
  return (
    <RN.View>
      <Modal
        isVisible={app.error.type !== AppErrorTypes.NONE}
        onBackdropPress={clearAppError.bind(null)}
        supportedOrientations={['portrait', 'landscape']}>
        <RN.View style={styles.container}>
          <RN.View>
            <CommonTextComponent style={styles.title}>
              {convertAppErrorToString(app.error.type)}
            </CommonTextComponent>

            <CommonTextComponent style={styles.text}>
              {app.error.text}
            </CommonTextComponent>

            <RN.View style={styles.buttonContainer}>
              <CommonButtonComponent
                text="Ок"
                onClick={clearAppError.bind(null)}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      </Modal>
    </RN.View>
  );
};

// State
const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
});

const mapDispatchToProps = {
  clearAppError: () => clearErrorAction(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppModalScreen);
