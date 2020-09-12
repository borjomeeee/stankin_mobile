import React from 'react';
import {FlatButton} from 'react-native-material-kit';
import Modal from 'react-native-modal';
import {FlatList} from 'react-native';

import styled from 'styled-components/native';

import * as COLORS from '../../utils/colors';

interface ICommonSubjectsModalComponent {
  subjects: string[];

  isVisible: boolean;
  onSelectSubject: (subject: string) => void;

  onHide: () => void;
}

const CommonSubjectsModalComponent: React.FC<ICommonSubjectsModalComponent> = ({
  isVisible,
  subjects,

  onSelectSubject,
  onHide,
}) => {
  const renderSubjectComponent = ({item}: {item: string}) => {
    return (
      <ModalElementContainer
        key={item}
        onTouchEnd={onSelectSubject.bind(null, item)}
        style={{alignItems: 'flex-start'}}>
        <ModalElementText>{item}</ModalElementText>
      </ModalElementContainer>
    );
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onHide}>
      <ModalContainer>
        <ModalContent>
          <FlatList
            data={subjects}
            keyExtractor={(item) => item}
            renderItem={renderSubjectComponent}
            ItemSeparatorComponent={SubjectSeparator}
          />
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

// Components
const ModalContainer = styled.View`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  max-height: 70%;
`;

const ModalContent = styled.ScrollView`
  background-color: ${COLORS.WHITE};

  border-radius: 2px;
`;

const ModalElementContainer = styled(FlatButton)`
  padding: 15px 0px;
`;

const SubjectSeparator = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${COLORS.MEDIUM_GRAY};
`;

const ModalElementText = styled.Text`
  font-size: 16px;

  padding: 0px 20px;
`;

export default CommonSubjectsModalComponent;
