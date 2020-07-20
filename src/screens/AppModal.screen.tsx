import React from 'react';
import {View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import styled from 'styled-components/native';

import Modal from 'react-native-modal';

import {IInitialState} from '../redux/store';

import {clearErrorAction} from '../actions/App.actions';

import CommonButtonComponent from '../components/CommonButton.component';

import * as COLORS from '../utils/colors';
import {convertAppErrorToString} from '../utils/methods';

import {AppErrorTypes} from '../enums/App.enums';

const AppModalScreen = ({
  app,
  clearAppError,
}: ConnectedProps<typeof connector>) => {
  return (
    <View>
      <Modal
        isVisible={app.error.type !== AppErrorTypes.NONE}
        onBackdropPress={clearAppError.bind(null)}>
        <ModalContainer>
          <ModalContent>
            <ModalTitle>{convertAppErrorToString(app.error.type)}</ModalTitle>

            <ModalText>{app.error.text}</ModalText>

            <ModalButton>
              <CommonButtonComponent
                text="Ок"
                onClick={clearAppError.bind(null)}
              />
            </ModalButton>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </View>
  );
};

// Components
const ModalContainer = styled.View`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.View`
  min-width: 80%;
  padding: 20px;

  background-color: ${COLORS.WHITE};

  border-radius: 3px;
`;

const ModalTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 22px;

  margin-bottom: 20px;
`;

const ModalText = styled.Text`
  font-size: 16px;

  margin-bottom: 20px;
`;

const ModalButton = styled.View`
  align-items: center;
`;

// State
const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
});

const mapDispatchToProps = {
  clearAppError: () => clearErrorAction(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppModalScreen);
