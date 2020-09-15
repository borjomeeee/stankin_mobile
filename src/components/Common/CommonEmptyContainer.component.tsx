import React from 'react';
import * as RN from 'react-native';

import CommonTextComponent from './CommonText.component';

import styles from './CommonEmptyContainer.styles';

interface ICommonEmptyContainerComponent {
  text: string;
}

const CommonEmptyContainerComponent: React.FC<ICommonEmptyContainerComponent> = ({
  text,
}) => {
  return (
    <RN.View style={styles.container}>
      <CommonTextComponent style={styles.text}>{text}</CommonTextComponent>
    </RN.View>
  );
};

export default CommonEmptyContainerComponent;
