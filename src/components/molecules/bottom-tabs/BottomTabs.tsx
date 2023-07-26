import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { equals } from "ramda";
import { useTranslation } from "react-i18next";

import { SVGIcon } from "components/atoms/icon/Icon";
import { localization } from "helpers/constants";
import { Routes } from "modules/app/Routes";

import { BottomTabsStyles } from "./bottomTabs.styles";

const { Wrapper, Container, InnerContainer, TabIconWrapper, TabIconText } =
  BottomTabsStyles;

const BottomTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper edges={["bottom"]}>
      <Container>
        {state?.routes?.map((route, index: number) => {
          const { options } = descriptors[route?.key];

          const isFocused = state?.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const color = isFocused ? "lightBlack" : "gray";

          return (
            <InnerContainer
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options?.tabBarAccessibilityLabel}
              testID={options?.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              {equals(route.name, Routes.NewsList) && (
                <TabIconWrapper>
                  <SVGIcon type="news" color={color} fill="black" />
                  <TabIconText isFocused={isFocused}>
                    {t(localization.general.news)}
                  </TabIconText>
                </TabIconWrapper>
              )}
              {equals(route.name, Routes.Requests) && (
                <TabIconWrapper>
                  <SVGIcon type="requests" color={color} />
                  <TabIconText isFocused={isFocused}>
                    {t(localization.general.requests)}
                  </TabIconText>
                </TabIconWrapper>
              )}
              {equals(route.name, Routes.Services) && (
                <TabIconWrapper>
                  <SVGIcon type="services" color={color} />
                  <TabIconText isFocused={isFocused}>
                    {t(localization.general.services)}
                  </TabIconText>
                </TabIconWrapper>
              )}
              {equals(route.name, Routes.ProfileInfo) && (
                <TabIconWrapper>
                  <SVGIcon type="profile" color={color} />
                  <TabIconText isFocused={isFocused}>
                    {t(localization.general.profile)}
                  </TabIconText>
                </TabIconWrapper>
              )}
            </InnerContainer>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default BottomTabs;
