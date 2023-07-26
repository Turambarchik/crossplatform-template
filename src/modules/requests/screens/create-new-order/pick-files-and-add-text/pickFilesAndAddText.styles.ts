import styled from "styled-components/native";

import { SVGIcon } from "components/atoms/icon/Icon";
import { Typography } from "components/atoms/typography/Typography";

export const PickFilesAndAddTextStyles = {
  Wrapper: styled.View`
    flex: 1;
    padding: 0 14px 32px 14px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
  `,
  Title: styled(Typography).attrs(() => ({
    fz: "fz22",
    fw: "fw500",
    color: "primaryColor",
  }))`
    line-height: 32px;
    margin-bottom: 16px;
    margin-top: 24px;
  `,
  Text: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
  })`
    line-height: 24px;
    color: ${({ theme }) => theme.components.typography.primaryColor};
  `,
  Line: styled.View`
    height: 1px;
    margin-top: 8px;
    margin-bottom: 16px;
    background-color: ${({ theme }) => theme.colors.borderColor};
  `,
  InfoText: styled(Typography).attrs({
    fz: "fz12",
    fw: "fw300",
  })`
    line-height: 12px;
    color: ${({ theme }) => theme.components.typography.neutralColor2};
  `,
  ButtonText: styled(Typography).attrs({
    fz: "fz14",
    fw: "fw400",
  })<{ color: string }>`
    line-height: 24px;
    margin-left: 8px;
  `,
  FormContainer: styled.View.attrs(({ theme }) => ({
    ...theme.shadows.card,
  }))<{
    marginTop?: number;
  }>`
    margin: 2px;
    padding: 16px 12px;
    border-radius: 16px;
    margin-bottom: 24px;

    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  ScrollView: styled.ScrollView.attrs<{ headerHeight?: number }>(
    ({ headerHeight }) => ({
      contentContainerStyle: {
        paddingTop: headerHeight,
        paddingBottom: 40,
      },
    })
  )<{ headerHeight?: number }>`
    padding-top: 24px;
    width: 100%;
    padding: 2px;
    flex: 1;
  `,
  MediaContainer: styled.View.attrs(({ theme }) => ({
    ...theme.shadows.card,
  }))<{
    marginTop?: number;
  }>`
    flex-direction: row;
    flex-wrap: wrap;
    margin: 2px;
    padding: 0 0 16px 12px;
    border-radius: 16px;
    margin-bottom: 24px;
    margin-top: 16px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  MediaItemContainer: styled.View`
    margin-top: 16px;
    margin-right: 2%;
  `,
  AddMediaButton: styled.View`
    margin-left: 2px;
    margin-right: 2px;
  `,
  DeleteMediaContainer: styled.TouchableOpacity.attrs(({ theme }) => ({
    activeOpacity: theme.opacity.active,
  }))`
    position: absolute;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    right: 3px;
    top: 3px;
    width: 23px;
    height: 23px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
  `,
  Icon: styled(SVGIcon)``,
};
