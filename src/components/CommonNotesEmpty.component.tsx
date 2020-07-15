import React from 'react';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as COLORS from '../utils/colors';

const CommonNotesEmptyComponent = () => {
  return (
    <NotesEmptyContainer>
      <NotesEmptyContainerText>
        Добавьте свой первый дедлайн
      </NotesEmptyContainerText>

      <NotesEmptyContainerIcon>
        <Icon name="arrow-downward" color={COLORS.MEDIUM_GRAY} size={30} />
      </NotesEmptyContainerIcon>
    </NotesEmptyContainer>
  );
};

const NotesEmptyContainer = styled.View`
  padding: 15px 60px;

  border: 1px solid ${COLORS.LIGHT_GRAY};

  justify-content: center;
  align-items: center;
`;

const NotesEmptyContainerText = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 16px;

  text-align: center;

  color: ${COLORS.MEDIUM_GRAY};
`;

const NotesEmptyContainerIcon = styled.View`
  margin-top: 10px;
`;

export default CommonNotesEmptyComponent;
