import React from 'react';

import styled from 'styled-components/native';

const CommonSwipeableItemComponent: React.FC = ({children}) => {
  return (
    <SwipeableItemContainer>
      <SwipeableItemCap />

      {children}
    </SwipeableItemContainer>
  );
};

const SwipeableItemContainer = styled.View`
  position: relative;
`;

const SwipeableItemCap = styled.View`
  position: absolute;

  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  background-color: ${'#ffffff'};
`;

export default CommonSwipeableItemComponent;
