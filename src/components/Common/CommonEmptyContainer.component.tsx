import React from 'react';
import * as RN from 'react-native';

import styled from 'styled-components/native';

import CommonTextComponent from './CommonText.component';

import theme from '../../utils/theme';

interface ICommonEmptyContainerComponent {
  text: string;
}

const CommonEmptyContainerComponent: React.FC<ICommonEmptyContainerComponent> = ({
  text,
}) => {
  return (
    <RN.View
      style={{
        height: 92,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary.commonBlack,
        borderRadius: theme.borderRadius,
      }}>
      <CommonTextComponent
        style={{
          maxWidth: 150,
          textAlign: 'center',
          color: theme.colors.lesson.separator,
          fontFamily: theme.fonts.semibold.fontFamily,
        }}>
        {text}
      </CommonTextComponent>
    </RN.View>
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
