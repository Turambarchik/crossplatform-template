import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import AccountReducer from "modules/account/store/account.reducer";
import AppReducer from "modules/app/store/app.reducer";
import AuthReducer from "modules/auth/store/auth.reducer";
import DrawLadderReducer from "modules/draw-ladder/store/draw-ladder.reducer";
import PopUpReducer from "modules/global-pop-up/global-pop-up.reducer";
import MatchCenterReducer from "modules/match-centre/store/match-center.reducer";
import ArticleDetailsReducer from "modules/news/screens/article-details/store/article-details.reducer";
import GameDayReducer from "modules/news/screens/game-day/store/game-day.reducer";
import NewsReducer from "modules/news/store/news.reducer";
import PlayerReducer from "modules/team-list/store/player.reducer";

const persistConfig = {
  key: "root",
  keyPrefix: "root_prefix",
  whitelist: ["auth"],
  storage: AsyncStorage,
};

const combinedReducers = combineReducers({
  // TODO: fill root reducer with API and app needs
  app: AppReducer,
  auth: AuthReducer,
  popUp: PopUpReducer,
  drawLadder: DrawLadderReducer,
  player: PlayerReducer,
  account: AccountReducer,
  matchCenter: MatchCenterReducer,
  articleDetails: ArticleDetailsReducer,
  newsReducer: NewsReducer,
  gameDay: GameDayReducer,
});

const rootReducer = persistReducer(persistConfig, combinedReducers);

export type RootReducerType = ReturnType<typeof combinedReducers>;

export default persistReducer(persistConfig, rootReducer);
