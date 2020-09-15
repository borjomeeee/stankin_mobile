import React from 'react';
import * as RN from 'react-native';

import CommonTextComponent from '../Common/CommonText.component';

const ScheduleDayEmptyComponent = () => {
  return (
    <RN.View style={styles.container}>
      <CommonTextComponent>На текущую дату пар нет</CommonTextComponent>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    marginVertical: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScheduleDayEmptyComponent;
