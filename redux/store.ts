import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./slice/recipe.slice";
import authReducer from "./slice/auth.slice";
import userFavoriteReducer from "./slice/userFavorite.slice";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: ["recipe", "userFavorite"],
};

const rootReducer = combineReducers({
  recipe: recipeReducer,
  auth: authReducer,
  userFavorite: userFavoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
