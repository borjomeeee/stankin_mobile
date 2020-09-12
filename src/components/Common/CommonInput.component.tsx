import React, {useState} from 'react';
import {TextInput, HelperText} from 'react-native-paper';
import {View, Animated} from 'react-native';

import styled from 'styled-components/native';

import * as COLORS from '../../utils/colors';

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
        <TextInput
          mode="outlined"
          selectionColor="#444"
          underlineColor="#444"
          underlineColorAndroid="#444"
          placeholderTextColor="#BDBDBD"
          {...this.props}
        />

        <HelperText type="error" visible={this.props.error}>
          {this.props.errorValue}
        </HelperText>
      </View>
    );
  }
}

export default CommonInputComponent;
