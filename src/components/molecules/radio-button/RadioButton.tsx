import type { ReactNode } from "react";
import React from "react";
import { TouchableOpacity } from "react-native";

import { RadioButtonStyles } from "./radioButon.styles";

const { Wrapper, Text, RadioIcon, Container } = RadioButtonStyles;

type RadioButtonProps = {
  onPress: () => void;
  selected: boolean;
  children: ReactNode;
};

export const RadioButton = ({
  onPress,
  selected,
  children,
}: RadioButtonProps) => (
  <Wrapper>
    <Container onPress={onPress}>{selected ? <RadioIcon /> : null}</Container>
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  </Wrapper>
);
