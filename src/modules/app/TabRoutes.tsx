import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import BottomTabs from "components/molecules/bottom-tabs/BottomTabs";
import NewsList from "modules/news/screens/news-list/NewsList";
import ProfileInfo from "modules/profile/screens/profile-info/ProfileInfo";
import RequestList from "modules/requests/screens/request-list/RequestList";
import Services from "modules/services/Services";

import { Routes } from "./Routes";

const Tab = createBottomTabNavigator();

export const TabRoutes = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomTabs {...props} />}
    initialRouteName={Routes.NewsList}
  >
    <Tab.Screen name={Routes.NewsList} component={NewsList} />
    <Tab.Screen name={Routes.Requests} component={RequestList} />
    <Tab.Screen name={Routes.Services} component={Services} />
    <Tab.Screen name={Routes.ProfileInfo} component={ProfileInfo} />
  </Tab.Navigator>
);
