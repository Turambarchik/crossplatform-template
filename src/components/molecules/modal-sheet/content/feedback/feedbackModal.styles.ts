import { AirbnbRating } from "react-native-ratings";
import styled from "styled-components/native";

import { Button } from "components/atoms/button/Button";
import { Typography } from "components/atoms/typography/Typography";

export const FeedbackModalStyles = {
  Wrapper: styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
  `,
  Container: styled.View`
    border-radius: 16px;
    padding: 16px 24px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  Line: styled.View`
    top: -10;
    width: 64;
    height: 3px;
    align-self: center;
    position: absolute;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  AirbnbRatingStyled: styled(AirbnbRating).attrs({
    starContainerStyle: {
      width: 200,
      justifyContent: "space-between",
      paddingVertical: 32,
    },
  })``,
  KeyboardAvoidingViewStyled: styled.KeyboardAvoidingView.attrs({})`
    height: 100%;
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw300",
    color: "infoColor",
  })`
    margin-bottom: 4px;
    line-height: 12px;
  `,
  HeaderText: styled(Typography).attrs({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  })`
    text-align: center;
    line-height: 32;
  `,
  AgreeButton: styled(Button)`
    margin-top: 16px;
  `,
  RefuseButton: styled(Button)`
    margin-top: 16px;
  `,
  AgreeText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "primaryColor",
  })`
    line-height: 24px;
  `,
  RefuseText: styled(Typography).attrs({
    fs: "fs14",
    fw: "fw400",
    color: "tertiaryColor",
  })`
    line-height: 24px;
  `,
};
