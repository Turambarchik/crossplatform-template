import React from "react";

import { SVGIcon } from "components/atoms/icon/Icon";

import { MultilineInputStyles } from "./multilineInput.styles";

const { Wrapper, TextInput, RightContainer } = MultilineInputStyles;

type MultilineInputProps = {
  text: string;
  withClearButton?: boolean;
  maxLenght: number;
  maxHeight: number;
  setText: (val: string) => void;
  onSave?: () => void;
  onPress?: () => void;
};

export const MultilineInput = ({
  text,
  setText,
  onSave,
  withClearButton,
  maxLenght,
  maxHeight,
}: MultilineInputProps) => (
  <Wrapper>
    <TextInput
      numberOfLines={2}
      multiline
      value={text}
      maxHeight={maxHeight}
      maxLength={maxLenght}
      onBlur={onSave}
      onEndEditing={onSave}
      onChangeText={setText}
    />
    {withClearButton && (
      <RightContainer onPress={() => setText("")}>
        <SVGIcon type="closeRound" />
      </RightContainer>
    )}
  </Wrapper>
);
