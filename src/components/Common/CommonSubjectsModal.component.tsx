import React from 'react';
import * as RN from 'react-native';

import Modal from 'react-native-modal';

import theme from '../../utils/theme';
import styles from './CommonSubjectModal.styles';

import CommonTextComponent from './CommonText.component';

interface ICommonSubjectsModalComponent {
  subjects: string[];

  isVisible: boolean;
  onSelectSubject: (subject: string) => void;

  onHide: () => void;
}

const CommonSubjectsModalComponent: React.FC<ICommonSubjectsModalComponent> = ({
  isVisible,
  subjects,

  onSelectSubject,
  onHide,
}) => {
  const renderSubjectComponent = ({item}: {item: string}) => {
    return (
      <RN.TouchableHighlight
        key={item}
        delayPressIn={0}
        activeOpacity={0.9}
        underlayColor={theme.colors.accent.darkWhite}
        onPress={onSelectSubject.bind(null, item)}
        style={styles.optionContainer}>
        <CommonTextComponent style={styles.optionText}>
          {item}
        </CommonTextComponent>
      </RN.TouchableHighlight>
    );
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onHide}>
      <RN.View style={styles.container}>
        <RN.View style={styles.content}>
          <RN.FlatList
            data={subjects}
            keyExtractor={(item) => item}
            renderItem={renderSubjectComponent}
            ItemSeparatorComponent={() => <RN.View style={styles.separator} />}
          />
        </RN.View>
      </RN.View>
    </Modal>
  );
};

export default CommonSubjectsModalComponent;
