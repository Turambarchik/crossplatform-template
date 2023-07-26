import styled from "styled-components/native";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Typography } from "components/atoms/typography/Typography";
import { isIOS } from "helpers/constants";

export const StickyHeaderStyles = {
  HeaderText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw500",
    color: "primaryColor",
  })`
    margin-right: 12px;
    line-height: 24px;
  `,

  LeftWrapper: styled.View`
    padding-left: 16px;
    ${isIOS && "padding-bottom: 12px;"}
  `,
  RightWrapper: styled.Pressable`
    padding-right: 16px;
    position: relative;
    ${isIOS && "padding-bottom: 12px;"};
  `,
  NotificationCountWrapper: styled.View`
    position: absolute;
    top: 7px;
    left: 19px;
    z-index: 2;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
  `,
  NotificationCountText: styled(Typography).attrs({
    fz: "fz8",
    fw: "fw500",
    color: "primaryColor",
  })`
    line-height: 8px;
  `,
  CenterWrapper: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    ${isIOS && "padding-bottom: 16px;"}
    ${isIOS && "padding-top: 2;"}
  `,
  NotificationCountIcon: styled(SVGIcon)`
    margin-bottom: 5px;
  `,
};
