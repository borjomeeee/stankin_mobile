import React from 'react';
import {TextInput, HelperText} from 'react-native-paper';

import {View} from 'react-native';

type ICommonInputComponentProps = React.ComponentProps<typeof TextInput> & {
  errorValue: string;
};
interface ICommonInputComponentState {}

class CommonInputComponent extends React.Component<
  ICommonInputComponentProps,
  ICommonInputComponentState
> {
  constructor(props: ICommonInputComponentProps) {
    super(props);
  }

  render() {
    return (
      <View>
        <TextInput mode="outlined" {...this.props} />

        <HelperText type="error" visible={this.props.error}>
          {this.props.errorValue}
        </HelperText>
      </View>
    );
  }
}

export default CommonInputComponent;
