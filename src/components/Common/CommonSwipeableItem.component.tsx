import React from 'react';
import * as RN from 'react-native';

// Need for correct view animations with opacity
const CommonSwipeableItemComponent: React.FC = ({children}) => {
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.item} />

      {children}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',

    backgroundColor: '#fff',
  },

  item: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: '#fff',
  },
});

export default CommonSwipeableItemComponent;
