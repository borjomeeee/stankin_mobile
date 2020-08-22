import React from 'react';

import styled from 'styled-components/native';

import * as COLORS from '../../utils/colors';

interface ICommonSelectComponent {
  options: {label: string; value: string}[];
  onSelectValue: (value: string) => void;
  onHide: () => void;
}

interface ISelectOptionContainerProps {
  isFirst: boolean;
}

const CommonSelectComponent: React.FC<ICommonSelectComponent> = ({
  options,
  onSelectValue,
}) => {
  return (
    <SelectContainer>
      {options.map(
        ({label, value}: {label: string; value: string}, index: number) => (
          <SelectOptionContainer
            key={index}
            isFirst={index === 0}
            onPress={onSelectValue.bind(null, value)}>
            <SelectOptionText>{label}</SelectOptionText>
          </SelectOptionContainer>
        ),
      )}
    </SelectContainer>
  );
};

// Components
const SelectContainer = styled.View`
  align-self: flex-end;

  min-width: 100px;

  padding: 0px 10px;

  border: 1px solid ${COLORS.MEDIUM_GRAY};
  border-radius: 2px;

  background-color: ${COLORS.WHITE};
`;

const SelectOptionContainer = styled.TouchableOpacity<
  ISelectOptionContainerProps
>`
  padding: 10px 10px;

  border-top-width: ${(props) => (props.isFirst ? '0px' : '1px')};
  border-top-color: ${COLORS.MEDIUM_GRAY};
`;

const SelectOptionText = styled.Text``;

export default CommonSelectComponent;
