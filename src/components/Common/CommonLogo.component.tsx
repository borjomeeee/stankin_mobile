import React from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';

import styled from 'styled-components/native';

import {withTheme} from 'react-native-paper';

const CommonLogoComponent: React.FC<{theme: ReactNativePaper.Theme}> = ({
  theme,
}) => {
  const logoTitleStyles: StyleProp<TextStyle> = {
    ...theme.fonts.medium,
    color: theme.colors.primary,
  };
  const logoTypeContainerStyles: StyleProp<ViewStyle> = {
    borderColor: theme.colors.darkGray,
  };

  const logoTypeText: StyleProp<TextStyle> = {
    color: theme.colors.darkGray,
    ...theme.fonts.medium,
  };
  return (
    <LogoContainer>
      <LogoTitle style={logoTitleStyles}>Станкин</LogoTitle>
      <LogoTypeContainer style={logoTypeContainerStyles}>
        <LogoTypeText style={logoTypeText}>Расписание</LogoTypeText>
      </LogoTypeContainer>
    </LogoContainer>
  );
};

const LogoContainer = styled.View`
  flex-direction: row;
`;

const LogoTitle = styled.Text`
  font-size: 20px;
  text-transform: uppercase;
`;

const LogoTypeContainer = styled.View`
  border-width: 1px;

  padding: 4px 8px;

  margin-left: 14;
`;

const LogoTypeText = styled.Text`
  font-size: 14px;
`;

export default withTheme(CommonLogoComponent);
