import React from 'react';

import styled from 'styled-components/native';

interface ICommonEmptyContainerComponent {
  text: string;
}

const CommonEmptyContainerComponent: React.FC<ICommonEmptyContainerComponent> = ({
  text,
}) => {
  return (
    <NotesEmptyContainer>
      <NotesEmptyContainerText>{text}</NotesEmptyContainerText>
    </NotesEmptyContainer>
  );
};

const NotesEmptyContainer = styled.View`
  margin-bottom: 15px;
  padding: 15px 60px;

  border: 1px solid ${'#F0F0F0'};

  justify-content: center;
  align-items: center;
`;

const NotesEmptyContainerText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 16px;

  text-align: center;

  color: ${'#C4C4C4'};
`;

export default CommonEmptyContainerComponent;
