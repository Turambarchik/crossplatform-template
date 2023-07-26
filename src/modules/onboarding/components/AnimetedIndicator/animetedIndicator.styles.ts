import { defaultTo } from "ramda";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Styles = {
  Wrapper: styled.View<{ bottom?: number }>`
    position: absolute;
    bottom: ${(props) => defaultTo(130, props.bottom)};
    z-index: 2;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  `,
  DotStyled: styled(Animated.View)`
    margin-right: 8px;
    height: 8px;
    border-radius: 60px;
  `,
};
