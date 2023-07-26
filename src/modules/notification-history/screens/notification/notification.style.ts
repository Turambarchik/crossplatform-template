import { FlashList } from "@shopify/flash-list";
import styled from "styled-components/native";

import { Typography } from "components/atoms/typography/Typography";
import type { NotificationDTO } from "modules/notification-history/store/notification.store.types";

export const NotificationStyles = {
  Wrapper: styled.View`
    flex: 1;
    padding: 0 16px 16px 16px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  FlatListContainer: styled(FlashList<NotificationDTO>).attrs(() => ({
    showsVerticalScrollIndicator: false,
    bounces: true,
    paddingTop: 24,
  }))`
    flex: 1;
  `,
  LoadingWrapper: styled.View`
    padding: 20px 0px;
  `,
  Loading: styled.ActivityIndicator``,
  Text: styled(Typography).attrs(() => ({
    fz: "fz14",
    fw: "fw400",
    color: "neutralColor2",
  }))`
    line-height: 24px;
    margin-bottom: 16px;
  `,
};
