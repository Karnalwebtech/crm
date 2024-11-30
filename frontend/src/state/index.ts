import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  Workspace: string;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  Workspace: "crm",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setWorkspace: (state, action: PayloadAction<string>) => {
      state.Workspace = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, setWorkspace } =
  globalSlice.actions;

export default globalSlice.reducer;
