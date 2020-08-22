import React from 'react';
import {View} from 'react-native';

import styled from 'styled-components/native';

import * as COLORS from '../../utils/colors';

interface ICommonTagComponent extends React.ComponentProps<typeof View> {
  text: string;
}

const CommonTagComponent: React.FC<ICommonTagComponent> = ({
  text,
  ...props
}) => {
  return (
    <TagBlock {...props}>
      <TagText>{text}</TagText>
    </TagBlock>
  );
};

const TagBlock = styled.View`
  padding: 4px 8px;

  border: 1px solid ${COLORS.MEDIUM_GRAY};
  border-radius: 1px;
`;

const TagText = styled.Text`
  font-size: 14px;
`;

export default CommonTagComponent;
