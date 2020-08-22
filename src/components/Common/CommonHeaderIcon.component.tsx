import React from 'react';
import {TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';

const CommonHeaderIconComponent: React.FC<React.ComponentProps<
  typeof TouchableOpacity
>> = ({...props}) => {
  return <IconContainer {...props} />;
};

// Components
const IconContainer = styled.TouchableOpacity`
  border-radius: 5px;

  padding: 7px;
  background-color: ${'#E4E4E4'};
`;

export default CommonHeaderIconComponent;
