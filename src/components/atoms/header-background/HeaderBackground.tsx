import React from "react";
import styled from "styled-components/native";

export const HeaderBackground = () => <TransparentBackground />;

const TransparentBackground = styled.View`
  opacity: 0.8;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.opacityBg};
`;
