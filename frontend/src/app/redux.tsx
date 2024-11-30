"use client";
import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/state";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { usersApi } from "@/state/usersApi";
import { vendorApi } from "@/state/vendorApi";
import userSlice from "@/state/store/userSlice";
import { customerApi } from "@/state/customerApi";
import { categorieApi } from "@/state/categoriesApi";
import { productApi } from "@/state/productApi";
import { orderApi } from "@/state/orderApi";
import { expencesApi } from "@/state/expenseApi";
import { purchaseApi } from "@/state/purchaseApi";
import { karnal_CategorieApi } from "@/state/karnal-web-tech/categorieApi";
import { karnal_TagApi } from "@/state/karnal-web-tech/tagApi";
import { karnal_Post_Api } from "@/state/karnal-web-tech/postApi";
import { karnal_Portfolio_Api } from "@/state/karnal-web-tech/portfolioApi";
import { karnal_Image_Api } from "@/state/karnal-web-tech/imageApi";

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global", "user"],
};
const rootReducer = combineReducers({
  global: globalReducer,
  user: userSlice,
  [api.reducerPath]: api.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [vendorApi.reducerPath]: vendorApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [categorieApi.reducerPath]: categorieApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [expencesApi.reducerPath]: expencesApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  //------------ karnal web tech
  [karnal_CategorieApi.reducerPath]: karnal_CategorieApi.reducer,
  [karnal_TagApi.reducerPath]: karnal_TagApi.reducer,
  [karnal_Post_Api.reducerPath]: karnal_Post_Api.reducer,
  [karnal_Portfolio_Api.reducerPath]: karnal_Portfolio_Api.reducer,
  [karnal_Image_Api.reducerPath]: karnal_Image_Api.reducer,
  
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
        // serializableCheck: false, // Optionally disable serializableCheck if it's also causing performance issues
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(api.middleware)
        .concat(usersApi.middleware)
        .concat(vendorApi.middleware)
        .concat(customerApi.middleware)
        .concat(categorieApi.middleware)
        .concat(productApi.middleware)
        .concat(orderApi.middleware)
        .concat(purchaseApi.middleware)
        .concat(expencesApi.middleware)
        //-------------- karnal web tech
        .concat(karnal_CategorieApi.middleware)
        .concat(karnal_TagApi.middleware)
        .concat(karnal_Portfolio_Api.middleware)
        .concat(karnal_Post_Api.middleware)
        .concat(karnal_Image_Api.middleware),
  });
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
