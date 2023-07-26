import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";

import axiosMiddleware from "./middlewares/axios.middleware";
import rootReducer from "./rootReducer";

export default function configureStore() {
  const middlewareArray = [axiosMiddleware];

  const store = createStore(
    rootReducer,
    {},
    applyMiddleware(...middlewareArray)
  );
  const persistor = persistStore(store);

  return { store, persistor };
}
