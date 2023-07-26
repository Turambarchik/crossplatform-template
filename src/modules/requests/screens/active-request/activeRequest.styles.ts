import styled from "styled-components/native";

import { Screen } from "components/atoms/screen/Screen";
import { DEVICE_WIDTH } from "helpers/constants";

export const ActiveRequestStyles = {
  Wrapper: styled(Screen)`
    align-items: flex-start;
    flex: 1;
    height: 100%;
    width: 100%;
  `,
  Line: styled.View`
    position: absolute;
    top: 70;
    width: ${DEVICE_WIDTH};
    height: 1px;
    color: ${({ theme }) => theme.colors.borderColor};
    background-color: ${({ theme }) => theme.colors.borderColor};
  `,
  ScrollView: styled.ScrollView.attrs<{ headerHeight?: number }>(
    ({ headerHeight }) => ({
      contentContainerStyle: {
        paddingTop: headerHeight,
        paddingBottom: 52,
        flexGrow: 1,
      },
    })
  )<{ headerHeight?: number }>`
    padding-top: 24px;
    width: 100%;
  `,
};
