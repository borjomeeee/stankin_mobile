import React from 'react';
import {TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';

import * as COLORS from '../utils/colors';

const CommonHeaderIconComponent = ({
  children,
  ...props
}: {children: React.ReactChild} & React.ComponentProps<
  typeof TouchableOpacity
>) => {
  return <IconContainer {...props}>{children}</IconContainer>;
};

// Components
const IconContainer = styled.TouchableOpacity`
  border: 1px solid ${COLORS.LIGHT_GRAY};
  border-radius: 2px;

  padding: 5px;
`;

export default CommonHeaderIconComponent;
