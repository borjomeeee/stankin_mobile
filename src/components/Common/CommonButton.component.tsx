import React from 'react';

import styled from 'styled-components/native';

import * as COLORS from '../../utils/colors';

type ICommonButtonComponent = {
  text: string;
  onClick: () => void;
};

const CommonButtonComponent: React.FC<ICommonButtonComponent> = ({
  text,
  onClick,
}) => {
  return (
    <ButtonContainer activeOpacity={0.65} onPress={onClick}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  max-width: 90%;
  background-color: ${COLORS.BLACK};

  border-radius: 3px;

  padding: 7px 50px;
`;

const ButtonText = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 16px;

  color: ${COLORS.WHITE};
`;

export default CommonButtonComponent;
