import {
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

export const STORE_PORTAL_FEATURE_KEY = 'portal';

export interface PortalState {
  isDarkMode: boolean;
}

export const initialPortalState: PortalState = {
  isDarkMode: false
}

export const portalSlice = createSlice({
  name: STORE_PORTAL_FEATURE_KEY,
  initialState: initialPortalState,
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

export const portalReducer = portalSlice.reducer;

export const portalActions = portalSlice.actions;


export const getStorePortalState = (rootState: any): PortalState =>
  rootState[STORE_PORTAL_FEATURE_KEY];

export const selectIsDarkMode = createSelector(
  getStorePortalState,
  s => s.isDarkMode
);
