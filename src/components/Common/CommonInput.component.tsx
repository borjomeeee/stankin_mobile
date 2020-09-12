import React from 'react';
import {TextInput, HelperText} from 'react-native-paper';

import {View} from 'react-native';

type ICommonInputComponentProps = React.ComponentProps<typeof TextInput> & {
  errorValue: string;
};

const CommonInputComponent: React.FC<ICommonInputComponentProps> = (props) => {
  return (
    <View>
      <TextInput mode="outlined" {...props} />

      <HelperText type="error" visible={props.error}>
        {props.errorValue}
      </HelperText>
    </View>
  );
};

export default CommonInputComponent;
