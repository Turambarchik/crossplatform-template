import { FlashList } from "@shopify/flash-list";
import styled from "styled-components/native";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Typography } from "components/atoms/typography/Typography";
import type { RequestsTypeDTO } from "modules/requests/store/requests.store.types";

export const RequestsStyles = {
  Wrapper: styled.View`
    flex: 1;
    padding: 0 16px 16px 24px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    position: relative;
  `,
  FlatListContainer: styled(FlashList<RequestsTypeDTO>).attrs<{
    headerHeight?: number;
  }>(({ headerHeight }) => ({
    showsVerticalScrollIndicator: false,
    bounces: true,
    contentContainerStyle: {
      paddingTop: headerHeight,
      paddingBottom: 60,
    },
  }))<{
    headerHeight: number;
  }>`
    flex: 1;
  `,
  LoadingWrapper: styled.View`
    padding: 20px 0px;
  `,
  Loading: styled.ActivityIndicator``,
  Title: styled(Typography).attrs(() => ({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  }))`
    line-height: 32px;
    margin-bottom: 16px;
    margin-top: 24px;
  `,
  ButtonWrapper: styled.View`
    width: 100%;
    position: absolute;
    bottom: 24px;
    left: 16px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  `,
  ButtonText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
  })`
    line-height: 24px;
    color: ${({ theme }) => theme.components.typography.tertiaryColor};
    margin-left: 8px;
  `,
  Icon: styled(SVGIcon)``,
};
