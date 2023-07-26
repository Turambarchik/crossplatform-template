import styled from "styled-components/native";

export const ActiveRequestStyles = {
  Wrapper: styled.View`
    flex: 1;
    padding: 30px 0px 48px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    position: relative;
  `,
};
