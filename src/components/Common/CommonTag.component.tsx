import React from 'react';
import {View} from 'react-native';

import styled from 'styled-components/native';

import * as COLORS from '../../utils/colors';

type ICommonTagComponent = {
  text: string;
};

const CommonTagComponent = ({
  text,
  ...props
}: ICommonTagComponent & React.ComponentProps<typeof View>) => {
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
