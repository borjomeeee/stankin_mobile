import React from 'react';
import * as RN from 'react-native';

import CommonNoteToggleButton from './CommonNoteToggleButton.component';
import CommonTextComponent from '../CommonText.component';

import {INote} from '../../../models/Note.model';

import theme from '../../../utils/theme';
import styles from './CommonNote.styles';

interface ICommonNoteComponent extends INote {
  onClick: (noteId: string) => void;
}

const CommonNoteComponent: React.FC<ICommonNoteComponent> = ({
  id,

  subject,
  text,
  isChecked,

  onClick,
}) => {
  const noteCheckedTextStyles: RN.StyleProp<RN.TextStyle> = {
    color: isChecked
      ? theme.colors.lesson.separator
      : theme.colors.primary.white,
    textDecorationLine: isChecked ? 'line-through' : 'none',
  };

  return (
    <RN.View>
      <RN.TouchableOpacity
        delayPressIn={0}
        activeOpacity={0.9}
        onPress={onClick.bind(null, id)}
        style={styles.container}>
        <CommonNoteToggleButton isDone={isChecked} size={20} />

        <RN.View style={styles.content}>
          <CommonTextComponent style={styles.label} numberOfLines={1}>
            {subject}
          </CommonTextComponent>
          <CommonTextComponent
            style={[styles.text, noteCheckedTextStyles]}
            numberOfLines={1}>
            {text}
          </CommonTextComponent>
        </RN.View>
      </RN.TouchableOpacity>
    </RN.View>
  );
};

export default CommonNoteComponent;
