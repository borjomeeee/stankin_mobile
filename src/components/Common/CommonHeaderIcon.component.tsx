import React from 'react';
import {RaisedButton} from 'react-native-material-kit';

import styled from 'styled-components/native';

const CommonHeaderIconComponent: React.FC<React.ComponentProps<
  typeof RaisedButton
>> = ({...props}) => {
  return <IconContainer maskColor={'rgba(238, 238, 238, 0.2)'} {...props} />;
};

// Components
const IconContainer = styled(RaisedButton)`
  border-radius: 5px;

  padding: 7px;
  background-color: ${'#e0e0e0'};
`;

export default CommonHeaderIconComponent;
