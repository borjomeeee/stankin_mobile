import React from 'react';
import Modal from 'react-native-modal';

import styled from 'styled-components/native';

import * as COLORS from '../utils/colors';

interface ICommonSubjectsModalComponent {
  subjects: string[];

  isVisible: boolean;
  onSelectSubject: (subject: string) => void;

  onHide: () => void;
}

const CommonSubjectsModalComponent = ({
  isVisible,
  subjects,

  onSelectSubject,
  onHide,
}: ICommonSubjectsModalComponent) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onHide}>
      <ModalContainer>
        <ModalContent>
          {subjects.map((subject: string, index: number) =>
            index === 0 ? (
              <ModalElementContainerFirst
                key={subject}
                onPress={onSelectSubject.bind(null, subject)}>
                <ModalElementText>{subject}</ModalElementText>
              </ModalElementContainerFirst>
            ) : (
              <ModalElementContainer
                key={subject}
                onPress={onSelectSubject.bind(null, subject)}>
                <ModalElementText>{subject}</ModalElementText>
              </ModalElementContainer>
            ),
          )}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

// Components
const ModalContainer = styled.View`
  align-self: center;

  flex: 1;

  justify-content: flex-start;
  align-items: flex-start;
`;

const ModalContent = styled.ScrollView`
  background-color: ${COLORS.WHITE};

  padding: 0px 20px;
  border-radius: 2px;
`;

const ModalElementContainer = styled.TouchableOpacity`
  padding: 15px 0px;

  border-top-width: 1px;
  border-top-color: ${COLORS.MEDIUM_GRAY};
`;

const ModalElementContainerFirst = styled(ModalElementContainer)`
  border-top-width: 0px;
`;

const ModalElementText = styled.Text`
  font-size: 16px;
`;

export default CommonSubjectsModalComponent;
