// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "../03-features/user/hook/01-useSlice";

const rootReducer = combineReducers({
  user: userReducer,   // ✅ only user slice
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // ✅ only persist user
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
